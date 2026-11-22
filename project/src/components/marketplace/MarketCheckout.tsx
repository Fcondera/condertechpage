"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, ShieldCheck, Truck } from "lucide-react";
import type { CheckoutItem } from "@/lib/marketplace/checkout";
import { marketRequest, money, useMarket } from "./MarketProvider";

type Review = { items: CheckoutItem[]; subtotal_cents: number; has_unpriced_items: boolean; address: { name: string; cep: string; street: string; number: string; complement: string; neighborhood: string; city: string; state: string } };

export default function MarketCheckout() {
  const { cart, ready, user, loading, clear } = useMarket();
  const [review, setReview] = useState<Review | null>(null);
  const [reviewKey, setReviewKey] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState("");
  const [notes, setNotes] = useState("");
  const [preference, setPreference] = useState("a_combinar");
  const [accepted, setAccepted] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [retry, setRetry] = useState(0);
  const key = JSON.stringify(cart.map(row => ({ id: row.id, quantity: row.quantity })));
  const eligible = Boolean(user?.profileComplete && user?.phoneVerified);
  const identityKey = `${user?.id || ""}:${key}`;
  const current = reviewKey === identityKey ? review : null;
  useEffect(() => {
    if (!ready || !eligible || !cart.length || success) return;
    let active = true;
    setReview(null); setError(""); setAccepted(false); setRequestId("");
    marketRequest("checkout", { items: JSON.parse(key) }).then(data => {
      if (active) { setReview(data); setReviewKey(identityKey); }
    }).catch(error => { if (active) setError(error.message); });
    return () => { active = false; };
  }, [key, identityKey, ready, eligible, success, cart.length, retry]);
  async function submit() {
    if (!current || !accepted || busy) return;
    setBusy(true); setError("");
    const id = requestId || crypto.randomUUID(); setRequestId(id);
    try {
      const data = await marketRequest("quotes", { items: JSON.parse(key), notes, requestId: id, checkout: true, reviewedItems: current.items, reviewedAddress: current.address, paymentPreference: preference, acceptConditions: accepted });
      setSuccess(data.id); clear();
    } catch (error) { setError(error instanceof Error ? error.message : "Tente novamente."); }
    finally { setBusy(false); }
  }
  return <main className="market-checkout mx-auto max-w-6xl px-5 py-10 sm:px-8">
    <Link href="/marketplace/carrinho" className="text-sm text-zinc-400">← Voltar ao carrinho</Link>
    <h1 className="mt-6 text-3xl font-semibold">Checkout</h1>
    <p className="mt-3 text-sm leading-6 text-zinc-400">Confira sua compra. A equipe confirma disponibilidade e frete antes de liberar o pagamento.</p>
    <ol aria-label="Etapas da compra" className="my-8 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">{["Carrinho", "Revisão e entrega", "Confirmação da equipe", "Pagamento"].map((step, index) => <li key={step} aria-current={index === (success ? 2 : 1) ? "step" : undefined} className={`rounded-xl border px-4 py-3 ${index === (success ? 2 : 1) ? "border-red-400/30 bg-red-500/10 text-red-200" : "border-white/10 text-zinc-400"}`}><span className="mr-2 font-semibold">{index + 1}.</span>{step}</li>)}</ol>
    <div className="mb-6 grid gap-3 text-xs text-zinc-400 sm:grid-cols-3"><p className="flex items-center gap-2"><ShieldCheck size={17} className="text-red-300"/>Pagamento no ambiente Mercado Pago</p><p className="flex items-center gap-2"><Truck size={17} className="text-red-300"/>Frete confirmado antes de pagar</p><p className="flex items-center gap-2"><CheckCircle2 size={17} className="text-red-300"/>Acompanhamento pela sua conta</p></div>
    {success ? <section className="market-panel p-8" role="status"><h2 className="text-2xl font-semibold">Solicitação enviada</h2><p className="mt-4 text-sm leading-7 text-zinc-400">Referência #{success.slice(0,8).toUpperCase()}. Os vendedores confirmarão disponibilidade, frete e condições. Nenhum pagamento foi realizado.</p><Link href="/marketplace/conta" className="market-primary mt-6">Acompanhar na minha conta</Link><Link href="/marketplace/pagamento" className="market-secondary ml-3 mt-6">Ver pagamentos</Link></section>
    : !ready || loading ? <p role="status">Carregando checkout...</p>
    : !cart.length ? <section className="market-panel p-8"><h2 className="text-xl">Seu carrinho está vazio.</h2><Link href="/marketplace#catalogo" className="market-primary mt-5">Explorar produtos</Link></section>
    : !user ? <section className="market-panel p-8"><h2 className="text-xl">Entre para continuar</h2><p className="mt-3 text-sm text-zinc-400">Seu carrinho será mantido neste navegador.</p><Link href="/marketplace/entrar?next=/marketplace/checkout" className="market-primary mt-5">Continuar com Google</Link></section>
    : !eligible ? <section className="market-panel p-8"><h2 className="text-xl">Complete seus dados</h2><p className="mt-3 text-sm text-zinc-400">Precisamos do endereço e da confirmação do seu celular para o atendimento. Depois, retorne ao checkout.</p><Link href="/marketplace/conta" className="market-primary mt-5">Completar cadastro</Link></section>
    : <><div className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        {current ? <>
          <section className="market-panel p-6"><h2 className="text-lg font-semibold">Produtos revisados</h2><ul className="mt-5 divide-y divide-white/10">{current.items.map(item => <li key={item.id} className="flex justify-between gap-4 py-4 text-sm"><div><p>{item.quantity} × {item.name}</p><p className="mt-1 text-xs text-zinc-500">{item.seller_id ? "Vendedor parceiro" : "ConderTech"}</p></div><span>{item.price_cents === null ? "Sob consulta" : money(item.price_cents * item.quantity)}</span></li>)}</ul><p className="mt-3 text-xs text-zinc-500">O estoque será confirmado no atendimento.</p></section>
          <section className="market-panel p-6"><h2 className="text-lg font-semibold">Endereço de entrega</h2><p className="mt-4 text-sm leading-7 text-zinc-300">{current.address.name}<br/>{current.address.street}, {current.address.number} {current.address.complement}<br/>{current.address.neighborhood} · {current.address.city}/{current.address.state}<br/>CEP {current.address.cep}</p><Link href="/marketplace/conta" className="mt-4 inline-block text-xs text-red-300">Alterar endereço na minha conta</Link><p className="mt-4 text-xs text-zinc-500">Frete e prazo a confirmar. Sistemas digitais têm ativação combinada no atendimento.</p></section>
        </> : <p role="status" className="market-panel p-6">{error ? "Não foi possível revisar os produtos." : "Conferindo produtos e endereço..."}</p>}
        <section className="market-panel p-6"><h2 className="text-lg font-semibold">Preferência de pagamento</h2><p className="mt-3 text-xs leading-6 text-zinc-400">A disponibilidade será confirmada pelo vendedor. Esta etapa não gera cobrança.</p><label className="mt-4 block text-sm">Forma preferida<select value={preference} disabled={busy} onChange={e => setPreference(e.target.value)} className="market-input mt-2"><option value="a_combinar">Combinar no atendimento</option><option value="pix">Pix</option><option value="cartao">Cartão</option><option value="boleto">Boleto</option></select></label><label className="mt-5 block text-sm">Observações<textarea value={notes} disabled={busy} onChange={e => setNotes(e.target.value)} maxLength={2000} rows={3} placeholder="Especificações, instalação ou detalhes da entrega" className="market-input mt-2"/></label></section>
      </div>
      <aside className="market-panel p-6"><h2 className="text-lg font-semibold">Resumo</h2><div className="mt-5 flex justify-between gap-4 text-sm"><span>Produtos com preço</span><strong>{current ? money(current.subtotal_cents) : "—"}</strong></div>{current?.has_unpriced_items && <p className="mt-3 text-xs leading-6 text-amber-200">Há produtos sob consulta. O valor acima é parcial e não representa o total da compra.</p>}<div className="mt-4 flex justify-between text-sm text-zinc-400"><span>Frete</span><span>A confirmar</span></div><p className="mt-5 border-t border-white/10 pt-5 text-sm">Total final a confirmar no atendimento</p><label className="mt-6 flex items-start gap-3 text-xs leading-6 text-zinc-400"><input type="checkbox" checked={accepted} disabled={busy} onChange={e => setAccepted(e.target.checked)} className="mt-1.5 accent-red-500"/><span>Autorizo o envio dos meus dados de contato, endereço e observações aos vendedores destes produtos. Entendo que esta solicitação não confirma a compra nem realiza pagamento. <Link href="/termos-de-uso" className="text-red-300">Termos de uso</Link>.</span></label><button onClick={submit} disabled={!current || !accepted || busy} className="market-primary mt-5 w-full">{busy ? "Enviando..." : "Confirmar solicitação"}</button></aside>
    </div>{error && <div role="alert" className="market-error mt-5">{error}<button disabled={busy} onClick={() => setRetry(value => value + 1)} className="ml-3 underline">Atualizar revisão</button><Link href="/marketplace/carrinho" className="ml-3 underline">Revisar carrinho</Link></div>}</>}
  </main>;
}
