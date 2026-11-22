import { createHmac, timingSafeEqual } from "node:crypto";

export function paymentConfig() {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  const collector = process.env.MERCADOPAGO_COLLECTOR_ID;
  const mode = process.env.MERCADOPAGO_MODE;
  const site = new URL(process.env.MARKETPLACE_SITE_URL || "http://invalid");
  if (!token || !secret || !collector || !/^\d+$/.test(collector) || !["test", "production"].includes(mode || "") || site.protocol !== "https:" || site.username || site.password || site.pathname !== "/" || site.search || site.hash) throw new Error("PAYMENTS_NOT_CONFIGURED");
  return { token, secret, collector, live: mode === "production", origin: site.origin };
}

export async function mercadoRequest(path: string, body?: unknown) {
  const config = paymentConfig();
  const response = await fetch(`https://api.mercadopago.com${path}`, {
    method: body ? "POST" : "GET",
    headers: { Authorization: `Bearer ${config.token}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store", signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error(`MERCADOPAGO_${response.status}`);
  return response.json();
}

export function verifyPaymentSignature(request: Request, secret: string) {
  const id = new URL(request.url).searchParams.get("data.id");
  const requestId = request.headers.get("x-request-id");
  const signature = request.headers.get("x-signature") || "";
  const fields = signature.split(",").map(part => part.trim().split("="));
  const ts = fields.find(([key]) => key === "ts")?.[1];
  const signatures = fields.filter(([key]) => key === "v1").map(([,value]) => value);
  if (!id || !/^\d{1,30}$/.test(id) || !requestId || requestId.length > 200 || !ts || !/^\d{1,16}$/.test(ts)) return false;
  const expected = createHmac("sha256", secret).update(`id:${id.toLowerCase()};request-id:${requestId};ts:${ts};`).digest();
  return signatures.some(value => /^[0-9a-f]{64}$/i.test(value || "") && timingSafeEqual(expected, Buffer.from(value, "hex")));
}

export type PaymentOrder = { id: string; total_cents: number; collector_id: string; live_mode: boolean };
export function matchesPayment(payment: Record<string, unknown>, order: PaymentOrder) {
  const amount = Number(payment.transaction_amount);
  return payment.external_reference === order.id && payment.currency_id === "BRL" &&
    String(payment.collector_id) === order.collector_id && payment.live_mode === order.live_mode &&
    Number.isFinite(amount) && Math.abs(amount * 100 - order.total_cents) < 0.0001;
}

export function safeCheckoutUrl(value: unknown) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && ["www.mercadopago.com.br", "sandbox.mercadopago.com.br"].includes(url.hostname) && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}

export function buildPreference(order: PaymentOrder & { items: { id: string; name: string; quantity: number; price_cents: number }[]; shipping_cents: number }, email: string) {
  const config = paymentConfig();
  const back = `${config.origin}/marketplace/pagamento?pedido=${order.id}`;
  return {
    external_reference: order.id,
    items: [...order.items.map(item => ({ id: item.id, title: item.name, quantity: item.quantity, unit_price: item.price_cents / 100, currency_id: "BRL" })),
      ...(order.shipping_cents ? [{ id: "shipping", title: "Frete", quantity: 1, unit_price: order.shipping_cents / 100, currency_id: "BRL" }] : [])],
    payer: { email },
    back_urls: { success: back, failure: back, pending: back },
    auto_return: "approved",
    notification_url: `${config.origin}/api/marketplace/payments/webhook?source_news=webhooks`,
    statement_descriptor: "CONDERTECH",
  };
}
