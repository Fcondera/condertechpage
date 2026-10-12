import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MarketDetail from "@/components/marketplace/MarketDetail";
import { marketProducts } from "@/data/marketplace";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return marketProducts.map(product => ({ slug: product.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = marketProducts.find(item => item.id === slug);
  if (!product) notFound();
  return {
    title: `${product.name} | Marketplace ConderTech`,
    description: product.description,
    alternates: { canonical: `https://www.condertech.com.br/marketplace/${product.id}` },
  };
}

export default async function EquipmentPage({ params }: Props) {
  const { slug } = await params;
  const product = marketProducts.find(item => item.id === slug);
  if (!product) notFound();
  return <MarketDetail product={product} />;
}
