import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { salesLink } from "@/data/products";

interface Props {
  name: string;
  category: string;
  description: string;
  backHref: string;
  backLabel: string;
  heading: string;
  items: readonly string[];
  note: string;
  physical?: boolean;
}

export default function ProductPresentation({ name, category, description, backHref, backLabel, heading, items, note, physical = false }: Props) {
  return (
    <main className="mx-auto min-h-[65vh] max-w-5xl px-6 pb-20 pt-28 text-gray-950 sm:px-8">
      <Link href={backHref} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-950">
        <ArrowLeft size={16} aria-hidden="true" />{backLabel}
      </Link>
      <div className="mt-10 grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_280px] md:gap-16">
        <div>
          <p className="text-sm text-gray-500">{category}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{name}</h1>
          <p className="mt-5 max-w-xl leading-7 text-gray-600">{description}</p>
          <section className="mt-10 border-t border-gray-200 pt-7" aria-labelledby="details-title">
            <h2 id="details-title" className="text-lg font-semibold">{heading}</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-600">
              {items.map(item => <li key={item} className="flex gap-3"><span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gray-400" />{item}</li>)}
            </ul>
          </section>
        </div>
        <aside className="rounded-2xl bg-gray-50 p-6">
          <h2 className="font-semibold">{physical ? "Preço sob consulta" : "Conheça na prática"}</h2>
          <p className="mt-3 text-sm leading-6 text-gray-500">{note}</p>
          <a href={salesLink(physical ? `Olá! Gostaria de um orçamento para ${name}. Podem informar modelos, valores, disponibilidade e entrega?` : `Olá! Quero conhecer o ${name} e solicitar uma demonstração.`)} target="_blank" rel="noopener noreferrer"
            className="mt-6 flex items-center justify-between gap-2 rounded-lg bg-[#e22d2e] px-4 py-3 text-sm font-medium text-white hover:bg-[#b52324]">
            {physical ? "Solicitar orçamento" : "Solicitar demonstração"}<ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <p className="mt-3 text-xs text-gray-500">Atendimento pelo WhatsApp</p>
        </aside>
      </div>
    </main>
  );
}
