"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import AccountGate from "./AccountGate";
import { marketRequest, money, useMarket } from "./MarketProvider";

type Item = { id: string; name: string; quantity: number; price_cents: number | null };
type Order = { id: string; quote_id: string; items: Item[]; total_cents: number; shipping_cents: number; status: string; address: { street: string; number: string; complement: string; neighborhood: string; city: string; state: string; cep: string } };
type Quote = { id: string; items: Item[]; customer_contact: { name: string } };
const labels: Record<string,string> = { ready: "Disponível para pagamento", creating: "Preparando checkout", awaiting_payment: "Aguardando pagamento", paid: "Pagamento aprovado", refunded: "Pagamento devolvido", charged_back: "Pagamento contestado", payment_review: "Pagamento em revisão", cancelled: "Pedido cancelado" };

function Orders({ admin }: { admin: boolean }) {
  const { user } = useMarket();
  const [orders, setOrders] = useState<Order[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [configured, setConfigured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [accepted, setAccepted] = useState<string[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [focus, setFocus] = useState("");
  useEffect(() => { setFocus(new URLSearchParams(window.location.search).get("pedido") || ""); }, []);
  useEffect(() => {
    if (admin && !user?.isAdmin) { setLoading(false); return; }
    let active = true;
    let running = false;
    async function load() {
      if (running || document.visibilityState !== "visible") return;
      running = true;
      try {
        const data = await marketRequest(`orders${admin ? "?admin=1" : ""}`);
        if (active) { setOrders(data.orders); setQuotes(data.quotes); setConfigured(data.configured); setError(""); }
      } catch (error) { if (active) setError(error instanceof Error ? error.message : "Não foi possível consultar pedidos."); }
      finally { running = false; if (active) setLoading(false); }
    }
    void load();
    document.addEventListener("visibilitychange", load);
    const interval = setInterval(load, 15000);
    return () => { active = false; clearInterval(interval); document.removeEventListener("visibilitychange", load); };
  }, [admin, user?.isAdmin, refresh]);
  async function pay(order: Order) {
    if (busy) return;
    setBusy(order.id); setError("");
    try {
      const result = await marketRequest("payments", { orderId: order.id, acceptTotal: accepted.includes(order.id), totalCents: order.total_cents });
      window.location.assign(result.url);
    } catch (error) { setError(error instanceof Error ? error.message : "Tente novamente."); setRefresh(value => value+1); }
    finally { setBusy(""); }
  }
  async function approve(event: FormEvent<HTMLFormElement>, quote: Quote) {
    event.preventDefault(); setBusy(quote.id); setError("");
    const data = new FormData(event.currentTarget);
    try {
      await marketRequest("orders", { quoteId: quote.id, shippingCents: Math.round(Number(data.get("shipping")) * 100), prices: quote.items.map(item => ({ id: item.id, price_cents: Math.round(Number(data.get(item.id)) * 100) })), confirmAvailability: data.get("confirm") === "on" });
      setRefresh(value => value+1);
    } catch (error) { setError(error instanceof Error ? error.message : "Não foi possível liberar a cobrança."); }
    finally { setBusy(""); }
  }
  async function recover(event: FormEvent<HTMLFormElement>, order: Order) {
    event.preventDefault(); setBusy(order.id); setError("");
    const data = new FormData(event.currentTarget);
    try { await marketRequest("payments/recover", { orderId: order.id, preferenceId: data.get("preference") }); setRefresh(value => value+1); }
    catch (error) { setError(error instanceof Error ? error.message : "Não foi possível recuperar."); }
    finally { setBusy(""); }
  }
  async function sync(event: FormEvent<HTMLFormElement>, order: Order) {
    event.preventDefault(); setBusy(order.id); setError("");
    const data = new FormData(event.currentTarget);
    try { await marketRequest("payments/sync", { orderId: order.id, paymentId: data.get("payment") }); setRefresh(value => value+1); }
    catch (error) { setError(error instanceof Error ? error.message : "Não foi possível sincronizar."); }
    finally { setBusy(""); }
  }
  async function cancel(order: Order) {
    setBusy(order.id); setError("");
    try { await marketRequest("orders", { action: "cancel", orderId: order.id }); setRefresh(value => value+1); }
    catch (error) { setError(error instanceof Error ? error.message : "Não foi possível cancelar."); }
    finally { setBusy(""); }
  }
  if (admin && !user?.isAdmin) return <p className="p-10">Acesso restrito à equipe administradora.</p>;
  return <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8"><Link href="/marketplace/conta" className="text-sm text-zinc-400">← Minha conta</Link><div className="my-7 flex flex-wrap items-center justify-between gap-4"><h1 className="text-3xl font-semibold">{admin ? "Liberar pagamentos" : "Meus pagamentos"}</h1><button onClick={() => { setError(""); setRefresh(value => value+1); }} className="market-secondary">Atualizar</button></div>
    <p className="mb-6 text-sm leading-7 text-zinc-400">{admin ? "Confirme disponibilidade, valor de cada item e frete antes de liberar. O total aprovado fica fixo e o estoque de anúncios parceiros é reservado. Os pagamentos entram na conta ConderTech; os repasses são gerenciados pela equipe." : "Após a confirmação dos valores e da entrega pela equipe, pague pelo checkout do Mercado Pago. O status abaixo é confirmado pelo servidor; o retorno do checkout não comprova pagamento."}</p>
    {!configured && !loading && <p className="market-error mb-5">O pagamento online ainda não está habilitado. Entre em contato pelo chat.</p>}
    {error && <p role="alert" className="market-error mb-5">{error}</p>}
    {loading ? <p role="status">Carregando pedidos...</p> : <>
      {admin && quotes.filter(quote => !orders.some(order => order.quote_id === quote.id)).map(quote => <form key={quote.id} onSubmit={event => approve(event, quote)} className="market-panel mb-6 space-y-5 p-6"><h2 className="font-semibold">Solicitação #{quote.id.slice(0,8).toUpperCase()} · {quote.customer_contact?.name}</h2>{quote.items.map(item => <label key={item.id} className="block text-sm">{item.quantity} × {item.name} — preço unitário (R$)<input name={item.id} type="number" required min="1" max="1000000" step="0.01" defaultValue={item.price_cents === null ? "" : (item.price_cents / 100).toFixed(2)} className="market-input mt-2"/></label>)}<label className="block text-sm">Frete total (R$) — informe zero para retirada, entrega digital ou frete grátis<input name="shipping" type="number" required min="0" max="1000000" step="0.01" className="market-input mt-2"/></label><label className="flex items-start gap-3 text-xs leading-6 text-zinc-400"><input type="checkbox" name="confirm" required className="mt-1.5"/>Confirmei estoque, configurações, condições de entrega e valores com o cliente e os vendedores. Produtos próprios sob consulta têm disponibilidade confirmada.</label><button disabled={Boolean(busy) || !configured} className="market-primary">{busy === quote.id ? "Liberando..." : "Liberar pagamento"}</button><Link href={`/marketplace/mensagens?solicitacao=${quote.id}`} className="market-secondary ml-3">Ver conversa</Link></form>)}
      {!orders.length && !admin && <div className="market-panel p-8"><h2 className="font-semibold">Nenhuma cobrança liberada ainda.</h2><p className="mt-3 text-sm text-zinc-400">A equipe confirmará os valores pelo atendimento antes de disponibilizar o pagamento.</p><Link href="/marketplace/mensagens" className="market-primary mt-5">Abrir mensagens</Link></div>}
      <div className="space-y-6">{orders.filter(order => !focus || order.id === focus).map(order => <article key={order.id} className="market-panel p-6"><div className="flex flex-wrap justify-between gap-3"><h2 className="font-semibold">Pedido #{order.id.slice(0,8).toUpperCase()}</h2><span role="status" className={`text-sm ${order.status === "paid" ? "text-emerald-300" : "text-amber-200"}`}>{labels[order.status] || "Em processamento"}</span></div><ul className="my-5 space-y-3 text-sm">{order.items.map(item => <li key={item.id} className="flex justify-between gap-3"><span>{item.quantity} × {item.name}</span><span>{money((item.price_cents || 0) * item.quantity)}</span></li>)}</ul><p className="flex justify-between text-sm text-zinc-400"><span>Frete</span>{money(order.shipping_cents)}</p><p className="mt-4 flex justify-between border-t border-white/10 pt-4 text-lg font-semibold"><span>Total</span>{money(order.total_cents)}</p><p className="mt-5 text-xs leading-6 text-zinc-400">Entrega: {order.address.street}, {order.address.number} {order.address.complement} · {order.address.neighborhood} · {order.address.city}/{order.address.state} · CEP {order.address.cep}</p>
        {!admin && ["ready","awaiting_payment"].includes(order.status) && <><label className="mt-5 flex items-start gap-3 text-xs leading-6 text-zinc-400"><input type="checkbox" checked={accepted.includes(order.id)} onChange={event => setAccepted(previous => event.target.checked ? [...previous,order.id] : previous.filter(id => id !== order.id))} className="mt-1.5"/>Revisei os produtos, endereço, frete e o valor total. Desejo continuar para o pagamento no Mercado Pago.</label><button disabled={Boolean(busy) || !configured || !accepted.includes(order.id)} onClick={() => pay(order)} className="market-primary mt-5">{busy === order.id ? "Preparando..." : "Pagar com Mercado Pago"}</button><p className="mt-3 text-xs text-zinc-500">Os meios de pagamento disponíveis são apresentados no Mercado Pago.</p></>}
        {admin && order.status === "ready" && <button disabled={Boolean(busy)} onClick={() => cancel(order)} className="market-secondary mt-5">Cancelar cobrança e liberar estoque</button>}
        {order.status === "creating" && <p className="mt-5 text-sm text-zinc-400">O checkout está em preparação. Se houve falha de conexão, solicite a recuperação à equipe pelo chat.</p>}
        {admin && order.status === "creating" && <form onSubmit={event => recover(event,order)} className="mt-5 space-y-3"><label className="block text-xs text-zinc-400">ID da preferência recuperada no Mercado Pago<input name="preference" required maxLength={150} className="market-input mt-2"/></label><button disabled={Boolean(busy)} className="market-secondary">Recuperar checkout existente</button></form>}
        {["creating","awaiting_payment","payment_review","paid"].includes(order.status) && <details className="mt-5 text-xs text-zinc-400"><summary className="cursor-pointer">Já pagou e o status não atualizou?</summary><form onSubmit={event => sync(event,order)} className="mt-3 space-y-3"><label className="block">Número do pagamento no comprovante Mercado Pago<input name="payment" required pattern="[0-9]{1,30}" maxLength={30} className="market-input mt-2"/></label><button disabled={Boolean(busy)} className="market-secondary">Consultar pagamento</button></form></details>}
        <Link href={`/marketplace/mensagens?solicitacao=${order.quote_id}`} className="market-secondary mt-5">Conversar sobre o pedido</Link>
      </article>)}</div>{focus && <Link href="/marketplace/pagamento" className="market-secondary mt-6">Ver todos os pagamentos</Link>}
    </>}
  </main>;
}
export default function MarketOrders({ admin = false }: { admin?: boolean }) { return <AccountGate returnTo={admin ? "/marketplace/administracao/pagamentos" : "/marketplace/pagamento"}><Orders admin={admin}/></AccountGate>; }
