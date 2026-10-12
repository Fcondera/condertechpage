import assert from "node:assert/strict";

const origin = process.argv[2] || "http://localhost:3100";
const paths = ["/marketplace", "/marketplace/entrar", "/marketplace/cadastro", "/marketplace/recuperar", "/marketplace/redefinir-senha", "/marketplace/conta", "/marketplace/vender", "/marketplace/carrinho", "/marketplace/pdv", "/marketplace/relogio-de-ponto", "/marketplace/cartao-nfc", "/marketplace/nori-sistemas", "/marketplace/sistema-de-ponto", "/marketplace/sistema-de-agendamento"];
for (const path of paths) {
  const response = await fetch(origin + path);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.ok(html.includes("Marketplace"), `${path} has marketplace shell`);
  assert.ok(!html.includes("<footer"), `${path} does not have the landing footer`);
  assert.ok(!html.includes("SUPABASE_SERVICE_ROLE_KEY"), `${path} does not expose environment configuration`);
  console.log(`PASS ${path}`);
}
for (const path of ["/marketplace/produto-inexistente", "/marketplace/anuncio/invalid-id"]) {
  const response = await fetch(origin + path);
  assert.equal(response.status, 404, path);
  console.log(`PASS unknown route: ${path}`);
}
for (const endpoint of ["quotes", "seller", "listings?mine=1"]) {
  const response = await fetch(`${origin}/api/marketplace/${endpoint}`);
  assert.equal(response.status, 401, `unauthenticated ${endpoint}`);
  console.log(`PASS protected GET ${endpoint}`);
}
for (const endpoint of ["auth", "quotes", "seller", "listings", "upload"]) {
  const response = await fetch(`${origin}/api/marketplace/${endpoint}`, { method: "POST", headers: { Origin: "https://untrusted.example", "Content-Type": "application/json" }, body: "{}" });
  assert.equal(response.status, 403, `cross-origin ${endpoint}`);
  console.log(`PASS origin check ${endpoint}`);
}
for (const endpoint of ["quotes", "seller", "listings", "upload"]) {
  const response = await fetch(`${origin}/api/marketplace/${endpoint}`, { method: "POST", headers: { Origin: origin, "Content-Type": "application/json" }, body: "{}" });
  assert.equal(response.status, 401, `unauthenticated write ${endpoint}`);
  console.log(`PASS protected POST ${endpoint}`);
}
const invalidAuth = await fetch(`${origin}/api/marketplace/auth`, { method: "POST", headers: { Origin: origin, "Content-Type": "application/json" }, body: JSON.stringify({ action: "login", email: "invalid", password: "123" }) });
assert.equal(invalidAuth.status, 400, "invalid credentials rejected without external auth request");
const profile = await fetch(`${origin}/api/marketplace/auth`, { method: "PATCH", headers: { Origin: origin, "Content-Type": "application/json" }, body: JSON.stringify({ name: "Test" }) });
assert.equal(profile.status, 401, "profile requires authentication");
for (const image of ["pdv", "relogio-de-ponto", "cartao-nfc", "nori-sistemas", "sistema-de-ponto", "sistema-de-agendamento"]) {
  const response = await fetch(`${origin}/image/products/${image}.png`, { method: "HEAD" });
  assert.equal(response.status, 200, `image ${image}`);
}
console.log("PASS marketplace smoke checks. No accounts created or external data modified.");
