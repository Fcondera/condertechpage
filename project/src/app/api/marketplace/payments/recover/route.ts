import { authenticatedMarket, json, sameOrigin, unavailable } from "@/lib/marketplace/server";
import { isUuid } from "@/lib/marketplace/chat";
import { buildPreference, mercadoRequest, paymentConfig, safeCheckoutUrl } from "@/lib/marketplace/mercadopago";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Origem inválida." }, 403);
  try {
    const session = await authenticatedMarket();
    if (!session) return json({ error: "Entre para continuar." }, 401);
    if (session.user.app_metadata?.marketplace_role !== "admin") return json({ error: "Acesso restrito à administração." }, 403);
    const body = await request.json().catch(() => null);
    if (!isUuid(body?.orderId) || typeof body.preferenceId !== "string" || !/^[a-z0-9-]{1,150}$/i.test(body.preferenceId)) return json({ error: "Informe o ID da preferência." }, 400);
    const result = await session.client.from("marketplace_orders").select("*").eq("id", body.orderId).eq("status", "creating").maybeSingle();
    if (result.error) return unavailable();
    if (!result.data) return json({ error: "Pedido indisponível para recuperação." }, 409);
    const order = result.data;
    const config = paymentConfig();
    const preference = await mercadoRequest(`/checkout/preferences/${encodeURIComponent(body.preferenceId)}`);
    const normalize = (items: { id: string; quantity: number; unit_price: number; currency_id: string }[]) => items.map(item => ({ id: item.id, quantity: item.quantity, cents: Math.round(item.unit_price * 100), currency: item.currency_id })).sort((a,b) => a.id.localeCompare(b.id));
    const expected = buildPreference(order, "");
    const url = safeCheckoutUrl(config.live ? preference.init_point : preference.sandbox_init_point);
    if (!url || preference.external_reference !== order.id || String(preference.collector_id) !== order.collector_id || order.collector_id !== config.collector || order.live_mode !== config.live || !Array.isArray(preference.items) || JSON.stringify(normalize(preference.items)) !== JSON.stringify(normalize(expected.items))) return json({ error: "A preferência não corresponde ao pedido." }, 409);
    const saved = await session.client.from("marketplace_orders").update({ preference_id: body.preferenceId, checkout_url: url, status: "awaiting_payment", updated_at: new Date().toISOString() }).eq("id", order.id).eq("status", "creating").select("id").maybeSingle();
    if (saved.error) return unavailable();
    if (!saved.data) return json({ error: "O status mudou. Atualize o pedido." }, 409);
    return json({ ok: true });
  } catch { return unavailable(); }
}
