import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPresentation from "@/components/ProductPresentation";
import { equipment } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

const details: Record<string, readonly string[]> = {
  pdv: ["Indicado para o atendimento no caixa de lojas e comércios.", "A configuração deve considerar o sistema de vendas e os periféricos utilizados.", "Informe sua operação para consultar os modelos adequados."],
  "relogio-de-ponto": ["Indicado para empresas que precisam de um equipamento de registro de jornada.", "O modelo e a forma de identificação são definidos conforme a necessidade da equipe.", "Confirme a compatibilidade com seu sistema de ponto antes da compra."],
  "cartao-nfc": ["Para projetos de identificação e interação por aproximação.", "O tipo de cartão depende do leitor ou dispositivo que será utilizado.", "Informe a quantidade e a necessidade de personalização ao solicitar orçamento."],
};

export function generateStaticParams() {
  return equipment.map(product => ({ slug: product.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = equipment.find(item => item.id === slug);
  if (!product) notFound();
  return {
    title: `${product.name} | Marketplace ConderTech`,
    description: product.description,
    alternates: { canonical: `https://www.condertech.com.br/marketplace/${product.id}` },
  };
}

export default async function EquipmentPage({ params }: Props) {
  const { slug } = await params;
  const product = equipment.find(item => item.id === slug);
  if (!product) notFound();
  return <ProductPresentation name={product.name} category={product.category}
    description={product.description} backHref="/marketplace" backLabel="Todos os equipamentos"
    heading="Sobre o equipamento" items={details[product.id]} physical
    note="Consulte modelos, disponibilidade e frete para sua região." />;
}
