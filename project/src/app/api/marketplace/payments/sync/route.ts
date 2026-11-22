import { authenticatedMarket, json, sameOrigin, unavailable } from "@/lib/marketplace/server";
import { isUuid } from "@/lib/marketplace/chat";
import { syncPayment } from "@/lib/marketplace/payment-sync";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Origem inválida." }, 403);
  try {
    const session = await authenticatedMarket();
    if (!session) return json({ error: "Entre para consultar o pagamento." }, 401);
    const body = await request.json().catch(() => null);
    if (!isUuid(body?.orderId) || typeof body.paymentId !== "string" || !/^\d{1,30}$/.test(body.paymentId)) return json({ error: "Informe o número do pagamento." }, 400);
    let query = session.client.from("marketplace_orders").select("id").eq("id", body.orderId);
    if (session.user.app_metadata?.marketplace_role !== "admin") query = query.eq("user_id", session.user.id);
    const order = await query.maybeSingle();
    if (order.error) return unavailable();
    if (!order.data) return json({ error: "Pedido indisponível." }, 404);
    await syncPayment(body.paymentId, order.data.id, session.client);
    return json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "PAYMENT_MISMATCH") return json({ error: "Este pagamento não corresponde ao pedido." }, 409);
    return unavailable();
  }
}
