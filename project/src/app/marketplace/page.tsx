import type { Metadata } from "next";
import Marketplace from "@/components/Marketplace";

export const metadata: Metadata = {
  title: "Marketplace | Equipamentos, Sistemas e Vendedores | ConderTech",
  description: "Encontre equipamentos e sistemas da ConderTech e de vendedores parceiros. Explore produtos, crie sua conta ou anuncie sua loja.",
  alternates: { canonical: "https://www.condertech.com.br/marketplace" },
};

export default function MarketplacePage() {
  return <Marketplace />;
}
