import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

function compile(path, require) {
  const module = { exports: {} };
  const code = ts.transpileModule(readFileSync(new URL(`../src/${path}.ts`, import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  new Function("require", "module", "exports", code)(require, module, module.exports);
  return module.exports;
}
const chat = compile("lib/marketplace/chat", () => { throw new Error("Unexpected import"); });
const thread = { id: "11111111-1111-4111-8111-111111111111", buyer_id: "buyer", seller_key: "seller-a", quote_id: "quote", subject: "Produto" };
assert.equal(chat.chatSide(thread, { id: "buyer" }), "buyer");
assert.equal(chat.chatSide(thread, { id: "seller-a" }), "seller");
assert.equal(chat.chatSide(thread, { id: "seller-b" }), null);
assert.equal(chat.chatSide(thread, { id: "admin", app_metadata: { marketplace_role: "admin" } }), null);
assert.equal(chat.chatSide({ ...thread, seller_key: "condertech" }, { id: "admin", app_metadata: { marketplace_role: "admin" } }), "seller");
for (const text of ["", "   ", "a".repeat(2001), null, {}]) assert.equal(chat.validMessage(text), false);
assert.equal(chat.validMessage("Olá!"), true);

let user = { id: "outsider" };
let calls = [];
let inserted;
const client = { from(table) {
  const query = {
    select() { return this; }, eq(...args) { calls.push(["eq", ...args]); return this; }, neq(...args) { calls.push(["neq", ...args]); return this; }, is(...args) { calls.push(["is", ...args]); return this; }, in(...args) { calls.push(["in", ...args]); return this; },
    update(value) { calls.push(["update", value]); return this; }, insert(value) { inserted = value; return this; },
    async maybeSingle() { return { data: table === "marketplace_threads" ? thread : null }; },
    async single() { return { data: { id: 1 } }; },
    then(resolve) { return Promise.resolve({ error: null }).then(resolve); },
  };
  return query;
} };
const server = {
  authenticatedMarket: async () => user ? { user, client } : null,
  json: (data, status = 200) => Response.json(data, { status }),
  unavailable: () => Response.json({ error: "Unavailable" }, { status: 503 }),
  sameOrigin: request => request.headers.get("origin") === "http://localhost:3100",
};
const route = compile("app/api/marketplace/messages/route", id => id.endsWith("/server") ? server : chat);
const request = (method, body = {}, origin = "http://localhost:3100") => new Request("http://localhost:3100/api/marketplace/messages", { method, headers: { origin, "content-type": "application/json" }, body: JSON.stringify(body) });
for (const id of ["outsider", "seller-b", "admin"]) {
  user = { id, app_metadata: { marketplace_role: id === "admin" ? "admin" : "" } };
  assert.equal((await route.GET(new Request(`http://localhost:3100/api/marketplace/messages?thread=${thread.id}`))).status, 404);
  assert.equal((await route.POST(request("POST", { thread: thread.id, text: "x" }))).status, 404);
  assert.equal((await route.PATCH(request("PATCH", { thread: thread.id, ids: [1] }))).status, 404);
}
user = null;
assert.equal((await route.GET(new Request("http://localhost:3100/api/marketplace/messages"))).status, 401);
assert.equal((await route.POST(request("POST"))).status, 401);
assert.equal((await route.PATCH(request("PATCH"))).status, 401);
assert.equal((await route.POST(request("POST", {}, "https://untrusted.example"))).status, 403);
assert.equal((await route.PATCH(request("PATCH", {}, "https://untrusted.example"))).status, 403);
user = { id: "buyer" };
assert.equal((await route.POST(request("POST", { thread: thread.id, text: "Olá", requestId: thread.id, sender_id: "seller-a", sender_side: "seller" }))).status, 201);
assert.equal(inserted.sender_id, "buyer");
assert.equal(inserted.sender_side, "buyer");
calls = [];
assert.equal((await route.PATCH(request("PATCH", { thread: thread.id, ids: [1,2] }))).status, 200);
assert.ok(calls.some(row => row[0] === "eq" && row[1] === "thread_id" && row[2] === thread.id));
assert.ok(calls.some(row => row[0] === "neq" && row[1] === "sender_side" && row[2] === "buyer"));
assert.ok(calls.some(row => row[0] === "in" && row[1] === "id" && row[2].length === 2));
assert.equal((await route.PATCH(request("PATCH", { thread: thread.id, ids: [-1] }))).status, 400);
console.log("PASS chat: buyer/seller isolation, restricted admin access, session/origin checks, trusted sender identity and precise read updates.");
