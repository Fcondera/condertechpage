import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { marketClient, saveSession } from "@/lib/marketplace/server";
import { oauthClient, oauthCookieOptions } from "@/lib/marketplace/oauth";
import { safeNext } from "@/lib/marketplace/validation";

function destination(request: Request, path: string) {
  const origin =
    process.env.MARKETPLACE_SITE_URL || new URL(request.url).origin;
  return new URL(path, origin);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const jar = await cookies();
  const next = safeNext(jar.get("ct-market-next")?.value);
  try {
    const code = url.searchParams.get("code");
    if (!code || url.searchParams.has("error"))
      throw new Error("GOOGLE_CALLBACK_FAILED");
    const client = await oauthClient();
    const { data, error } = await client.auth.exchangeCodeForSession(code);
    if (
      error ||
      !data.session ||
      !data.user?.identities?.some(
        (identity) => identity.provider === "google",
      ) ||
      !data.user.email_confirmed_at
    )
      throw error || new Error("GOOGLE_IDENTITY_REQUIRED");

    // Confirm the Google identity against Supabase before issuing our HttpOnly app session.
    const admin = marketClient();
    const { data: verified, error: verifyError } = await admin.auth.getUser(
      data.session.access_token,
    );
    if (
      verifyError ||
      !verified.user?.identities?.some(
        (identity) => identity.provider === "google",
      )
    )
      throw new Error("GOOGLE_IDENTITY_REQUIRED");

    await saveSession(data.session);
    const response = NextResponse.redirect(destination(request, next));
    response.cookies.set("ct-market-next", "", {
      ...oauthCookieOptions,
      path: "/api/marketplace/auth/callback",
      maxAge: 0,
    });
    response.cookies.set("ct-market-oauth-code-verifier", "", {
      ...oauthCookieOptions,
      maxAge: 0,
    });
    response.cookies.set("ct-market-oauth-auth-token", "", {
      ...oauthCookieOptions,
      maxAge: 0,
    });
    return response;
  } catch {
    const response = NextResponse.redirect(
      destination(request, "/marketplace/entrar?erro=google"),
    );
    response.cookies.set("ct-market-next", "", {
      ...oauthCookieOptions,
      path: "/api/marketplace/auth/callback",
      maxAge: 0,
    });
    response.cookies.set("ct-market-oauth-code-verifier", "", {
      ...oauthCookieOptions,
      maxAge: 0,
    });
    response.cookies.set("ct-market-oauth-auth-token", "", {
      ...oauthCookieOptions,
      maxAge: 0,
    });
    return response;
  }
}
