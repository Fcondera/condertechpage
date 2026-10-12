import { equipment, systems } from "@/data/products";

export const marketProducts = [
  ...equipment.map(product => ({ ...product, kind: "equipment" as const, label: "Equipamento", summary: product.description })),
  ...systems.map(product => ({ ...product, kind: "software" as const, label: "Software" })),
];

export type MarketProduct = (typeof marketProducts)[number];
export const marketCategories = [
  { id: "Todos", name: "Todos os produtos", image: "pdv" },
  { id: "PDV", name: "PDV e automação", image: "pdv" },
  { id: "Ponto", name: "Controle de ponto", image: "relogio-de-ponto" },
  { id: "NFC", name: "Cartões NFC", image: "cartao-nfc" },
  { id: "Software", name: "Sistemas e SaaS", image: "nori-sistemas" },
] as const;

export function matchesCategory(product: MarketProduct, category: string) {
  if (category === "Todos") return true;
  if (category === "Software") return product.kind === "software";
  if (category === "Ponto") return product.id.includes("ponto");
  if (category === "PDV") return product.id === "pdv" || product.id === "nori-sistemas";
  return product.category === category;
}

export type MarketUser = { id: string; email: string; name: string; phone: string; company: string };
export type QuoteItem = { id: string; name: string; quantity: number };
export type MarketQuote = { id: string; created_at: string; status: "solicitado" | "em_atendimento" | "respondido" | "cancelado"; items: QuoteItem[]; notes: string };

export function validateQuoteItems(value: unknown): QuoteItem[] | null {
  if (!Array.isArray(value) || value.length < 1 || value.length > marketProducts.length) return null;
  const result: QuoteItem[] = [];
  const seen = new Set<string>();
  for (const row of value) {
    if (!row || typeof row !== "object") return null;
    const product = marketProducts.find(item => item.id === row.id);
    if (!product || seen.has(product.id) || !Number.isInteger(row.quantity) || row.quantity < 1 || row.quantity > 999) return null;
    seen.add(product.id);
    result.push({ id: product.id, name: product.name, quantity: row.quantity });
  }
  return result;
}
