import { NextResponse } from "next/server";
import {
  authenticatedMarket,
  clearSession,
  getProfile,
  json,
  publicUser,
  sameOrigin,
  unavailable,
} from "@/lib/marketplace/server";
import { oauthClient, oauthCookieOptions } from "@/lib/marketplace/oauth";
import { safeNext, validateProfile } from "@/lib/marketplace/validation";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get("action") === "google") {
    try {
      if (
        process.env.NODE_ENV === "production" &&
        !process.env.MARKETPLACE_SITE_URL
      )
        throw new Error("MARKETPLACE_SITE_URL_REQUIRED");
      const origin =
        process.env.MARKETPLACE_SITE_URL || new URL(request.url).origin;
      const next = safeNext(url.searchParams.get("next"));
      const jar = await cookies();
      jar.set("ct-market-next", next, {
        ...oauthCookieOptions,
        path: "/api/marketplace/auth/callback",
      });
      const client = await oauthClient();
      const { data, error } = await client.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/api/marketplace/auth/callback`,
          queryParams: { prompt: "select_account" },
          scopes: "openid email profile",
        },
      });
      if (error || !data.url)
        throw error || new Error("GOOGLE_OAUTH_UNAVAILABLE");
      return NextResponse.redirect(data.url);
    } catch {
      const origin =
        process.env.MARKETPLACE_SITE_URL || new URL(request.url).origin;
      return NextResponse.redirect(
        new URL("/marketplace/entrar?erro=google", origin),
      );
    }
  }

  try {
    const session = await authenticatedMarket();
    if (!session) return json({ user: null, profile: null });
    const [user, profile] = await Promise.all([
      publicUser(session.user),
      getProfile(session.user.id, session.client),
    ]);
    return json({ user, profile });
  } catch {
    return unavailable();
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Origem inválida." }, 403);
  const body = await request.json().catch(() => null);
  if (body?.action !== "logout")
    return json(
      { error: "Ação inválida. Entre usando sua conta Google." },
      400,
    );
  try {
    const session = await authenticatedMarket();
    if (session)
      await session.client.auth.admin.signOut(session.access, "local");
    await clearSession();
    return json({ success: true });
  } catch {
    await clearSession();
    return unavailable();
  }
}

export async function PATCH(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Origem inválida." }, 403);
  try {
    const session = await authenticatedMarket();
    if (!session)
      return json(
        { error: "Entre com o Google para atualizar seus dados." },
        401,
      );
    const body = await request.json().catch(() => null);
    const current = await getProfile(session.user.id, session.client);
    const result = validateProfile(body, current);
    if ("error" in result) return json({ error: result.error }, 400);
    const profile = result.profile;
    const phoneChanged = current?.phone !== profile.phone;
    const { data, error } = await session.client
      .from("marketplace_profiles")
      .upsert({
        user_id: session.user.id,
        ...profile,
        terms_accepted_at:
          current?.terms_accepted_at || new Date().toISOString(),
        phone_verified_at: phoneChanged ? null : current?.phone_verified_at,
        updated_at: new Date().toISOString(),
      })
      .select(
        "name, phone, cpf, cep, street, number, complement, neighborhood, city, state, company, terms_accepted_at, phone_verified_at",
      )
      .single();
    if (error || !data) return unavailable();
    return json({
      user: await publicUser(session.user),
      profile: data,
      message:
        "Dados salvos. Confirme seu celular para liberar compras e vendas.",
    });
  } catch {
    return unavailable();
  }
}
