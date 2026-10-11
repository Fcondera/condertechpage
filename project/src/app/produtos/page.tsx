import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Check, Clock3, Monitor, ShoppingBag } from "lucide-react";
import { salesLink, systems } from "@/data/products";

export const metadata: Metadata = {
  title: "Produtos | Nori Sistemas, Ponto e Agendamento | ConderTech",
  description: "Conheça o portfólio ConderTech: Nori Sistemas para gestão e PDV, Sistema de Ponto SaaS e Sistema de Agendamento.",
  alternates: { canonical: "https://www.condertech.com.br/produtos" },
};

const icons = [Monitor, Clock3, CalendarDays];

export default function ProductsPage() {
  return (
    <main className="bg-[#fafafa] text-[#252525]">
      <section className="relative overflow-hidden bg-[#101213] pb-20 pt-36 text-white sm:pb-28">
        <div aria-hidden="true" className="absolute -right-32 top-24 h-96 w-96 rounded-full border-[60px] border-[#e22d2e]/10" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">Portfólio de produtos / ConderTech</p>
          <h1 className="mt-6 max-w-4xl text-4xl font-medium leading-tight sm:text-6xl lg:text-7xl">Seu negócio tem o próximo passo.<br /><span className="text-red-400">Nós temos o sistema.</span></h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65">Gestão, ponto e agendamento. Conheça os produtos ConderTech para organizar a operação e abrir espaço para o seu negócio crescer.</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#sistemas" className="inline-flex items-center gap-3 rounded-full bg-[#e22d2e] px-7 py-4 text-sm font-semibold hover:bg-[#b52324]">Explorar sistemas <ArrowRight size={18} /></a>
            <Link href="/marketplace" className="inline-flex items-center gap-3 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold hover:bg-white/10">Comprar equipamentos <ArrowUpRight size={18} /></Link>
          </div>
          <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6 text-sm text-white/60"><span>01 / Gestão e PDV</span><span>02 / Ponto SaaS</span><span>03 / Agendamento</span></div>
        </div>
      </section>
      <section id="sistemas" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 sm:px-8 lg:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e22d2e]">Nossos sistemas</p>
        <h2 className="mt-4 text-3xl font-medium sm:text-4xl">Tecnologia que faz parte da rotina.</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {systems.map((system, index) => {
            const Icon = icons[index];
            return <article id={system.id} key={system.id} className="flex scroll-mt-24 flex-col rounded-3xl border border-gray-200 bg-white p-7 sm:p-8">
              <div className="flex items-center justify-between"><span className="rounded-2xl bg-red-50 p-4 text-[#e22d2e]"><Icon size={28} /></span><span className="text-sm text-gray-400">/ {system.number}</span></div>
              <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-[#e22d2e]">{system.category}</p>
              <h3 className="mt-3 text-3xl font-semibold">{system.name}</h3>
              <p className="mt-4 text-sm leading-7 text-gray-600">{system.description}</p>
              <ul className="my-7 space-y-3">{system.features.map(feature => <li key={feature} className="flex gap-3 text-sm"><Check size={18} className="shrink-0 text-[#e22d2e]" />{feature}</li>)}</ul>
              <div className="mt-auto border-t border-gray-100 pt-6"><p className="mb-5 text-xs text-gray-500">{system.audience}</p><a href={salesLink(`Olá! Quero conhecer o ${system.name} da ConderTech e solicitar uma apresentação.`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl bg-[#101213] px-5 py-4 text-sm font-semibold text-white hover:bg-[#e22d2e]" aria-label={`Solicitar apresentação do ${system.name}`}>Solicitar apresentação <ArrowUpRight size={18} /></a></div>
            </article>;
          })}
        </div>
        <p className="mt-6 text-sm text-gray-500">Converse com nossa equipe para conhecer os recursos disponíveis, planos e possibilidades de integração de cada sistema.</p>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-8 rounded-3xl bg-[#eceeed] p-8 sm:p-12 md:flex-row md:items-center"><div className="max-w-xl"><ShoppingBag className="mb-6 text-[#e22d2e]" size={30} /><p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Marketplace ConderTech</p><h2 className="mt-3 text-3xl font-medium">Do sistema ao equipamento.</h2><p className="mt-4 leading-7 text-gray-600">Complete sua operação com terminais PDV, relógios de ponto e cartões NFC. Explore nossa vitrine de produtos físicos.</p></div><Link href="/marketplace" className="inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-[#e22d2e] px-7 py-4 text-sm font-semibold text-white hover:bg-[#b52324] md:self-auto">Visitar marketplace <ArrowRight size={18} /></Link></div>
      </section>
    </main>
  );
}
