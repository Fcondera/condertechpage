import { authenticatedMarket, json, sameOrigin, unavailable } from "@/lib/marketplace/server";

export async function GET() {
  try {
    const session = await authenticatedMarket();
    if (!session) return json({ error: "Entre para acessar sua loja." }, 401);
    const { data, error } = await session.client.from("marketplace_sellers").select("name, city, description").eq("user_id", session.user.id).maybeSingle();
    if (error) return unavailable();
    const requests = await session.client.from("marketplace_quotes").select("id, created_at, status, items, notes, customer_contact").contains("items", [{ seller_id: session.user.id }]).order("created_at", { ascending: false }).limit(100);
    if (requests.error) return unavailable();
    return json({ seller: data, requests: (requests.data || []).map(row => ({ ...row, items: row.items.filter((item: { seller_id?: string }) => item.seller_id === session.user.id) })) });
  } catch { return unavailable(); }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Origem inválida." }, 403);
  try {
    const session = await authenticatedMarket();
    if (!session) return json({ error: "Entre para cadastrar sua loja." }, 401);
    const body = await request.json().catch(() => null);
    if (typeof body?.name !== "string" || body.name.trim().length < 3 || body.name.length > 80 || typeof body.city !== "string" || body.city.trim().length < 2 || body.city.length > 100 || typeof body.description !== "string" || body.description.length > 1000) return json({ error: "Revise nome, cidade e descrição da loja." }, 400);
    const { error } = await session.client.from("marketplace_sellers").upsert({ user_id: session.user.id, name: body.name.trim(), city: body.city.trim(), description: body.description.trim() });
    if (error) return unavailable();
    return json({ success: true });
  } catch { return unavailable(); }
}
