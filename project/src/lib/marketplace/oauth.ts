import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export const oauthCookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/api/marketplace/auth", maxAge: 600 };

export async function oauthClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("GOOGLE_NOT_CONFIGURED");
  const jar = await cookies();
  return createClient(url, key, { auth: {
    flowType: "pkce", persistSession: false, autoRefreshToken: false, detectSessionInUrl: false,
    storageKey: "ct-market-oauth",
    storage: {
      getItem: key => jar.get(key)?.value || null,
      setItem: (key, value) => { jar.set(key, value, oauthCookieOptions); },
      removeItem: key => { jar.set(key, "", { ...oauthCookieOptions, maxAge: 0 }); },
    },
  } });
}
