import { authenticatedMarket, json, sameOrigin, unavailable } from "@/lib/marketplace/server";
import { marketProducts } from "@/data/marketplace";

export async function GET() {
  try {
    const session = await authenticatedMarket();
    if (!session) return json({ error: "Entre na sua conta para continuar." }, 401);
    const { data, error } = await session.client.from("marketplace_quotes").select("id, created_at, status, items, notes").eq("user_id", session.user.id).order("created_at", { ascending: false }).limit(100);
    if (error) return unavailable();
    return json({ quotes: data });
  } catch { return unavailable(); }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Origem inválida." }, 403);
  try {
    const session = await authenticatedMarket();
    if (!session) return json({ error: "Entre na sua conta para continuar." }, 401);
    const body = await request.json().catch(() => null);
    if (!Array.isArray(body?.items) || body.items.length < 1 || body.items.length > 50 || typeof body?.notes !== "string" || body.notes.length > 2000 || typeof body?.requestId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.requestId)) return json({ error: "Revise os produtos, quantidades e observações." }, 400);
    const items = [];
    const seen = new Set<string>();
    for (const row of body.items) {
      if (!row || typeof row.id !== "string" || seen.has(row.id) || !Number.isInteger(row.quantity) || row.quantity < 1 || row.quantity > 999) return json({ error: "Produto ou quantidade inválida." }, 400);
      seen.add(row.id);
      const product = marketProducts.find(product => product.id === row.id);
      if (product) { items.push({ id: product.id, name: product.name, quantity: row.quantity, seller_id: null, price_cents: null }); continue; }
      const { data: listing, error } = await session.client.from("marketplace_listings").select("id, title, seller_id, price_cents, stock").eq("id", row.id).eq("status", "aprovado").maybeSingle();
      if (error || !listing || listing.stock < row.quantity) return json({ error: "Um dos anúncios não está disponível na quantidade selecionada. Revise o carrinho." }, 400);
      items.push({ id: listing.id, name: listing.title, quantity: row.quantity, seller_id: listing.seller_id, price_cents: listing.price_cents });
    }
    const existing = await session.client.from("marketplace_quotes").select("id").eq("user_id", session.user.id).eq("request_id", body.requestId).maybeSingle();
    if (existing.data) return json({ id: existing.data.id });
    const { data, error } = await session.client.from("marketplace_quotes").insert({ user_id: session.user.id, request_id: body.requestId, items, notes: body.notes.trim(), customer_contact: { name: String(session.user.user_metadata.name || ""), email: session.user.email }, status: "solicitado" }).select("id").single();
    if (error) return unavailable();
    return json({ id: data.id }, 201);
  } catch { return unavailable(); }
}
