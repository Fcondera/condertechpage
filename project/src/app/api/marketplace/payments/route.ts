import { authenticatedMarket, json, requireVerifiedProfile, sameOrigin, unavailable } from "@/lib/marketplace/server";
import { isUuid } from "@/lib/marketplace/chat";
import { buildPreference, mercadoRequest, paymentConfig, safeCheckoutUrl } from "@/lib/marketplace/mercadopago";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Origem inválida." }, 403);
  try {
    const session = await authenticatedMarket();
    if (!session) return json({ error: "Entre para pagar seu pedido." }, 401);
    if (!(await requireVerifiedProfile(session.user))) return json({ error: "Complete o cadastro e confirme seu celular antes de pagar." }, 403);
    const body = await request.json().catch(() => null);
    if (!isUuid(body?.orderId) || body.acceptTotal !== true) return json({ error: "Revise e aceite o total do pedido." }, 400);
    const result = await session.client.from("marketplace_orders").select("*").eq("id", body.orderId).eq("user_id", session.user.id).maybeSingle();
    if (result.error) return unavailable();
    const order = result.data;
    if (!order) return json({ error: "Pedido indisponível." }, 404);
    const config = paymentConfig();
    if (order.collector_id !== config.collector || order.live_mode !== config.live) return json({ error: "Este pedido pertence a outra configuração de pagamento. Contate a equipe." }, 409);
    if (body.totalCents !== order.total_cents) return json({ error: "O valor mudou. Atualize a revisão do pedido." }, 409);
    if (order.status === "awaiting_payment" && order.checkout_url) {
      const url = safeCheckoutUrl(order.checkout_url);
      if (url) return json({ url });
    }
    if (order.status !== "ready") return json({ error: order.status === "creating" ? "O pagamento está sendo preparado. Se a conexão falhou, contate a equipe para recuperar o checkout." : "Este pedido não está disponível para um novo pagamento." }, 409);
    const claim = await session.client.from("marketplace_orders").update({ status: "creating", updated_at: new Date().toISOString() }).eq("id", order.id).eq("status", "ready").select("id").maybeSingle();
    if (claim.error) return unavailable();
    if (!claim.data) return json({ error: "Este pagamento já está sendo preparado. Aguarde e atualize." }, 409);
    // A timeout is ambiguous: keep 'creating' instead of creating another preference.
    const preference = await mercadoRequest("/checkout/preferences", buildPreference(order, session.user.email || ""));
    const url = safeCheckoutUrl(config.live ? preference.init_point : preference.sandbox_init_point);
    if (!url || typeof preference.id !== "string" || String(preference.collector_id) !== config.collector) return unavailable();
    const saved = await session.client.from("marketplace_orders").update({ preference_id: preference.id, checkout_url: url, status: "awaiting_payment", updated_at: new Date().toISOString() }).eq("id", order.id).eq("status", "creating");
    if (saved.error) return unavailable();
    return json({ url });
  } catch { return unavailable(); }
}
