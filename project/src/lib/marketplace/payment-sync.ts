import { marketClient } from "./server";
import { matchesPayment, mercadoRequest } from "./mercadopago";

export async function syncPayment(id: string, expectedOrder?: string, client = marketClient()) {
  const payment = await mercadoRequest(`/v1/payments/${id}`);
  if (String(payment.id) !== id) throw new Error("PAYMENT_MISMATCH");
  if (expectedOrder && payment.external_reference !== expectedOrder) throw new Error("PAYMENT_MISMATCH");
  if (typeof payment.external_reference !== "string" || !/^[0-9a-f-]{36}$/i.test(payment.external_reference)) return;
  const result = await client.from("marketplace_orders").select("id,total_cents,collector_id,live_mode").eq("id", payment.external_reference).maybeSingle();
  if (result.error) throw new Error("DATABASE_UNAVAILABLE");
  if (!result.data) { if (expectedOrder) throw new Error("PAYMENT_MISMATCH"); return; }
  if (!matchesPayment(payment, result.data)) throw new Error("PAYMENT_MISMATCH");
  const updated = Date.parse(payment.date_last_updated);
  const refunded = Number(payment.transaction_amount_refunded || 0) * 100;
  if (!Number.isFinite(updated) || !Number.isFinite(refunded) || refunded < 0 || refunded > result.data.total_cents || !["approved","pending","in_process","authorized","in_mediation","rejected","cancelled","refunded","charged_back"].includes(payment.status)) throw new Error("PAYMENT_MISMATCH");
  const reconciled = await client.rpc("marketplace_reconcile_payment", { p_order: result.data.id, p_payment: id, p_status: payment.status, p_refunded: Math.round(refunded), p_updated: new Date(updated).toISOString() });
  if (reconciled.error) throw new Error("DATABASE_UNAVAILABLE");
}
