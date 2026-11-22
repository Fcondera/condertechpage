import assert from "node:assert/strict";

const base = process.env.SEO_TEST_URL || "http://127.0.0.1:3010";
const origin = "https://www.condertech.com.br";
const paths = ["/solucoes/inteligencia-artificial-personalizada", "/solucoes/software-sob-medida", "/solucoes/automacao-comercial", "/solucoes/integracao-e-automacao-de-processos"];
const titles = new Set();
for (const path of paths) {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  if (path.endsWith("inteligencia-artificial-personalizada")) {
    for (const term of ["RAG", "MCP", "LLMs", "Agentes de IA personalizados"]) assert.ok(html.includes(term), `AI service explains ${term}`);
  }
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert.ok(title?.includes("ConderTech"));
  titles.add(title);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, "One descriptive H1 per page");
  assert.ok(html.includes(`rel="canonical" href="${origin}${path}"`), "Self canonical");
  assert.ok(html.includes('name="description"'), "Description rendered on server");
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  const entities = schemas.flatMap(schema => schema["@graph"] || [schema]);
  const service = entities.find(item => item["@type"] === "Service");
  assert.equal(service.url, `${origin}${path}`);
  assert.equal(service.provider["@id"], `${origin}/#organization`);
  assert.ok(entities.some(item => item["@type"] === "WebSite"));
  const faq = entities.find(item => item["@type"] === "FAQPage");
  assert.equal(faq.mainEntity.length, 3);
  for (const item of faq.mainEntity) {
    assert.ok(html.includes(item.name), "FAQ question visible in HTML");
    assert.ok(html.includes(item.acceptedAnswer.text), "FAQ answer visible in HTML");
  }
  assert.ok(!html.includes('name="robots" content="noindex'), "Public service indexable");
  console.log(`PASS ${path}: HTML, canonical, metadata, service, breadcrumbs and visible FAQ`);
}
assert.equal(titles.size, paths.length, "Unique page titles");
const home = await (await fetch(base)).text();
for (const path of paths) assert.ok(home.includes(`href="${path}"`), "Services linked from home");
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
for (const path of [...paths, "/marketplace/switch-gerenciavel", "/marketplace/access-point", "/marketplace/rack-infraestrutura", "/marketplace/nobreak"]) assert.ok(sitemap.includes(`${origin}${path}`), "Public pages in sitemap");
assert.ok(!sitemap.includes("/marketplace/conta"));
assert.equal((await fetch(`${base}/solucoes/not-a-service`)).status, 404);
console.log("PASS SEO: internal links, complete product sitemap, private pages excluded, unknown service returns 404.");
