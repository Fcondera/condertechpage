import { json, unavailable } from "@/lib/marketplace/server";
import { syncPayment } from "@/lib/marketplace/payment-sync";
import { paymentConfig, verifyPaymentSignature } from "@/lib/marketplace/mercadopago";

export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const config = paymentConfig();
    if (!verifyPaymentSignature(request, config.secret)) return json({ error: "Assinatura inválida." }, 401);
    const params = new URL(request.url).searchParams;
    if (params.get("type") && params.get("type") !== "payment") return json({ ok: true });
    await syncPayment(params.get("data.id")!);
    return json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "PAYMENT_MISMATCH") return json({ error: "Pagamento nao corresponde ao pedido." }, 409);
    return unavailable();
  }
}
