"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { useMarket } from "./MarketProvider";

export default function AccountGate({ children, seller = false }: { children: ReactNode; seller?: boolean }) {
  const { user, loading, authError, refreshUser } = useMarket();
  if (loading) return <div role="status" className="mx-auto max-w-5xl p-12 text-center text-zinc-400">Carregando sua conta...</div>;
  if (authError) return <div className="mx-auto max-w-lg px-5 py-16"><div className="market-panel p-8"><p role="alert" className="text-sm text-zinc-400">{authError}</p><button onClick={() => void refreshUser()} className="market-primary mt-5">Tentar novamente</button></div></div>;
  if (!user) return <div className="mx-auto max-w-lg px-5 py-16"><div className="market-panel p-8"><h1 className="text-2xl font-semibold">{seller ? "Sua loja começa aqui." : "Acesse sua conta."}</h1><p className="mt-4 text-sm leading-6 text-zinc-400">{seller ? "Entre ou crie uma conta para cadastrar sua loja e anunciar seus produtos." : "Entre para acompanhar suas solicitações e atualizar seus dados."}</p><div className="mt-6 flex flex-wrap gap-3"><Link href={`/marketplace/entrar${seller ? "?next=/marketplace/vender" : ""}`} className="market-primary">Entrar</Link><Link href={`/marketplace/cadastro${seller ? "?next=/marketplace/vender" : ""}`} className="market-secondary">Criar conta</Link></div></div></div>;
  return <>{children}</>;
}
