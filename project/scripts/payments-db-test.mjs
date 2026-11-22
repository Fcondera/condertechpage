import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Optional isolated Postgres engine; never connects to Supabase or reads .env files.
const require = createRequire(join(process.argv[2] || join(tmpdir(),"condertech-payment-tests"),"package.json"));
const { PGlite } = require("@electric-sql/pglite");
const db = new PGlite();
await db.exec(`create role anon; create role authenticated; create role service_role;
  create schema auth; create schema storage;
  create table auth.users(id uuid primary key,raw_app_meta_data jsonb default '{}');
  create function auth.uid() returns uuid language sql as 'select null::uuid';
  create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);`);
for (const name of ["marketplace.sql","marketplace-checkout.sql","marketplace-payments.sql"]) await db.exec(readFileSync(new URL(`../src/sql/${name}`,import.meta.url),"utf8"));
// Reapplying the migration must preserve data and permissions.
await db.exec(readFileSync(new URL("../src/sql/marketplace-payments.sql",import.meta.url),"utf8"));
const admin="11111111-1111-4111-8111-111111111111", buyer="22222222-2222-4222-8222-222222222222", seller="33333333-3333-4333-8333-333333333333", product="44444444-4444-4444-8444-444444444444";
await db.query("insert into auth.users(id,raw_app_meta_data) values($1,'{\"marketplace_role\":\"admin\"}'),($2,'{}'),($3,'{}')",[admin,buyer,seller]);
await db.query(`insert into marketplace_profiles(user_id,name,phone,cpf,cep,street,number,neighborhood,city,state,terms_accepted_at) values($1,'Cliente Teste','92999999999','52998224725','69000001','Rua Teste','10','Centro','Manaus','AM',now());`,[buyer]);
await db.query("insert into marketplace_sellers(user_id,name,city) values($1,'Loja Teste','Manaus')",[seller]);
await db.query("insert into marketplace_listings(id,seller_id,title,description,category,price_cents,stock,image_path,status) values($1,$2,'Switch Teste','Descricao completa do produto teste','Redes',500,4,'test.png','aprovado')",[product,seller]);
async function quote(quantity=2) {
  const items=[{id:product,name:"Switch",quantity,seller_id:seller,price_cents:500},{id:"pdv",name:"PDV",quantity:1,seller_id:null,price_cents:null}];
  const result=await db.query("insert into marketplace_quotes(user_id,request_id,items) values($1,gen_random_uuid(),$2::jsonb) returning id",[buyer,JSON.stringify(items)]);
  return result.rows[0].id;
}
const prices=JSON.stringify([{id:product,price_cents:500},{id:"pdv",price_cents:1000}]);
async function approve(q, actor=admin, p=prices) { return (await db.query("select marketplace_approve_order($1,$2,$3::jsonb,100,'123',false) id",[q,actor,p])).rows[0].id; }
async function stock() {return (await db.query("select stock from marketplace_listings where id=$1",[product])).rows[0].stock;}
const q=await quote();
await assert.rejects(()=>approve(q,buyer),/ADMIN_REQUIRED/);
const order=await approve(q);
assert.equal(await stock(),2);
assert.equal(await approve(q),order);
assert.equal(await stock(),2,"retry must not reserve twice");
const frozen=(await db.query("select * from marketplace_orders where id=$1",[order])).rows[0];
assert.equal(frozen.total_cents,2100);
assert.equal(frozen.address.street,"Rua Teste");
assert.equal(frozen.items.find(row=>row.id===product).price_cents,500);
const insufficient=await quote(3);
await assert.rejects(()=>approve(insufficient),/STOCK_UNAVAILABLE/);
assert.equal(await stock(),2,"failed transaction must roll back inventory");
const invalid=await quote(1);
await assert.rejects(()=>approve(invalid,admin,JSON.stringify([{id:product,price_cents:500},{id:"pdv",price_cents:0}])),/INVALID_PRICES/);
assert.equal(await stock(),2,"later validation failure must roll back reservation");
async function reconcile(order,payment,status,date,refunded=0) { await db.query("select marketplace_reconcile_payment($1,$2,$3,$4,$5)",[order,payment,status,refunded,date]); }
async function status(order) { return (await db.query("select status from marketplace_orders where id=$1",[order])).rows[0].status; }
await reconcile(order,"42","pending","2026-10-23T10:00:00Z");
await reconcile(order,"42","approved","2026-10-23T11:00:00Z");
await reconcile(order,"42","pending","2026-10-23T10:00:00Z");
await reconcile(order,"42","approved","2026-10-23T11:00:00Z");
assert.equal(await status(order),"paid");
assert.equal((await db.query("select count(*)::integer n from marketplace_payment_events where payment_id='42'")).rows[0].n,1);
await reconcile(order,"43","rejected","2026-10-23T12:00:00Z");
assert.equal(await status(order),"paid","a rejected retry must not undo approval");
await reconcile(order,"42","refunded","2026-10-23T13:00:00Z",2100);
assert.equal(await status(order),"refunded");
await reconcile(order,"42","approved","2026-10-23T11:00:00Z");
assert.equal(await status(order),"refunded","out-of-order webhook must not undo refund");
await reconcile(order,"42","charged_back","2026-10-23T14:00:00Z");
assert.equal(await status(order),"charged_back");
const second=await approve(await quote(1));
await reconcile(second,"51","approved","2026-10-23T11:00:00Z");
await reconcile(second,"52","approved","2026-10-23T11:01:00Z");
assert.equal(await status(second),"payment_review","duplicate successful charges require review");
await assert.rejects(()=>reconcile(second,"42","approved","2026-10-23T15:00:00Z"),/PAYMENT_CONFLICT/);
const third=await approve(await quote(1));
assert.equal(await stock(),0);
await db.query("select marketplace_cancel_unstarted_order($1,$2)",[third,admin]);
assert.equal(await stock(),1);
await db.query("select marketplace_cancel_unstarted_order($1,$2)",[third,admin]);
assert.equal(await stock(),1,"cancel retry must not add stock twice");
await assert.rejects(()=>db.query("select marketplace_cancel_unstarted_order($1,$2)",[second,admin]),/PAYMENT_ALREADY_STARTED/);
const perms=await db.query("select has_table_privilege('authenticated','marketplace_orders','SELECT') allowed,has_function_privilege('authenticated','marketplace_reconcile_payment(uuid,text,text,integer,timestamptz)','EXECUTE') can_reconcile");
assert.equal(perms.rows[0].allowed,false);
assert.equal(perms.rows[0].can_reconcile,false);
await db.close();
console.log("PASS payment SQL: full migrations, trusted approval, immutable totals, atomic inventory/rollback, duplicate requests, stale events, refunds/chargebacks, duplicate charges, cancellation and restricted privileges.");
