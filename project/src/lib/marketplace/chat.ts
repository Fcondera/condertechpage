export type ChatThread = { id: string; quote_id: string; buyer_id: string; seller_key: string; subject: string };
export type ChatMessage = { id: number; body: string; sender_side: "buyer" | "seller"; created_at: string; read_at: string | null };
export const isUuid = (value: unknown): value is string => typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
export function chatSide(thread: ChatThread, user: { id: string; app_metadata?: Record<string, unknown> }): "buyer" | "seller" | null {
  if (thread.buyer_id === user.id) return "buyer";
  if (thread.seller_key === user.id || (thread.seller_key === "condertech" && user.app_metadata?.marketplace_role === "admin")) return "seller";
  return null;
}
export function validMessage(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= 2000;
}
