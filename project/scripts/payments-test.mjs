import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { createHmac } from "node:crypto";
import ts from "typescript";

const require = createRequire(import.meta.url);
function compile(path, dependencies = {}) {
  const module = { exports: {} };
  const source = readFileSync(new URL(`../src/${path}.ts`, import.meta.url), "utf8");
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  new Function("require", "module", "exports", code)(id => dependencies[id] || require(id), module, module.exports);
  return module.exports;
}
Object.assign(process.env, { MERCADOPAGO_ACCESS_TOKEN: "test-token", MERCADOPAGO_WEBHOOK_SECRET: "test-secret", MERCADOPAGO_COLLECTOR_ID: "123", MERCADOPAGO_MODE: "test", MARKETPLACE_SITE_URL: "https://example.test" });
const mp = compile("lib/marketplace/mercadopago");
const id = "11111111-1111-4111-8111-111111111111";
const order = { id, quote_id: id, user_id: "buyer", total_cents: 10100, shipping_cents: 100, collector_id: "123", live_mode: false, status: "ready", items: [{ id: "product", name: "Produto", quantity: 2, price_cents: 5000 }] };
const payment = { id: 42, external_reference: id, transaction_amount: 101, currency_id: "BRL", collector_id: 123, live_mode: false, status: "approved", date_last_updated: "2026-10-23T15:00:00Z", transaction_amount_refunded: 0 };
assert.ok(mp.matchesPayment(payment, order));
for (const changed of [{ transaction_amount: 1 }, { currency_id: "USD" }, { collector_id: 999 }, { live_mode: true }, { external_reference: "other" }]) assert.equal(mp.matchesPayment({ ...payment, ...changed }, order), false);
for (const value of ["https://evil.test", "https://www.mercadopago.com.br.evil.test", "javascript:alert(1)", "http://www.mercadopago.com.br", "https://user@www.mercadopago.com.br"]) assert.equal(mp.safeCheckoutUrl(value), null);
assert.ok(mp.safeCheckoutUrl("https://sandbox.mercadopago.com.br/checkout/v1/redirect?pref_id=abc"));
const preference = mp.buildPreference(order, "buyer@example.test");
assert.equal(preference.external_reference, id);
assert.equal(preference.items.reduce((sum, row) => sum + row.quantity * row.unit_price, 0), 101);
assert.equal(preference.back_urls.success, `https://example.test/marketplace/pagamento?pedido=${id}`);
assert.ok(preference.notification_url.startsWith("https://example.test/api/marketplace/payments/webhook"));
const hash = createHmac("sha256", "test-secret").update("id:42;request-id:req;ts:1234567890;").digest("hex");
function webhook(signature = hash, query = "42") { return new Request(`https://example.test/api/marketplace/payments/webhook?data.id=${query}&type=payment`, { method: "POST", headers: { "x-request-id": "req", "x-signature": `ts=1234567890,v1=${signature}` }, body: JSON.stringify({ data: { id: "999" }, status: "approved" }) }); }
assert.ok(mp.verifyPaymentSignature(webhook(), "test-secret"));
assert.equal(mp.verifyPaymentSignature(webhook("0".repeat(64)), "test-secret"), false);
assert.equal(mp.verifyPaymentSignature(webhook(hash,"43"), "test-secret"), false);
assert.equal(mp.verifyPaymentSignature(new Request("https://example.test"), "test-secret"), false);

let user = { id: "buyer", app_metadata: {} };
let state = { ...order };
let reconciled;
let rpcCount = 0;
let networkCalls = 0;
let failNetwork = false;
const filters = [];
const client = { from() {
  let update;
  let predicates = [];
  return {
    select() { return this; }, order() { return this; }, limit() { return this; },
    eq(key,value) { filters.push([key,value]); predicates.push([key,value]); return this; },
    update(value) { update = value; return this; },
    async maybeSingle() {
      if (predicates.some(([key,value]) => state[key] !== value)) return { data: null, error: null };
      const data = { ...state }; if (update) Object.assign(state, update);
      return { data, error: null };
    },
    then(resolve) { if (update && predicates.every(([key,value]) => state[key] === value)) Object.assign(state,update); return Promise.resolve({ data: [state], error: null }).then(resolve); },
  };
}, async rpc(name, args) { rpcCount++; reconciled = { name, args }; return { data: id, error: null }; } };
const server = { authenticatedMarket: async () => user ? { client, user: { ...user, email: "buyer@example.test" } } : null, marketClient: () => client, requireVerifiedProfile: async () => true,
  json: (value,status=200) => Response.json(value,{status}), unavailable: () => Response.json({error:"Unavailable"},{status:503}), sameOrigin: request => request.headers.get("origin") === "https://example.test" };
