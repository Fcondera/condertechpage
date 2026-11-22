import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

// Exercise the actual resolver with an isolated database double. No external writes.
const cache = new Map();
function load(path) {
  if (cache.has(path)) return cache.get(path);
  const code = ts.transpileModule(readFileSync(new URL(`../src/${path}.ts`, import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const module = { exports: {} };
  new Function("require", "module", "exports", code)(id => load(id.replace("@/", "")), module, module.exports);
  cache.set(path, module.exports);
  return module.exports;
}
const { resolveCheckoutItems, checkoutSubtotal } = load("lib/marketplace/checkout");
let listing = { id: "vendor-item", title: "Switch", seller_id: "seller", stock: 3, price_cents: 12990 };
const filters = [];
const query = { select() { return this; }, eq(...args) { filters.push(args); return this; }, async maybeSingle() { return { data: listing, error: null }; } };
const client = { from(table) { assert.equal(table, "marketplace_listings"); return query; } };
const items = await resolveCheckoutItems(client, [{ id: "switch-gerenciavel", quantity: 2, price_cents: 1 }, { id: "vendor-item", quantity: 3, price_cents: 1, seller_id: "attacker" }]);
assert.equal(items[0].price_cents, null);
assert.equal(items[1].price_cents, 12990);
assert.equal(items[1].seller_id, "seller");
assert.equal(checkoutSubtotal(items), 38970);
assert.ok(filters.some(([field, value]) => field === "status" && value === "aprovado"));
for (const value of [[], null, [{ id: "pdv", quantity: 0 }], [{ id: "pdv", quantity: 1.5 }], [{ id: "pdv", quantity: 1000 }], [{ id: "pdv", quantity: 1 }, { id: "pdv", quantity: 1 }], [{ id: "vendor-item", quantity: 4 }]]) {
  await assert.rejects(() => resolveCheckoutItems(client, value));
}
listing = null;
await assert.rejects(() => resolveCheckoutItems(client, [{ id: "missing", quantity: 1 }]));
console.log("PASS checkout: trusted prices/sellers, partial subtotal, approval filter, quantities, duplicate items, stock and unavailable listings.");
