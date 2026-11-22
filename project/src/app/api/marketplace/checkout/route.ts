import { authenticatedMarket, getProfile, json, requireVerifiedProfile, sameOrigin, unavailable } from "@/lib/marketplace/server";
import { checkoutSubtotal, resolveCheckoutItems } from "@/lib/marketplace/checkout";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Origem inválida." }, 403);
  try {
    const session = await authenticatedMarket();
    if (!session) return json({ error: "Entre na sua conta para continuar." }, 401);
    if (!(await requireVerifiedProfile(session.user))) return json({ error: "Complete o cadastro na área da conta." }, 403);
    const body = await request.json().catch(() => null);
    let items;
    try { items = await resolveCheckoutItems(session.client, body?.items); }
    catch (error) { return json({ error: error instanceof Error ? error.message : "Revise o carrinho." }, 400); }
    const profile = await getProfile(session.user.id, session.client);
    if (!profile) return json({ error: "Complete seu cadastro." }, 403);
    const { name, cep, street, number, complement, neighborhood, city, state } = profile;
    return json({ items, subtotal_cents: checkoutSubtotal(items), has_unpriced_items: items.some(item => item.price_cents === null), address: { name, cep, street, number, complement, neighborhood, city, state }, payment_enabled: false });
  } catch { return unavailable(); }
}
