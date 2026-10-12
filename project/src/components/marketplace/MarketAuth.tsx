"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { marketRequest, useMarket } from "./MarketProvider";

export default function MarketAuth({ mode }: { mode: "login" | "signup" | "recover" | "reset" }) {
  const { setUser } = useMarket();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [recoveryReady, setRecoveryReady] = useState(mode !== "reset");
  const recoveryStarted = useRef(false);
  useEffect(() => {
    if (mode !== "reset" || recoveryStarted.current) return;
    recoveryStarted.current = true;
    const params = new URLSearchParams(window.location.hash.slice(1));
    const refreshToken = params.get("refresh_token");
    window.history.replaceState(null, "", window.location.pathname);
    if (!refreshToken) { setError("Abra o link de recuperação enviado ao seu e-mail. Se ele expirou, solicite outro."); return; }
    marketRequest("auth", { action: "recovery-session", refreshToken }).then(data => { setUser(data.user); setRecoveryReady(true); }).catch(error => setError(error.message));
  }, [mode, setUser]);
  const signup = mode === "signup";
  const title = signup ? "Crie sua conta" : mode === "recover" ? "Recupere seu acesso" : mode === "reset" ? "Defina uma nova senha" : "Bom ter você de volta.";
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setMessage(""); setBusy(true);
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");
    if ((signup || mode === "reset") && password !== form.get("confirm")) { setError("As senhas precisam ser iguais."); setBusy(false); return; }
    try {
      const data = await marketRequest("auth", mode === "reset" ? { password } : { action: mode, email: form.get("email"), password, name: form.get("name"), acceptTerms: form.get("terms") === "on" }, mode === "reset" ? "PATCH" : "POST");
      if (data.user) { setUser(data.user); const next = new URLSearchParams(window.location.search).get("next"); router.replace(next === "/marketplace/carrinho" || next === "/marketplace/vender" ? next : "/marketplace/conta"); }
      else setMessage(data.message);
    } catch (error) { setError(error instanceof Error ? error.message : "Tente novamente."); }
    finally { setBusy(false); }
  }
  return <main className="mx-auto grid min-h-[75vh] max-w-6xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:py-20">
    <div className="hidden lg:block"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">ConderTech Marketplace</p><h1 className="mt-6 max-w-md text-5xl font-semibold leading-tight tracking-tight">Tecnologia conecta.<br /><span className="text-[#f05a61]">Sua conta aproxima.</span></h1><p className="mt-6 max-w-sm text-base leading-8 text-zinc-400">Explore produtos, acompanhe suas solicitações e coloque sua loja no marketplace.</p><div className="mt-12 flex gap-5 text-xs text-zinc-500"><span>Para comprar</span><span className="text-zinc-700">/</span><span>Para vender</span><span className="text-zinc-700">/</span><span>Para crescer</span></div></div>
    <section className="market-panel mx-auto w-full max-w-md p-6 sm:p-9" aria-labelledby="auth-title">
      <Link href="/marketplace" className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white"><ArrowLeft size={14} />Voltar ao marketplace</Link>
      <h2 id="auth-title" className="mt-7 text-2xl font-semibold tracking-tight">{title}</h2><p className="mb-7 mt-3 text-sm leading-6 text-zinc-400">{signup ? "Uma conta para comprar e vender." : mode === "recover" ? "Enviaremos as instruções para seu e-mail." : mode === "reset" ? "Use pelo menos 8 caracteres." : "Entre para acessar sua área e continuar de onde parou."}</p>
      {error && <p role="alert" className="market-error mb-5">{error}</p>}{message && <p role="status" className="market-success mb-5">{message}</p>}
      <form onSubmit={submit} className="space-y-5">
        {signup && <label className="block text-sm">Seu nome<input name="name" autoComplete="name" required minLength={2} maxLength={100} className="market-input mt-2" placeholder="Como podemos chamar você?" /></label>}
        {mode !== "reset" && <label className="block text-sm">E-mail<input name="email" type="email" autoComplete="email" required maxLength={254} className="market-input mt-2" placeholder="voce@empresa.com.br" /></label>}
        {mode !== "recover" && <><label className="block text-sm">Senha<div className="relative mt-2"><input name="password" type={showPassword ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} required minLength={8} maxLength={128} className="market-input pr-12" placeholder="Pelo menos 8 caracteres" /><button type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"} className="absolute right-3 top-3 text-zinc-500">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label>{(signup || mode === "reset") && <label className="block text-sm">Confirme a senha<input name="confirm" type={showPassword ? "text" : "password"} autoComplete="new-password" required minLength={8} maxLength={128} className="market-input mt-2" /></label>}</>}
        {mode === "login" && <div className="text-right"><Link href="/marketplace/recuperar" className="text-xs text-red-300 hover:text-red-200">Esqueci minha senha</Link></div>}
        {signup && <label className="flex items-start gap-3 text-xs leading-5 text-zinc-400"><input type="checkbox" name="terms" required className="mt-1 accent-red-500" /><span>Li e aceito os <Link href="/termos-de-uso" target="_blank" className="text-zinc-200 underline">termos de uso</Link> e a <Link href="/governanca-de-dados" target="_blank" className="text-zinc-200 underline">política de dados</Link>.</span></label>}
        <button disabled={busy || !recoveryReady} className="market-primary w-full py-3.5">{busy ? "Aguarde..." : signup ? "Criar minha conta" : mode === "recover" ? "Enviar instruções" : mode === "reset" ? "Salvar nova senha" : "Entrar na minha conta"}</button>
      </form>
      <p className="mt-6 text-center text-xs text-zinc-500">{signup ? "Já tem uma conta?" : "Ainda não tem uma conta?"} <Link href={signup ? "/marketplace/entrar" : "/marketplace/cadastro"} className="ml-1 font-medium text-white">{signup ? "Entrar" : "Cadastre-se"}</Link></p>
      {mode === "reset" && <Link href="/marketplace/recuperar" className="mt-4 block text-center text-xs text-red-300">Solicitar novo link</Link>}
    </section>
  </main>;
}
