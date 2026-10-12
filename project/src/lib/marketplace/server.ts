import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient, type Session, type User } from "@supabase/supabase-js";
import type { PrivateProfile } from "./validation";
import { digits } from "./validation";

// A fresh instance for every request prevents sessions from leaking between users.
export function marketClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("MARKET_NOT_CONFIGURED");
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

const accessCookie = "ct-market-access";
const refreshCookie = "ct-market-refresh";
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/api/marketplace",
};

export async function saveSession(session: Session) {
  const jar = await cookies();
  jar.set(accessCookie, session.access_token, {
    ...cookieOptions,
    maxAge: session.expires_in,
  });
  jar.set(refreshCookie, session.refresh_token, {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSession() {
  const jar = await cookies();
  jar.set(accessCookie, "", { ...cookieOptions, maxAge: 0 });
  jar.set(refreshCookie, "", { ...cookieOptions, maxAge: 0 });
}

export async function authenticatedMarket() {
  const client = marketClient();
  const jar = await cookies();
  const access = jar.get(accessCookie)?.value;
  const refresh = jar.get(refreshCookie)?.value;
  if (access) {
    const {
      data: { user },
    } = await client.auth.getUser(access);
    if (
      user &&
      user.identities?.some((identity) => identity.provider === "google")
    )
      return { client, user, access, refresh };
  }
  if (refresh) {
    const { data, error } = await client.auth.refreshSession({
      refresh_token: refresh,
    });
    if (
      !error &&
      data.session &&
      data.user?.identities?.some((identity) => identity.provider === "google")
    ) {
      await saveSession(data.session);
      return {
        client: marketClient(),
        user: data.user,
        access: data.session.access_token,
        refresh: data.session.refresh_token,
      };
    }
  }
  return null;
}

export async function getProfile(
  userId: string,
  client = marketClient(),
): Promise<PrivateProfile | null> {
  const { data, error } = await client
    .from("marketplace_profiles")
    .select(
      "name, phone, cpf, cep, street, number, complement, neighborhood, city, state, company, terms_accepted_at, phone_verified_at",
    )
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error("PROFILE_UNAVAILABLE");
  return data;
}

export async function publicUser(user: User) {
  const metadata = user.user_metadata || {};
  const profile = await getProfile(user.id);
  return {
    id: user.id,
    email: user.email || "",
    name: profile?.name || String(metadata.full_name || metadata.name || ""),
    phone: profile?.phone || "",
    company: profile?.company || "",
    isAdmin: user.app_metadata?.marketplace_role === "admin",
    emailVerified: Boolean(user.email_confirmed_at),
    profileComplete: Boolean(profile?.terms_accepted_at),
    phoneVerified: Boolean(
      profile?.phone_verified_at &&
      user.phone_confirmed_at &&
      digits(user.phone || "") === `55${digits(profile.phone)}`,
    ),
  };
}

export async function requireVerifiedProfile(user: User) {
  const profile = await publicUser(user);
  return (
    profile.profileComplete && profile.phoneVerified && profile.emailVerified
  );
}

export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const parsed = new URL(origin);
    // Next can normalize request.url to localhost behind a proxy or local bind.
    // Host is the authority addressed by the browser; do not trust forwarded-host.
    const host = request.headers.get("host") || new URL(request.url).host;
    return (
      ["http:", "https:"].includes(parsed.protocol) &&
      parsed.origin === origin &&
      parsed.host === host
    );
  } catch {
    return false;
  }
}

export function authRedirectOrigin(request: Request) {
  return (
    process.env.MARKETPLACE_SITE_URL ||
    request.headers.get("origin") ||
    new URL(request.url).origin
  );
}

export function json(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export function unavailable() {
  return json(
    {
      error:
        "O serviço está temporariamente indisponível. Tente novamente em instantes.",
    },
    503,
  );
}