const chat = compile("lib/marketplace/chat");
const mockMp = { ...mp, mercadoRequest: async path => {
  networkCalls++;
  if (failNetwork) throw new Error("TIMEOUT");
  if (path.startsWith("/v1/payments/")) return payment;
  return { id: "preference-id", collector_id: 123, sandbox_init_point: "https://sandbox.mercadopago.com.br/checkout/v1/redirect?pref_id=abc" };
} };
const deps = { "@/lib/marketplace/server": server, "./server": server, "@/lib/marketplace/chat": chat, "@/lib/marketplace/mercadopago": mockMp, "./mercadopago": mockMp };
const sync = compile("lib/marketplace/payment-sync",deps);
deps["@/lib/marketplace/payment-sync"] = sync;
const route = compile("app/api/marketplace/payments/route",deps);
const hooks = compile("app/api/marketplace/payments/webhook/route",deps);
const orders = compile("app/api/marketplace/orders/route",deps);
const request = (body, origin = "https://example.test") => new Request("https://example.test/api/marketplace/payments", { method: "POST", headers: { origin,"content-type":"application/json" }, body: JSON.stringify(body) });
const body = { orderId: id, acceptTotal: true, totalCents: 10100 };
assert.equal((await route.POST(request(body,"https://evil.test"))).status,403);
user = null;
assert.equal((await route.POST(request(body))).status,401);
user = { id:"outsider", app_metadata:{} };
assert.equal((await route.POST(request(body))).status,404);
user = { id:"buyer", app_metadata:{} };
assert.equal((await orders.POST(request({}))).status,403);
assert.equal((await orders.GET(new Request("https://example.test/api/marketplace/orders?admin=1"))).status,403);
assert.equal((await route.POST(request({...body,totalCents:1}))).status,409);
assert.equal(networkCalls,0);
assert.equal((await route.POST(request(body))).status,200);
assert.equal(state.status,"awaiting_payment");
assert.equal(networkCalls,1);
assert.equal((await route.POST(request(body))).status,200);
assert.equal(networkCalls,1,"reuse preference instead of creating another");
state={...order};
const beforeConcurrent=networkCalls;
const concurrent=await Promise.all([route.POST(request(body)),route.POST(request(body))]);
assert.equal(networkCalls-beforeConcurrent,1,"concurrent clicks must create a single preference");
assert.ok(concurrent.some(response=>response.status===200));
state = {...order,status:"ready"}; failNetwork=true;
assert.equal((await route.POST(request(body))).status,503);
assert.equal(state.status,"creating","ambiguous timeout must not reopen preference creation");
assert.equal((await route.POST(request(body))).status,409);
failNetwork=false; state={...order};
assert.equal((await hooks.POST(webhook("0".repeat(64)))).status,401);
assert.equal(rpcCount,0);
assert.equal((await hooks.POST(webhook())).status,200);
assert.equal(reconciled.name,"marketplace_reconcile_payment");
assert.equal(reconciled.args.p_payment,"42","signed URL ID takes precedence over forged body");
assert.equal(reconciled.args.p_status,"approved");
await assert.rejects(() => sync.syncPayment("42","another-order",client),/PAYMENT_MISMATCH/);
assert.ok(filters.some(([key,value]) => key === "user_id" && value === "buyer"));
console.log("PASS Mercado Pago: signature, amount/currency/collector/mode checks, preference totals, owner/admin access, immutable client total, reuse and timeout protection, verified reconciliation.");
