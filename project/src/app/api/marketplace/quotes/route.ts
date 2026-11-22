import {
  authenticatedMarket,
  getProfile,
  json,
  requireVerifiedProfile,
  sameOrigin,
  unavailable,
} from "@/lib/marketplace/server";
import { checkoutSubtotal, paymentPreferences, resolveCheckoutItems } from "@/lib/marketplace/checkout";

export async function GET() {
  try {
    const session = await authenticatedMarket();
    if (!session)
      return json({ error: "Entre na sua conta para continuar." }, 401);
    const queryQuotes = (columns: string) => session.client
      .from("marketplace_quotes")
      .select(columns)
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })
      .limit(100);
    let { data, error } = await queryQuotes("id, created_at, status, items, notes, checkout");
    // Older installations may not have applied marketplace-checkout.sql yet.
    if (error && ["42703", "PGRST204"].includes(error.code) && /\bcheckout\b/i.test(error.message)) {
      ({ data, error } = await queryQuotes("id, created_at, status, items, notes"));
    }
    if (error) {
      console.error("marketplace.quotes.read", { code: error.code });
      return unavailable();
    }
    return json({ quotes: data });
  } catch {
    return unavailable();
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Origem inválida." }, 403);
  try {
    const session = await authenticatedMarket();
    if (!session)
      return json({ error: "Entre na sua conta para continuar." }, 401);
    if (!(await requireVerifiedProfile(session.user)))
      return json(
        {
          error:
            "Complete seu cadastro na área da conta antes de enviar a solicitação.",
        },
        403,
      );
    const body = await request.json().catch(() => null);
    if (
      !Array.isArray(body?.items) ||
      body.items.length < 1 ||
      body.items.length > 50 ||
      typeof body?.notes !== "string" ||
      body.notes.length > 2000 ||
      typeof body?.requestId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        body.requestId,
      )
    )
      return json(
        { error: "Revise os produtos, quantidades e observações." },
        400,
      );
    if (body.checkout && (!paymentPreferences.includes(body.paymentPreference) || body.acceptConditions !== true))
      return json({ error: "Revise as condições e a preferência de pagamento." }, 400);
    const existing = await session.client
      .from("marketplace_quotes")
      .select("id")
      .eq("user_id", session.user.id)
      .eq("request_id", body.requestId)
      .maybeSingle();
    if (existing.data) return json({ id: existing.data.id });
    let items;
    try { items = await resolveCheckoutItems(session.client, body.items); }
    catch (error) { return json({ error: error instanceof Error ? error.message : "Revise o carrinho." }, 400); }
    const profile = await getProfile(session.user.id, session.client);
    if (body.checkout && (!Array.isArray(body.reviewedItems) || JSON.stringify(body.reviewedItems) !== JSON.stringify(items)))
      return json({ error: "Os produtos ou preços mudaram. Atualize a revisão antes de continuar." }, 409);
    if (body.checkout && !profile) return json({ error: "Complete seu cadastro." }, 403);
    const address = profile ? { name: profile.name, cep: profile.cep, street: profile.street, number: profile.number, complement: profile.complement, neighborhood: profile.neighborhood, city: profile.city, state: profile.state } : null;
    if (body.checkout && JSON.stringify(body.reviewedAddress) !== JSON.stringify(address))
      return json({ error: "O endereço mudou. Atualize a revisão antes de continuar." }, 409);
    const { data, error } = await session.client
      .from("marketplace_quotes")
      .insert({
        ...(body.checkout ? { checkout: {
          version: 1,
          payment_status: "not_started",
          payment_preference: body.paymentPreference,
          shipping_status: "to_quote",
          subtotal_cents: checkoutSubtotal(items),
          has_unpriced_items: items.some(item => item.price_cents === null),
          address,
          conditions_accepted_at: new Date().toISOString(),
        } } : {}),
        user_id: session.user.id,
        request_id: body.requestId,
        items,
        notes: body.notes.trim(),
        customer_contact: {
          name: profile?.name || "",
          email: session.user.email,
        },
        status: "solicitado",
      })
      .select("id")
      .single();
    if (error) {
      if (error.code === "23505") {
        const retry = await session.client.from("marketplace_quotes").select("id").eq("user_id", session.user.id).eq("request_id", body.requestId).maybeSingle();
        if (retry.data) return json({ id: retry.data.id });
      }
      return unavailable();
    }
    return json({ id: data.id }, 201);
  } catch {
    return unavailable();
  }
}
