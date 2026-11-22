import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

let replies = [], calls = [], filters = [];
const client = { from(table) {
  assert.equal(table, "marketplace_quotes");
  return { select(columns) { calls.push(columns); return this; },
    eq(key, value) { filters.push([key, value]); return this; },
    order() { return this; }, limit() { return Promise.resolve(replies.shift()); } };
} };
const module = { exports: {} };
const code = ts.transpileModule(readFileSync(new URL("../src/app/api/marketplace/quotes/route.ts", import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
new Function("require", "module", "exports", code)(id => id.endsWith("/server") ? {
  authenticatedMarket: async () => ({ client, user: { id: "buyer" } }),
  json: body => Response.json(body), unavailable: () => Response.json({ error: "unavailable" }, { status: 503 }),
} : {}, module, module.exports);
const quote = { id: "quote", items: [], notes: "" };
for (const error of [null, { code: "42703", message: "column marketplace_quotes.checkout does not exist" }, { code: "PGRST204", message: "Could not find checkout column" }]) {
  calls = []; filters = [];
  replies = error ? [{ data: null, error }, { data: [quote], error: null }] : [{ data: [quote], error: null }];
  const response = await module.exports.GET();
  assert.equal(response.status, 200);
  assert.deepEqual((await response.json()).quotes, [quote]);
  assert.equal(calls.length, error ? 2 : 1);
  assert.ok(filters.every(([key, value]) => key === "user_id" && value === "buyer"));
  if (error) assert.equal(calls[1], "id, created_at, status, items, notes");
}
for (const error of [{ code: "42703", message: "column items does not exist" }, { code: "42501", message: "permission denied" }]) {
  calls = []; replies = [{ data: null, error }];
  assert.equal((await module.exports.GET()).status, 503);
  assert.equal(calls.length, 1);
}
console.log("PASS quotes: older checkout schema supported, buyer filtering retained, unrelated failures reported.");
