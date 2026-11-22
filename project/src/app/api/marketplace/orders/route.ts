import { authenticatedMarket, json, sameOrigin, unavailable } from "@/lib/marketplace/server";
import { isUuid } from "@/lib/marketplace/chat";
import { mercadoRequest, paymentConfig } from "@/lib/marketplace/mercadopago";

export async function GET(request: Request) {
  try {
    const session = await authenticatedMarket();
    if (!session) return json({ error: "Entre para consultar os pedidos." }, 401);
    const admin = new URL(request.url).searchParams.get("admin") === "1";
    if (admin && session.user.app_metadata?.marketplace_role !== "admin") return json({ error: "Acesso restrito à administração." }, 403);
    let query = session.client.from("marketplace_orders").select("id,quote_id,items,address,shipping_cents,total_cents,status,created_at").order("created_at", { ascending: false }).limit(100);
    if (!admin) query = query.eq("user_id", session.user.id);
    const result = await query;
    if (result.error) return unavailable();
    let quotes: { id: string; items: unknown; customer_contact: unknown; status: string; created_at: string }[] = [];
    if (admin) {
      const result = await session.client.from("marketplace_quotes").select("id,items,customer_contact,status,created_at").neq("status", "cancelado").order("created_at", { ascending: false }).limit(100);
      if (result.error) return unavailable();
      quotes = result.data || [];
    }
    let configured = false;
    try { paymentConfig(); configured = true; } catch { /* Never expose secrets. */ }
    return json({ orders: result.data, quotes, configured });
  } catch { return unavailable(); }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Origem inválida." }, 403);
  try {
    const session = await authenticatedMarket();
    if (!session) return json({ error: "Entre para continuar." }, 401);
    if (session.user.app_metadata?.marketplace_role !== "admin") return json({ error: "Somente administradores podem liberar cobranças." }, 403);
    const body = await request.json().catch(() => null);
    if (body?.action === "cancel" && isUuid(body.orderId)) {
      const result = await session.client.rpc("marketplace_cancel_unstarted_order", { p_order: body.orderId, p_admin: session.user.id });
      if (result.error) return json({ error: "Só é possível cancelar antes da criação do checkout. Para pagamentos já iniciados, confirme cancelamentos e devoluções no Mercado Pago." }, 409);
      return json({ ok: true });
    }
    if (!isUuid(body?.quoteId) || body.confirmAvailability !== true || !Number.isInteger(body.shippingCents) || body.shippingCents < 0 || body.shippingCents > 100000000 || !Array.isArray(body.prices) || !body.prices.length || body.prices.length > 50) return json({ error: "Revise os preços, o frete e a confirmação de disponibilidade." }, 400);
    const seen = new Set<string>();
    for (const item of body.prices) {
      if (!item || typeof item.id !== "string" || seen.has(item.id) || !Number.isInteger(item.price_cents) || item.price_cents < 100 || item.price_cents > 100000000) return json({ error: "Informe um preço válido para cada produto." }, 400);
      seen.add(item.id);
    }
    let config;
    try { config = paymentConfig(); } catch { return json({ error: "Configure as credenciais do Mercado Pago no servidor antes de liberar cobranças." }, 503); }
    const collector = await mercadoRequest("/users/me");
    if (String(collector.id) !== config.collector) return json({ error: "As credenciais não correspondem à conta recebedora configurada." }, 503);
    const result = await session.client.rpc("marketplace_approve_order", { p_quote: body.quoteId, p_admin: session.user.id, p_prices: body.prices, p_shipping: body.shippingCents, p_collector: config.collector, p_live: config.live });
    if (result.error) return json({ error: "Não foi possível liberar: confira os itens, cadastro, estoque e o status da solicitação." }, 409);
    return json({ id: result.data }, 201);
  } catch { return unavailable(); }
}
