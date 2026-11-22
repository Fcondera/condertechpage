import { equipment, systems } from "@/data/products";

export const infrastructure = [
  { id: "switch-gerenciavel", name: "Switch gerenciável", category: "Redes", description: "Distribuição de rede para empresas, com configuração de portas, VLANs e capacidade definidas no orçamento.", features: ["Dimensionamento de portas e uplinks", "Opções com PoE para dispositivos compatíveis", "Configuração conforme o projeto"] },
  { id: "access-point", name: "Access Point corporativo", category: "Redes", description: "Wi-Fi para escritórios, lojas e ambientes corporativos. Cobertura e capacidade dimensionadas para o local.", features: ["Planejamento de cobertura", "Rede de visitantes conforme o modelo", "Instalação sob orçamento"] },
  { id: "rack-infraestrutura", name: "Rack e cabeamento estruturado", category: "Infraestrutura", description: "Organização da infraestrutura de rede com rack, patch panels e cabeamento conforme as necessidades da empresa.", features: ["Definição de altura e acessórios", "Organização e identificação de cabos", "Projeto e instalação sob orçamento"] },
  { id: "nobreak", name: "Nobreak para infraestrutura", category: "Energia", description: "Proteção e continuidade de energia para equipamentos. Potência e autonomia devem ser dimensionadas conforme a carga.", features: ["Dimensionamento de potência", "Autonomia conforme configuração", "Compatibilidade avaliada no atendimento"] },
].map(product => ({ ...product, kind: "equipment" as const, label: "Infraestrutura", summary: product.description }));

export function marketProductImage(id: string) {
  return infrastructure.some(product => product.id === id) ? `/image/products/${id}.svg` : `/image/products/${id}.png`;
}

export const marketProducts = [
  ...infrastructure,
  ...equipment.map(product => ({ ...product, kind: "equipment" as const, label: "Equipamento", summary: product.description })),
  ...systems.map(product => ({ ...product, kind: "software" as const, label: "Software" })),
];

export type MarketProduct = (typeof marketProducts)[number];
export const marketCategories = [
  { id: "Todos", name: "Todos os produtos", image: "pdv" },
  { id: "PDV", name: "PDV e automação", image: "pdv" },
  { id: "Ponto", name: "Controle de ponto", image: "relogio-de-ponto" },
  { id: "NFC", name: "Cartões NFC", image: "cartao-nfc" },
  { id: "Redes", name: "Redes e Wi-Fi", image: "access-point" },
  { id: "Infraestrutura", name: "Racks e cabeamento", image: "rack-infraestrutura" },
  { id: "Energia", name: "Energia e proteção", image: "nobreak" },
  { id: "Software", name: "Sistemas e SaaS", image: "nori-sistemas" },
] as const;

export function matchesCategory(product: MarketProduct, category: string) {
  if (category === "Todos") return true;
  if (category === "Software") return product.kind === "software";
  if (category === "Ponto") return product.id.includes("ponto");
  if (category === "PDV") return product.id === "pdv" || product.id === "nori-sistemas";
  return product.category === category;
}

export type MarketUser = { id: string; email: string; name: string; phone: string; company: string; isAdmin: boolean; emailVerified: boolean; profileComplete: boolean; phoneVerified: boolean };
export type CatalogPrice = { product_id: string; price_cents: number | null; billing: "once" | "monthly" | "yearly"; active: boolean };
export const billingLabel = (billing?: string) => billing === "monthly" ? "/mês" : billing === "yearly" ? "/ano" : "";
export type QuoteItem = { id: string; name: string; quantity: number };
export type MarketQuote = { id: string; created_at: string; status: "solicitado" | "em_atendimento" | "respondido" | "cancelado"; items: QuoteItem[]; notes: string; checkout?: { address: { street: string; number: string; city: string; state: string; cep: string }; payment_preference: string } | null };

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
