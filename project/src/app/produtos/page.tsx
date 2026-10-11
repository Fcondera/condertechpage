import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Monitor } from "lucide-react";
import CatalogNav from "@/components/CatalogNav";
import { systems } from "@/data/products";

export const metadata: Metadata = {
  title: "Produtos | Nori Sistemas, Ponto e Agendamento | ConderTech",
  description: "Nori Sistemas para gestão e PDV, Sistema de Ponto SaaS e Sistema de Agendamento. Conheça os produtos ConderTech.",
  alternates: { canonical: "https://www.condertech.com.br/produtos" },
};

const icons = [Monitor, Clock3, CalendarDays];

export default function ProductsPage() {
  return (
    <main className="mx-auto min-h-[65vh] max-w-6xl px-6 pb-20 pt-28 text-gray-950 sm:px-8">
      <CatalogNav active="systems" />
      <h1 className="text-3xl font-semibold tracking-tight">Sistemas</h1>
      <p className="mt-3 text-gray-500">Gestão, ponto e agendamento para sua empresa.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {systems.map((system, index) => {
          const Icon = icons[index];
          return (
            <Link key={system.id} href={`/produtos/${system.id}`} className="group flex flex-col rounded-2xl border border-gray-200 p-6 transition-colors hover:border-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600">
              <Icon size={26} strokeWidth={1.5} className="mb-8 text-gray-500" aria-hidden="true" />
              <h2 className="text-xl font-semibold">{system.name}</h2>
              <p className="mb-8 mt-3 text-sm leading-6 text-gray-500">{system.summary}</p>
              <span className="mt-auto flex items-center justify-between text-sm font-medium">Conhecer produto <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
