"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { safeNext } from "@/lib/marketplace/validation";

export default function MarketAuth({
  mode,
}: {
  mode: "login" | "signup" | "recover" | "reset";
}) {
  const [error, setError] = useState("");
  const [next, setNext] = useState("/marketplace/conta");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setNext(safeNext(params.get("next")));
    if (params.get("erro") === "google")
      setError(
        "Não foi possível concluir o acesso com o Google. Tente novamente.",
      );
  }, []);

  const isSignup = mode === "signup";
  const passwordHelp = mode === "recover" || mode === "reset";
  const title = passwordHelp
    ? "Acesso pela sua conta Google"
    : isSignup
      ? "Crie sua conta"
      : "Entre no marketplace";
  const description = passwordHelp
    ? "Este marketplace não armazena senhas. Acesse ou recupere sua conta diretamente pelo Google."
    : isSignup
      ? "Use sua conta Google para começar. Você poderá completar seus dados pessoais com segurança depois."
      : "Acesse seus pedidos, favoritos e sua loja usando sua conta Google.";

  if (passwordHelp) {
    return (
      <main className="mx-auto grid min-h-[75vh] max-w-6xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:py-20">
        <BrandPanel />
        <section
          className="market-panel mx-auto w-full max-w-md p-6 sm:p-9"
          aria-labelledby="auth-title"
        >
          <Link
            href="/marketplace/entrar"
            className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white"
          >
            <ArrowLeft size={14} />
            Voltar para entrar
          </Link>
          <h1
            id="auth-title"
            className="mt-7 text-2xl font-semibold tracking-tight"
          >
            {title}
          </h1>
          <p className="mb-7 mt-3 text-sm leading-6 text-zinc-400">
            {description}
          </p>
          <a
            href={`/api/marketplace/auth?action=google&next=${encodeURIComponent(next)}`}
            className="market-primary w-full"
          >
            Continuar com Google
          </a>
          <p className="mt-5 text-xs leading-5 text-zinc-500">
            Se esqueceu sua senha Google, use a recuperação de conta do próprio
            Google.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto grid min-h-[75vh] max-w-6xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:py-20">
      <BrandPanel />
      <section
        className="market-panel mx-auto w-full max-w-md p-6 sm:p-9"
        aria-labelledby="auth-title"
      >
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={14} />
          Voltar ao marketplace
        </Link>
        <h1
          id="auth-title"
          className="mt-7 text-2xl font-semibold tracking-tight"
        >
          {title}
        </h1>
        <p className="mb-7 mt-3 text-sm leading-6 text-zinc-400">
          {description}
        </p>
        {error && (
          <p role="alert" className="market-error mb-5">
            {error}
          </p>
        )}
        <a
          href={`/api/marketplace/auth?action=google&next=${encodeURIComponent(next)}`}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-[#171717] transition-colors hover:bg-zinc-100"
        >
          <span
            aria-hidden="true"
            className="bg-gradient-to-br from-blue-600 via-green-600 to-red-500 bg-clip-text text-lg font-black text-transparent"
          >
            G
          </span>
          Continuar com Google
        </a>
        <div className="mt-6 flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <ShieldCheck size={18} className="mt-0.5 shrink-0 text-emerald-300" />
          <p className="text-xs leading-5 text-zinc-400">
            Não armazenamos sua senha. O Google autentica sua conta; os dados
            adicionais do marketplace são solicitados somente para compras e
            vendas.
          </p>
        </div>
        <p className="mt-6 text-center text-xs leading-5 text-zinc-500">
          Ao continuar, você concorda com os{" "}
          <Link
            href="/termos-de-uso"
            target="_blank"
            className="text-zinc-300 underline"
          >
            termos de uso
          </Link>{" "}
          e a{" "}
          <Link
            href="/governanca-de-dados"
            target="_blank"
            className="text-zinc-300 underline"
          >
            política de dados
          </Link>
          .
        </p>
        <p className="mt-5 text-center text-xs text-zinc-500">
          {isSignup ? "Já tem uma conta?" : "Ainda não tem uma conta?"}{" "}
          <Link
            href={isSignup ? "/marketplace/entrar" : "/marketplace/cadastro"}
            className="ml-1 font-medium text-white"
          >
            {isSignup ? "Entrar" : "Criar conta"}
          </Link>
        </p>
      </section>
    </main>
  );
}

function BrandPanel() {
  return (
    <div className="hidden lg:block">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
        ConderTech Marketplace
      </p>
      <h2 className="mt-6 max-w-md text-5xl font-semibold leading-tight tracking-tight">
        Tecnologia conecta.
        <br />
        <span className="text-[#f05a61]">Sua conta aproxima.</span>
      </h2>
      <p className="mt-6 max-w-sm text-base leading-8 text-zinc-400">
        Explore produtos, acompanhe suas solicitações e coloque sua loja no
        marketplace.
      </p>
      <div className="mt-12 flex gap-5 text-xs text-zinc-500">
        <span>Para comprar</span>
        <span className="text-zinc-700">/</span>
        <span>Para vender</span>
        <span className="text-zinc-700">/</span>
        <span>Para crescer</span>
      </div>
    </div>
  );
}
