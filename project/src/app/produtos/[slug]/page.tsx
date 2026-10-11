import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPresentation from "@/components/ProductPresentation";
import { systems } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return systems.map(product => ({ slug: product.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = systems.find(item => item.id === slug);
  if (!product) notFound();
  return {
    title: `${product.name} | ConderTech`,
    description: product.summary,
    alternates: { canonical: `https://www.condertech.com.br/produtos/${product.id}` },
  };
}

export default async function SystemPage({ params }: Props) {
  const { slug } = await params;
  const product = systems.find(item => item.id === slug);
  if (!product) notFound();
  return <ProductPresentation name={product.name} category={product.category}
    description={product.description} backHref="/produtos" backLabel="Todos os sistemas"
    heading="O que você pode organizar" items={product.features}
    note="Converse com nossa equipe para conhecer os recursos, planos e integrações disponíveis." />;
}
