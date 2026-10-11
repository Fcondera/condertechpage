"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Minus, Plus, Search, Trash2 } from "lucide-react";
import CatalogNav from "@/components/CatalogNav";
import ProductCardImage from "@/components/ProductCardImage";
import { equipment, salesLink } from "@/data/products";

const categories = ["Todos", "PDV", "Ponto", "NFC"];
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function Marketplace() {
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartLoaded, setCartLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(sessionStorage.getItem("condertech-quote") || "{}");
      if (saved && typeof saved === "object") {
        const valid: Record<string, number> = {};
        for (const product of equipment) {
          const quantity = (saved as Record<string, unknown>)[product.id];
          if (typeof quantity === "number" && Number.isInteger(quantity) && quantity > 0) {
            valid[product.id] = Math.min(999, quantity);
          }
        }
        setCart(valid);
      }
    } catch {
      // The catalog also works when browser storage is unavailable.
    }
    setCartLoaded(true);
  }, []);

  useEffect(() => {
    if (!cartLoaded) return;
    try {
      sessionStorage.setItem("condertech-quote", JSON.stringify(cart));
    } catch {
      // Keep the current selection in memory if storage is unavailable.
    }
  }, [cart, cartLoaded]);
  const products = equipment.filter(product =>
    (category === "Todos" || product.category === category) &&
    normalize(`${product.name} ${product.description}`).includes(normalize(search.trim()))
  );
  const selected = equipment.filter(product => cart[product.id] > 0);
  const count = selected.reduce((total, product) => total + cart[product.id], 0);

  function changeQuantity(id: string, amount: number) {
    setCart(current => ({ ...current, [id]: Math.max(0, Math.min(999, (current[id] || 0) + amount)) }));
  }

  const quote = salesLink(`Olá! Gostaria de solicitar um orçamento no marketplace ConderTech:\n${selected.map(product => `• ${product.name}: ${cart[product.id]} unidade(s)`).join("\n")}\nPodem informar modelos, valores, disponibilidade e entrega?`);

  return (
    <main className="mx-auto min-h-[65vh] max-w-6xl px-6 pb-20 pt-28 text-gray-950 sm:px-8">
      <CatalogNav active="equipment" />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Equipamentos</h1>
          <p className="mt-3 text-gray-500">PDV, relógios de ponto e cartões NFC.</p>
        </div>
        {count > 0 && <a href="#orcamento" className="rounded-lg border border-gray-200 px-4 py-3 text-sm hover:bg-gray-50">Ver seleção ({count})</a>}
      </div>
      <div className="my-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2" aria-label="Categorias de equipamentos">
          {categories.map(item => (
            <button type="button" key={item} onClick={() => setCategory(item)} aria-pressed={category === item}
              className={`rounded-lg px-4 py-2.5 text-sm transition-colors ${category === item ? "bg-gray-100 font-medium text-gray-950" : "text-gray-500 hover:bg-gray-50"}`}>
              {item}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 focus-within:ring-2 focus-within:ring-gray-400">
          <Search size={16} className="shrink-0 text-gray-400" aria-hidden="true" />
          <span className="sr-only">Buscar equipamentos</span>
          <input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Buscar" className="min-w-0 w-full bg-transparent text-sm outline-none sm:w-40" />
        </label>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {products.map(product => {
          return (
            <article key={product.id} className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.25)]">
              <Link href={`/marketplace/${product.id}`} aria-label={`Conhecer ${product.name}`} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600">
                <ProductCardImage id={product.id} />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-xl font-semibold"><Link href={`/marketplace/${product.id}`} className="hover:text-[#b52324]">{product.name}</Link></h2>
                <p className="mb-5 mt-3 text-sm leading-6 text-gray-500">{product.description}</p>
                <p className="mb-5 mt-auto text-sm font-medium">Preço sob consulta</p>
                <Link href={`/marketplace/${product.id}`} className="rounded-xl bg-[#171717] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#383838]">Conhecer produto</Link>
                <button type="button" onClick={() => changeQuantity(product.id, 1)} disabled={!cartLoaded || cart[product.id] >= 999}
                  className="mt-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium transition-colors hover:border-[#e22d2e] hover:bg-red-50 hover:text-[#b52324] disabled:opacity-40" aria-label={`Adicionar ${product.name} ao orçamento`}>
                  Adicionar ao orçamento{cart[product.id] > 0 ? ` (${cart[product.id]})` : ""}
                </button>
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-gray-400">Imagens ilustrativas. Consulte os modelos disponíveis.</p>
      {products.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-200 p-10 text-center text-sm">
          <p className="text-gray-500">Nenhum equipamento encontrado.</p>
          <button onClick={() => { setSearch(""); setCategory("Todos"); }} className="mt-4 font-medium underline">Limpar filtros</button>
        </div>
      )}
      <div aria-live="polite" className="sr-only">{count} unidades selecionadas para orçamento.</div>
      {selected.length > 0 && (
        <section id="orcamento" className="mt-10 scroll-mt-24 border-t border-gray-200 pt-8" aria-labelledby="quote-title">
          <h2 id="quote-title" className="text-xl font-semibold">Seu orçamento</h2>
          <ul className="mt-4 divide-y divide-gray-100">
            {selected.map(product => (
              <li key={product.id} className="flex flex-wrap items-center justify-between gap-4 py-4">
                <Link href={`/marketplace/${product.id}`} className="text-sm hover:underline">{product.name}</Link>
                <div className="flex items-center gap-3">
                  <button onClick={() => changeQuantity(product.id, -1)} className="rounded-lg border p-2.5 hover:bg-gray-50" aria-label={`Diminuir quantidade de ${product.name}`}><Minus size={16} /></button>
                  <span className="min-w-6 text-center text-sm" aria-label={`Quantidade de ${product.name}`}>{cart[product.id]}</span>
                  <button onClick={() => changeQuantity(product.id, 1)} disabled={cart[product.id] >= 999} className="rounded-lg border p-2.5 hover:bg-gray-50 disabled:opacity-40" aria-label={`Aumentar quantidade de ${product.name}`}><Plus size={16} /></button>
                  <button onClick={() => setCart(current => ({ ...current, [product.id]: 0 }))} className="rounded-lg p-2.5 text-gray-500 hover:bg-gray-50" aria-label={`Remover ${product.name}`}><Trash2 size={16} /></button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a href={quote} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-lg bg-[#e22d2e] px-5 py-3 text-sm font-medium text-white hover:bg-[#b52324]">Solicitar pelo WhatsApp <ArrowUpRight size={16} aria-hidden="true" /></a>
            <p className="text-xs text-gray-500">Valores, disponibilidade e entrega a confirmar.</p>
          </div>
        </section>
      )}
    </main>
  );
}
