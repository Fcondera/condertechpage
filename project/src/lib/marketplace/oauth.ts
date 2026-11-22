import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export const oauthCookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/api/marketplace/auth", maxAge: 600 };

export async function oauthClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("GOOGLE_NOT_CONFIGURED");
  const jar = await cookies();
  return createClient(url, key, { auth: {
    flowType: "pkce", persistSession: true, autoRefreshToken: false, detectSessionInUrl: false,
    storageKey: "ct-market-oauth",
    storage: {
      getItem: key => key === "ct-market-oauth-code-verifier" ? jar.get(key)?.value || null : null,
      setItem: (key, value) => { if (key === "ct-market-oauth-code-verifier") jar.set(key, value, oauthCookieOptions); },
      removeItem: key => { if (key === "ct-market-oauth-code-verifier") jar.set(key, "", { ...oauthCookieOptions, maxAge: 0 }); },
    },
  } });
}
