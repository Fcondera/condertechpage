import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);
const values = new Map();
const writes = [];
const jar = {
  get(key) { return values.has(key) ? { value: values.get(key) } : undefined; },
  set(key, value, options) {
    writes.push({ key, value, options });
    if (options.maxAge === 0) values.delete(key);
    else values.set(key, value);
  },
};
Object.assign(process.env, { SUPABASE_URL: "https://auth.example.test", SUPABASE_ANON_KEY: "test-anon-key" });
const module = { exports: {} };
const source = readFileSync(new URL("../src/lib/marketplace/oauth.ts", import.meta.url), "utf8");
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
new Function("require", "module", "exports", code)(id => id === "next/headers" ? { cookies: async () => jar } : require(id), module, module.exports);
const { oauthClient } = module.exports;
const first = await oauthClient();
const started = await first.auth.signInWithOAuth({ provider: "google", options: { redirectTo: "https://shop.example.test/api/marketplace/auth/callback", skipBrowserRedirect: true } });
assert.equal(started.error, null);
assert.ok(new URL(started.data.url).searchParams.get("code_challenge"));
const verifierKey = "ct-market-oauth-code-verifier";
assert.ok(values.get(verifierKey), "PKCE verifier must survive the redirect in a cookie");
assert.ok(writes.every(({ options }) => options.httpOnly && options.sameSite === "lax" && options.path === "/api/marketplace/auth"));
const verifier = JSON.parse(values.get(verifierKey)).split("/")[0];
const originalFetch = globalThis.fetch;
let exchanges = 0;
globalThis.fetch = async (url, options) => {
  assert.equal(new URL(url).pathname, "/auth/v1/token");
  const body = JSON.parse(options.body);
  assert.equal(body.auth_code, "test-google-code");
  assert.equal(body.code_verifier, verifier);
  exchanges += 1;
  return new Response(JSON.stringify({ access_token: "test-access-token", refresh_token: "test-refresh-token", token_type: "bearer", expires_in: 3600, user: { id: "test-buyer", email: "buyer@example.test", identities: [{ provider: "google" }] } }), { status: 200, headers: { "Content-Type": "application/json" } });
};
try {
  const callback = await oauthClient();
  const result = await callback.auth.exchangeCodeForSession("test-google-code");
  assert.equal(result.error, null);
  assert.equal(result.data.session.access_token, "test-access-token");
  assert.equal(exchanges, 1);
  assert.equal(values.has(verifierKey), false, "Verifier must be consumed after exchange");
  assert.ok(writes.every(({ key }) => key === verifierKey), "OAuth storage must not write session tokens into cookies");
} finally {
  globalThis.fetch = originalFetch;
}
console.log("PASS Google OAuth: real Supabase SDK, PKCE cookie across requests, exchange, cleanup and no OAuth session cookies.");
