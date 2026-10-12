"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingBag, UserRound, ArrowUpRight } from "lucide-react";
import { useState, type ReactNode } from "react";
import { MarketProvider, useMarket } from "./MarketProvider";

function Shell({ children }: { children: ReactNode }) {
  const { user, loading, cart, notice } = useMarket();
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const count = cart.reduce((sum, row) => sum + row.quantity, 0);
  return <div className="market min-h-screen bg-[#090a0d] text-[#f4f4f5]">
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#090a0d]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-5 py-4 sm:px-8 lg:gap-7">
        <Link href="/marketplace" aria-label="ConderTech Marketplace" className="shrink-0"><span className="text-xl font-bold tracking-tight">CONDER<span className="text-[#f0444c]">TECH</span></span><span className="mt-0.5 block text-[9px] uppercase tracking-[0.35em] text-zinc-500">Marketplace</span></Link>
        <form onSubmit={event => { event.preventDefault(); router.push(`/marketplace?q=${encodeURIComponent(search)}#catalogo`); }} className="order-3 flex w-full items-center gap-3 rounded-xl border border-white/10 bg-[#14151b] px-4 lg:order-none lg:w-auto lg:flex-1">
          <Search size={17} className="shrink-0 text-zinc-500" aria-hidden="true" /><label className="sr-only" htmlFor="market-search">Buscar produtos e vendedores</label><input id="market-search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Buscar produtos, sistemas, vendedores..." className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-zinc-500" /><button className="text-xs font-semibold text-zinc-300 hover:text-white">Buscar</button>
        </form>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link href="/marketplace/carrinho" aria-label={`Carrinho com ${count} itens`} className="relative rounded-xl p-3 text-zinc-300 hover:bg-white/5"><ShoppingBag size={21} />{count > 0 && <span className="absolute -right-0.5 top-0 rounded-full bg-[#e22d2e] px-1.5 py-0.5 text-[10px] font-bold text-white">{count}</span>}</Link>
          {loading ? <span className="h-10 w-20 animate-pulse rounded-xl bg-white/5" aria-label="Carregando conta" /> : user ? <Link href="/marketplace/conta" className="market-secondary inline-flex gap-2"><UserRound size={16} /><span className="hidden sm:inline">Minha conta</span><span className="sm:hidden">Conta</span></Link> : <><Link href="/marketplace/entrar" className="market-secondary">Entrar</Link><Link href="/marketplace/cadastro" className="market-primary">Criar conta</Link></>}
        </div>
      </div>
      <nav aria-label="Marketplace" className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-5 pb-3 text-xs font-medium sm:px-8">
        {[{ href: "/marketplace", label: "Explorar" }, { href: "/marketplace?categoria=Software#catalogo", label: "Sistemas" }, { href: "/marketplace?categoria=PDV#catalogo", label: "PDV e automação" }, { href: "/marketplace?categoria=Ponto#catalogo", label: "Controle de ponto" }, { href: "/marketplace?categoria=NFC#catalogo", label: "NFC" }, { href: "/marketplace/vender", label: "Quero vender" }].map(item => <Link key={item.href} href={item.href} className={`shrink-0 py-1 transition-colors hover:text-white ${pathname === item.href ? "text-[#ff777d]" : "text-zinc-400"}`}>{item.label}</Link>)}
        <Link href="/" className="ml-auto flex shrink-0 items-center gap-1 text-zinc-500 hover:text-white">Site ConderTech <ArrowUpRight size={12} /></Link>
      </nav>
    </header>
    {children}
    <div role="status" aria-live="polite" className={notice ? "fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-xl border border-white/15 bg-[#22242c] px-5 py-4 text-center text-sm shadow-xl" : "sr-only"}>{notice}</div>
  </div>;
}

export default function MarketShell({ children }: { children: ReactNode }) {
  return <MarketProvider><Shell>{children}</Shell></MarketProvider>;
}
