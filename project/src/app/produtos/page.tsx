import type { Metadata } from "next";
import Link from "next/link";
import CatalogNav from "@/components/CatalogNav";
import ProductCardImage from "@/components/ProductCardImage";
import { systems } from "@/data/products";

export const metadata: Metadata = {
  title: "Produtos | Nori Sistemas, Ponto e Agendamento | ConderTech",
  description: "Nori Sistemas para gestão e PDV, Sistema de Ponto SaaS e Sistema de Agendamento. Conheça os produtos ConderTech.",
  alternates: { canonical: "https://www.condertech.com.br/produtos" },
};

export default function ProductsPage() {
  return (
    <main className="mx-auto min-h-[65vh] max-w-6xl px-6 pb-20 pt-28 text-gray-950 sm:px-8">
      <CatalogNav active="systems" />
      <h1 className="text-3xl font-semibold tracking-tight">Sistemas</h1>
      <p className="mt-3 text-gray-500">Gestão, ponto e agendamento para sua empresa.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {systems.map((system) => {
          return (
            <Link key={system.id} href={`/produtos/${system.id}`} className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600">
              <ProductCardImage id={system.id} />
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-xl font-semibold">{system.name}</h2>
                <p className="mb-7 mt-3 text-sm leading-6 text-gray-500">{system.summary}</p>
                <span className="mt-auto flex min-h-14 items-center justify-center rounded-xl border border-[#bd2025] bg-[#cf252b] px-5 py-4 text-center text-base font-bold text-white shadow-[0_6px_16px_-5px_rgba(207,37,43,0.5)] transition-all duration-200 group-hover:bg-[#b51d23] group-hover:shadow-[0_8px_20px_-5px_rgba(207,37,43,0.6)] motion-safe:group-hover:-translate-y-0.5">Conhecer produto</span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
