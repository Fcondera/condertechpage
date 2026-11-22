import type { SupabaseClient, User } from "@supabase/supabase-js";

const ownerEmail = "condertechsuporte@gmail.com";

export function isCondertechOwner(user: User): boolean {
  return user.email?.toLowerCase() === ownerEmail &&
    Boolean(user.email_confirmed_at) && user.app_metadata?.marketplace_role === "admin";
}

export async function ensureMarketplaceAdmin(user: User, client: SupabaseClient): Promise<User> {
  const verifiedOwner = user.email?.toLowerCase() === ownerEmail &&
    Boolean(user.email_confirmed_at) &&
    user.identities?.some(identity => identity.provider === "google" &&
      identity.identity_data?.email?.toLowerCase() === ownerEmail);
  if (!verifiedOwner || user.app_metadata?.marketplace_role === "admin") return user;

  const { data, error } = await client.auth.admin.updateUserById(user.id, {
    app_metadata: { ...user.app_metadata, marketplace_role: "admin" },
  });
  if (error || !data.user) throw new Error("ADMIN_CONFIGURATION_FAILED");
  return data.user;
}
