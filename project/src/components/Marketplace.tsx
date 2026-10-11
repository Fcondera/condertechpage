"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock3, CreditCard, Minus, Monitor, Plus, Search, ShoppingBag, Trash2 } from "lucide-react";
import { equipment, salesLink } from "@/data/products";

const icons = { monitor: Monitor, clock: Clock3, card: CreditCard };
const categories = ["Todos", "PDV", "Ponto", "NFC"];

export default function Marketplace() {
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const products = equipment.filter(product => (category === "Todos" || product.category === category) && normalize(`${product.name} ${product.description}`).includes(normalize(search.trim())));
  const selected = equipment.filter(product => cart[product.id] > 0);
  const count = selected.reduce((total, product) => total + cart[product.id], 0);
  function changeQuantity(id: string, amount: number) {
    setCart(current => ({ ...current, [id]: Math.max(0, Math.min(999, (current[id] || 0) + amount)) }));
  }
  const quote = salesLink(`Olá! Gostaria de solicitar um orçamento no marketplace ConderTech:\n${selected.map(product => `• ${product.name}: ${cart[product.id]} unidade(s)`).join("\n")}\nPodem informar modelos, valores, disponibilidade e entrega?`);

  return <main className="bg-[#fafafa] text-[#252525]">
    <section className="bg-[#101213] pb-16 pt-36 text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">Marketplace / ConderTech</p>
        <div className="mt-6 flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><h1 className="max-w-3xl text-4xl font-medium leading-tight sm:text-6xl">Equipe seu negócio.<br /><span className="text-red-400">Conecte possibilidades.</span></h1><p className="mt-6 max-w-xl leading-8 text-white/65">PDV, ponto e tecnologia NFC. Encontre os equipamentos para o próximo passo da sua operação.</p></div><a href="#orcamento" className="inline-flex shrink-0 items-center gap-3 self-start rounded-full border border-white/25 px-6 py-4 text-sm hover:bg-white/10 md:self-auto"><ShoppingBag size={18} />Minha seleção <span className="rounded-full bg-[#e22d2e] px-2.5 py-1" aria-live="polite">{count}</span></a></div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12" aria-labelledby="catalog-title">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center"><div><p className="text-xs font-semibold uppercase tracking-widest text-[#e22d2e]">Produtos físicos</p><h2 id="catalog-title" className="mt-3 text-3xl font-medium">Encontre o que você precisa.</h2></div><label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3"><Search size={18} className="shrink-0 text-gray-400" /><span className="sr-only">Buscar equipamentos</span><input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Buscar equipamentos" className="min-w-0 w-full bg-transparent text-sm outline-none focus-visible:ring-2 focus-visible:ring-red-400" /></label></div>
      <div className="my-8 flex flex-wrap gap-2" aria-label="Categorias de equipamentos">{categories.map(item => <button type="button" key={item} onClick={() => setCategory(item)} aria-pressed={category === item} className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${category === item ? "border-[#101213] bg-[#101213] text-white" : "border-gray-200 bg-white hover:border-gray-400"}`}>{item}</button>)}</div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{products.map(product => { const Icon = icons[product.icon]; return <article key={product.id} className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
        <div className="relative flex h-56 items-center justify-center bg-[#eceeed]"><span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1.5 text-xs font-medium">{product.category}</span><div className="rounded-3xl border border-white bg-white/60 p-8 shadow-sm"><Icon size={76} strokeWidth={1.25} className="text-[#383e42]" aria-hidden="true" /></div><span className="absolute bottom-4 right-5 text-[10px] uppercase tracking-widest text-gray-500">Representação ilustrativa</span></div>
        <div className="p-6"><h3 className="text-2xl font-semibold">{product.name}</h3><p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-600">{product.description}</p><p className="mt-3 text-xs leading-5 text-gray-500">{product.detail}</p><div className="my-5 border-t border-gray-100 pt-5"><p className="font-semibold">Preço sob consulta</p><p className="mt-1 text-xs text-gray-500">Modelo, disponibilidade e frete a confirmar.</p></div><button type="button" onClick={() => changeQuantity(product.id, 1)} disabled={cart[product.id] >= 999} className="flex w-full items-center justify-between rounded-xl bg-[#e22d2e] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#b52324] disabled:opacity-50" aria-label={`Adicionar ${product.name} ao orçamento`}>Adicionar ao orçamento <Plus size={18} /></button></div>
      </article>; })}</div>
      {products.length === 0 && <div className="rounded-2xl border border-dashed border-gray-300 p-12 text-center"><p>Nenhum equipamento encontrado.</p><button onClick={() => { setSearch(""); setCategory("Todos"); }} className="mt-4 font-semibold text-[#e22d2e] underline">Limpar filtros</button></div>}
    </section>
    <section id="orcamento" className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-16 sm:px-8 lg:px-12">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-10"><div className="flex items-center gap-3"><ShoppingBag className="text-[#e22d2e]" /><h2 className="text-2xl font-semibold">Seu orçamento</h2></div><p className="mt-3 text-sm leading-6 text-gray-600">Selecione os equipamentos e as quantidades. Nossa equipe confirma as opções, os valores e as condições de entrega pelo WhatsApp.</p>
        <div aria-live="polite" className="sr-only">{count} unidades selecionadas para orçamento.</div>
        {selected.length === 0 ? <p className="mt-6 rounded-xl bg-gray-50 p-6 text-sm text-gray-500">Sua seleção está vazia. Adicione produtos do catálogo para começar.</p> : <><ul className="mt-6 divide-y divide-gray-100">{selected.map(product => <li key={product.id} className="flex flex-wrap items-center justify-between gap-4 py-5"><span className="font-medium">{product.name}</span><div className="flex items-center gap-3"><button onClick={() => changeQuantity(product.id, -1)} className="rounded-lg border p-2 hover:bg-gray-100" aria-label={`Diminuir quantidade de ${product.name}`}><Minus size={16} /></button><span className="min-w-6 text-center" aria-label={`Quantidade de ${product.name}`}>{cart[product.id]}</span><button onClick={() => changeQuantity(product.id, 1)} disabled={cart[product.id] >= 999} className="rounded-lg border p-2 hover:bg-gray-100 disabled:opacity-40" aria-label={`Aumentar quantidade de ${product.name}`}><Plus size={16} /></button><button onClick={() => setCart(current => ({ ...current, [product.id]: 0 }))} className="ml-2 rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600" aria-label={`Remover ${product.name}`}><Trash2 size={18} /></button></div></li>)}</ul><a href={quote} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#e22d2e] px-6 py-4 text-sm font-semibold text-white hover:bg-[#b52324]">Solicitar orçamento pelo WhatsApp <ArrowUpRight size={18} /></a><p className="mt-4 text-xs text-gray-500">O envio da seleção é uma solicitação de orçamento. A compra será combinada com nossa equipe.</p></>}
      </div>
      <div className="mt-8 flex flex-col justify-between gap-4 rounded-2xl bg-[#eceeed] p-7 sm:flex-row sm:items-center"><div><h2 className="text-lg font-semibold">O sistema também faz parte da solução.</h2><p className="mt-2 text-sm text-gray-600">Conheça Nori Sistemas, Sistema de Ponto e Sistema de Agendamento.</p></div><Link href="/produtos" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#b52324]">Conhecer sistemas <ArrowRight size={18} /></Link></div>
    </section>
  </main>;
}
