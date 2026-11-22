import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

const module = { exports: {} };
const code = ts.transpileModule(readFileSync(new URL("../src/lib/marketplace/admin.ts", import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
new Function("module", "exports", code)(module, module.exports);
const { ensureMarketplaceAdmin } = module.exports;
const email = "condertechsuporte@gmail.com";
const owner = { id: "owner", email, email_confirmed_at: "2026-11-22", identities: [{ provider: "google", identity_data: { email } }], app_metadata: { retained: true } };
let updates = 0;
const client = { auth: { admin: { async updateUserById(id, values) {
  updates++;
  assert.equal(id, owner.id);
  assert.deepEqual(values.app_metadata, { retained: true, marketplace_role: "admin" });
  return { data: { user: { ...owner, ...values } }, error: null };
} } } };
for (const user of [
  { ...owner, email: "other@gmail.com" },
  { ...owner, email_confirmed_at: null },
  { ...owner, identities: [{ provider: "email" }] },
  { ...owner, identities: [{ provider: "google", identity_data: { email: "other@gmail.com" } }] },
  { ...owner, app_metadata: { marketplace_role: "admin" } },
]) assert.equal(await ensureMarketplaceAdmin(user, client), user);
assert.equal(updates, 0);
assert.equal((await ensureMarketplaceAdmin(owner, client)).app_metadata.marketplace_role, "admin");
assert.equal(updates, 1);
await assert.rejects(() => ensureMarketplaceAdmin(owner, { auth: { admin: { updateUserById: async () => ({ data: {}, error: new Error("failed") }) } } }), /ADMIN_CONFIGURATION_FAILED/);
console.log("PASS admin: confirmed Google owner only, metadata preserved, existing admins unchanged, failures deny access.");
