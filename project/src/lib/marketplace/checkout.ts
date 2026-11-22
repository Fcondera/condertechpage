import { marketProducts } from "@/data/marketplace";
import type { marketClient } from "./server";

export type CheckoutItem = { id: string; name: string; quantity: number; seller_id: string | null; price_cents: number | null };
export const paymentPreferences = ["a_combinar", "pix", "cartao", "boleto"] as const;

// Both review and submission resolve prices and availability on the server.
export async function resolveCheckoutItems(client: ReturnType<typeof marketClient>, value: unknown): Promise<CheckoutItem[]> {
  if (!Array.isArray(value) || !value.length || value.length > 50) throw new Error("Revise os produtos do carrinho.");
  const items: CheckoutItem[] = [];
  const seen = new Set<string>();
  for (const row of value) {
    if (!row || typeof row.id !== "string" || seen.has(row.id) || !Number.isInteger(row.quantity) || row.quantity < 1 || row.quantity > 999) throw new Error("Produto ou quantidade inválida.");
    seen.add(row.id);
    const product = marketProducts.find(product => product.id === row.id);
    if (product) {
      items.push({ id: product.id, name: product.name, quantity: row.quantity, seller_id: null, price_cents: null });
      continue;
    }
    const { data, error } = await client.from("marketplace_listings").select("id, title, seller_id, price_cents, stock").eq("id", row.id).eq("status", "aprovado").maybeSingle();
    if (error) throw new Error("Não foi possível consultar os produtos. Tente novamente.");
    if (!data || data.stock < row.quantity) throw new Error("Um produto está indisponível na quantidade selecionada. Revise o carrinho.");
    items.push({ id: data.id, name: data.title, quantity: row.quantity, seller_id: data.seller_id, price_cents: data.price_cents });
  }
  return items;
}

export const checkoutSubtotal = (items: CheckoutItem[]) => items.reduce((sum, item) => sum + (item.price_cents ?? 0) * item.quantity, 0);
