import type { Metadata } from "next";
import Marketplace from "@/components/Marketplace";

export const metadata: Metadata = {
  title: "Marketplace | PDV, Relógio de Ponto e Cartão NFC | ConderTech",
  description: "Explore equipamentos para o seu negócio no marketplace ConderTech. Selecione terminais PDV, relógios de ponto e cartões NFC e solicite um orçamento.",
  alternates: { canonical: "https://www.condertech.com.br/marketplace" },
};

export default function MarketplacePage() {
  return <Marketplace />;
}
