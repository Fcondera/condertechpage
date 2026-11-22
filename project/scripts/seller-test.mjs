import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

function compile(path, require) {
  const module = { exports: {} };
  const code = ts.transpileModule(readFileSync(new URL(`../src/${path}.ts`, import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  new Function("require", "module", "exports", code)(require, module, module.exports);
  return module.exports;
}
const admin = compile("lib/marketplace/admin", () => {});
const products = compile("data/products", () => {});
const catalog = compile("data/marketplace", () => products);
let user, calls;
const rows = [{ id: "mixed", items: [{ id: catalog.marketProducts[0].id, seller_id: null }, { id: "other", seller_id: "other" }, { id: "personal", seller_id: "owner" }] }, { id: "unrelated", items: [{ id: "not-official", seller_id: null }] }];
const client = { from(table) { return {
  select() { return this; }, eq() { return this; },
  async maybeSingle() { return { data: null, error: null }; },
  or(filter) { calls.push(["or", filter]); return this; },
  contains(field, value) { calls.push(["contains", field, value]); return this; },
  order() { return this; }, limit() { return this; }, async returns() { return { data: rows, error: null }; },
}; } };
const seller = compile("app/api/marketplace/seller/route", id => {
  if (id.endsWith("/admin")) return admin;
  if (id.endsWith("/marketplace")) return catalog;
  return { authenticatedMarket: async () => ({ user, client }), requireVerifiedProfile: async () => true, json: body => Response.json(body), unavailable: () => new Response(null, { status: 503 }) };
});
user = { id: "owner", email: "condertechsuporte@gmail.com", email_confirmed_at: "confirmed", app_metadata: { marketplace_role: "admin" } }; calls = [];
let response = await seller.GET(); assert.equal(response.status, 200);
let data = await response.json();
assert.equal(data.seller.name, "ConderTech");
assert.equal(data.officialProducts.length, catalog.marketProducts.length);
assert.deepEqual(data.officialProducts.map(p => p.id), catalog.marketProducts.map(p => p.id));
assert.deepEqual(data.requests[0].items.map(p => p.id), [catalog.marketProducts[0].id, "personal"]);
assert.equal(data.requests.length, 1);
assert.equal(calls[0][0], "or");
for (const other of [{ id: "other", email: "other@gmail.com", app_metadata: { marketplace_role: "admin" } }, { id: "other", email: "condertechsuporte@gmail.com", email_confirmed_at: "confirmed", app_metadata: {} }]) {
  user = other; calls = [];
  data = await (await seller.GET()).json();
  assert.deepEqual(data.officialProducts, []);
  assert.equal(data.seller, null);
  assert.equal(calls[0][0], "contains");
  assert.ok(data.requests.every(row => row.items.every(item => item.seller_id === user.id)));
}
console.log(`PASS seller: all ${catalog.marketProducts.length} official products linked to verified ConderTech owner; inquiries isolated by seller.`);
