import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import {
  authenticatedMarket,
  getProfile,
  json,
  saveSession,
  sameOrigin,
  unavailable,
} from "@/lib/marketplace/server";
import { digits, validPhone } from "@/lib/marketplace/validation";

const cooldownCookie = "ct-market-phone-cooldown";
const cooldownOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/api/marketplace/auth/phone",
  maxAge: 60,
};

function userClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("GOOGLE_NOT_CONFIGURED");
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Origem inválida." }, 403);
  try {
    const session = await authenticatedMarket();
    if (!session?.refresh)
      return json(
        { error: "Entre novamente com o Google para confirmar seu celular." },
        401,
      );
    const body = await request.json().catch(() => null);
    if (!body || !["send", "verify"].includes(body.action))
      return json({ error: "Ação inválida." }, 400);
    const profile = await getProfile(session.user.id, session.client);
    if (!profile?.terms_accepted_at || !validPhone(profile.phone))
      return json(
        { error: "Salve seu cadastro completo antes de confirmar o celular." },
        400,
      );

    const client = userClient();
    const { data: restored, error: restoreError } =
      await client.auth.setSession({
        access_token: session.access,
        refresh_token: session.refresh,
      });
    if (restoreError || !restored.session)
      return json(
        { error: "Sessão expirada. Entre novamente com o Google." },
        401,
      );

    if (body.action === "send") {
      const jar = await cookies();
      if (jar.get(cooldownCookie)?.value)
        return json(
          { error: "Aguarde um minuto antes de solicitar outro código." },
          429,
        );
      const phone = `+55${digits(profile.phone)}`;
      if (
        restored.user?.phone_confirmed_at &&
        digits(restored.user.phone || "") === digits(phone)
      ) {
        await session.client
          .from("marketplace_profiles")
          .update({ phone_verified_at: new Date().toISOString() })
          .eq("user_id", session.user.id);
        return json({ verified: true, message: "Celular já confirmado." });
      }
      const { error } = await client.auth.updateUser({ phone });
      if (error)
        return json(
          {
            error:
              error.status === 429
                ? "Muitas tentativas. Aguarde antes de pedir outro código."
                : "Não foi possível enviar o SMS. Confira o celular e tente novamente.",
          },
          error.status === 429 ? 429 : 400,
        );
      jar.set(cooldownCookie, "1", cooldownOptions);
      return json({
        sent: true,
        message:
          "Código enviado por SMS. Ele pode levar alguns instantes para chegar.",
      });
    }

    if (typeof body.code !== "string" || !/^\d{6}$/.test(body.code))
      return json(
        { error: "Informe o código de 6 dígitos recebido por SMS." },
        400,
      );
    const phone = `+55${digits(profile.phone)}`;
    const { data, error } = await client.auth.verifyOtp({
      phone,
      token: body.code,
      type: "phone_change",
    });
    if (
      error ||
      !data.user ||
      !data.user.phone_confirmed_at ||
      digits(data.user.phone || "") !== digits(phone)
    )
      return json(
        {
          error:
            "Código inválido ou expirado. Confira o SMS e tente novamente.",
        },
        400,
      );
    if (
      !data.user.identities?.some((identity) => identity.provider === "google")
    )
      return json({ error: "A conta precisa estar vinculada ao Google." }, 403);
    if (data.session) await saveSession(data.session);
    const { error: profileError } = await session.client
      .from("marketplace_profiles")
      .update({ phone_verified_at: new Date().toISOString() })
      .eq("user_id", session.user.id)
      .eq("phone", digits(profile.phone));
    if (profileError) return unavailable();
    const jar = await cookies();
    jar.set(cooldownCookie, "", { ...cooldownOptions, maxAge: 0 });
    return json({
      verified: true,
      message: "Celular confirmado. Compras e vendas liberadas.",
    });
  } catch {
    return unavailable();
  }
}
