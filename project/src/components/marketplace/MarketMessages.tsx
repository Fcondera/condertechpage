"use client";

import { Suspense, useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AccountGate from "./AccountGate";
import { marketRequest } from "./MarketProvider";
import type { ChatMessage } from "@/lib/marketplace/chat";

type Thread = { id: string; quote_id: string; subject: string; side: "buyer" | "seller"; unread: number };
function Inbox() {
  const params = useSearchParams();
  const quote = params.get("solicitacao");
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selected, setSelected] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [more, setMore] = useState(false);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const sending = useRef(false);
  const firstPage = useRef(true);
  const skipScroll = useRef(false);
  const pending = useRef<{ text: string; thread: string; id: string } | null>(null);
  const activeId = useRef(selected);
  activeId.current = selected;
  const bottom = useRef<HTMLDivElement>(null);
  const current = threads.find(thread => thread.id === selected);
  useEffect(() => { setText(""); }, [selected]);
  useEffect(() => {
    let active = true;
    let running = false;
    async function update() {
      if (running || document.visibilityState !== "visible") return;
      running = true;
      try {
        const data = await marketRequest("messages");
        if (active) { setThreads(data.threads); setLoaded(true); setError(""); }
      } catch (error) { if (active) { setError(error instanceof Error ? error.message : "Não foi possível carregar as conversas."); setLoaded(true); } }
      finally { running = false; }
    }
    void update();
    const timer = setInterval(update, 15000);
    document.addEventListener("visibilitychange", update);
    return () => { active = false; clearInterval(timer); document.removeEventListener("visibilitychange", update); };
  }, [refresh]);
  useEffect(() => {
    if (quote && !threads.some(thread => thread.id === selected && thread.quote_id === quote)) {
      setSelected(threads.find(thread => thread.quote_id === quote)?.id || "");
    } else if (!selected && threads.length && !quote) setSelected(threads[0].id);
  }, [threads, quote, selected]);
  useEffect(() => {
    if (!selected) return;
    let active = true;
    let running = false;
    setMessages([]); setHistoryLoaded(false); setMore(false);
    firstPage.current = true;
    async function update() {
      if (running || document.visibilityState !== "visible") return;
      running = true;
      try {
        const data = await marketRequest(`messages?thread=${selected}`);
        if (!active) return;
        setMessages(previous => [...new Map<number, ChatMessage>([...previous, ...data.messages].map((message: ChatMessage) => [message.id, message])).values()].sort((a,b) => a.id - b.id));
        setHistoryLoaded(true);
        if (firstPage.current) { setMore(data.hasMore); firstPage.current = false; }
        const unread = data.messages.filter((message: ChatMessage) => message.sender_side !== data.side && !message.read_at).map((message: ChatMessage) => message.id);
        if (unread.length && document.visibilityState === "visible") {
          await marketRequest("messages", { thread: selected, ids: unread }, "PATCH");
          if (active) setThreads(previous => previous.map(thread => thread.id === selected ? { ...thread, unread: Math.max(0, thread.unread - unread.length) } : thread));
        }
      } catch (error) { if (active) setError(error instanceof Error ? error.message : "Não foi possível atualizar a conversa."); }
      finally { running = false; }
    }
    void update();
    const timer = setInterval(update, 5000);
    document.addEventListener("visibilitychange", update);
    return () => { active = false; clearInterval(timer); document.removeEventListener("visibilitychange", update); };
  }, [selected, refresh]);
  useEffect(() => { if (skipScroll.current) { skipScroll.current = false; return; } bottom.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, [messages.length, selected]);
  async function older() {
    if (!messages.length || loadingOlder) return;
    setLoadingOlder(true);
    const id = selected;
    try {
      const data = await marketRequest(`messages?thread=${id}&before=${messages[0].id}`);
      if (activeId.current !== id) return;
      skipScroll.current = true;
      setMessages(previous => [...new Map<number, ChatMessage>([...data.messages, ...previous].map((message: ChatMessage) => [message.id, message])).values()].sort((a,b) => a.id-b.id));
      setMore(data.hasMore);
      const ids = data.messages.filter((message: ChatMessage) => message.sender_side !== current?.side && !message.read_at).map((message: ChatMessage) => message.id);
      if (ids.length) await marketRequest("messages", { thread: id, ids }, "PATCH");
    } catch (error) { setError(error instanceof Error ? error.message : "Tente novamente."); }
    finally { setLoadingOlder(false); }
  }
  async function send(event: FormEvent) {
    event.preventDefault();
    if (!text.trim() || !current || sending.current) return;
    sending.current = true; setBusy(true); setError("");
    const draft = pending.current?.text === text && pending.current.thread === selected ? pending.current : { text, thread: selected, id: crypto.randomUUID() };
    pending.current = draft;
    try {
      await marketRequest("messages", { thread: draft.thread, text: draft.text, requestId: draft.id });
      pending.current = null; setText(""); setRefresh(value => value + 1);
    } catch (error) { setError(error instanceof Error ? error.message : "Não foi possível enviar. Sua mensagem foi mantida."); }
    finally { sending.current = false; setBusy(false); }
  }
  const visible = quote ? threads.filter(thread => thread.quote_id === quote) : threads;
  const unread = threads.reduce((sum, thread) => sum + thread.unread, 0);
  return <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
    <Link href="/marketplace/conta" className="text-xs text-zinc-400">← Minha conta</Link>
    <div className="my-6 flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-3xl font-semibold">Mensagens {unread > 0 && <span className="text-base text-red-300">({unread} não lidas)</span>}</h1><p className="mt-3 text-sm text-zinc-400">Converse sobre os produtos de cada solicitação. As conversas com vendedores diferentes são separadas.</p></div><button disabled={busy} onClick={() => setRefresh(value => value+1)} className="market-secondary">Atualizar</button></div>
    {quote && <Link href="/marketplace/mensagens" className="mb-5 inline-block text-sm text-red-300">Ver todas as conversas</Link>}
    {error && <p role="alert" className="market-error mb-5">{error}</p>}
    {!loaded ? <p role="status">Carregando conversas...</p> : !visible.length ? <section className="market-panel p-8"><h2 className="text-xl">Nenhuma conversa por aqui.</h2><p className="mt-3 text-sm text-zinc-400">As conversas ficam disponíveis após enviar uma solicitação de produtos.</p><Link href="/marketplace" className="market-primary mt-5">Explorar produtos</Link></section> :
      <div className="grid items-start gap-5 lg:grid-cols-[300px_1fr]">
        <nav aria-label="Conversas" className="market-panel max-h-[30vh] space-y-2 overflow-y-auto p-3 lg:max-h-[650px]">{visible.map(thread => <button key={thread.id} disabled={busy} onClick={() => setSelected(thread.id)} aria-current={selected === thread.id ? "page" : undefined} className={`w-full rounded-lg p-4 text-left ${selected === thread.id ? "bg-red-500/10" : "hover:bg-white/5"}`}><span className="block text-sm font-semibold">{thread.subject}</span><span className="mt-2 block text-xs text-zinc-500">#{thread.quote_id.slice(0,8).toUpperCase()} · {thread.side === "buyer" ? "Compra" : "Atendimento"}</span>{thread.unread > 0 && <span className="mt-2 inline-block rounded-full bg-red-500/20 px-2 py-1 text-xs text-red-200">{thread.unread} não lidas</span>}</button>)}</nav>
        {current ? <section className="market-panel min-w-0 overflow-hidden"><div className="border-b border-white/10 p-5"><h2 className="font-semibold">{current.subject}</h2><p className="mt-2 text-xs text-zinc-400">Solicitação #{current.quote_id.slice(0,8).toUpperCase()}</p></div><div className="h-[420px] space-y-4 overflow-y-auto p-5" role="log" aria-label="Histórico da conversa" aria-live="polite">{more && <button disabled={loadingOlder} onClick={older} className="market-secondary w-full">{loadingOlder ? "Carregando..." : "Carregar mensagens anteriores"}</button>}{!historyLoaded ? <p role="status" className="text-sm text-zinc-500">Carregando mensagens...</p> : !messages.length && <p className="text-sm text-zinc-500">Envie a primeira mensagem para combinar detalhes, entrega ou tirar dúvidas.</p>}{messages.map(message => <article key={message.id} className={`max-w-[90%] rounded-xl p-4 ${message.sender_side === current.side ? "ml-auto bg-red-500/15" : "bg-white/5"}`}><p className="mb-2 text-[10px] text-zinc-500">{message.sender_side === current.side ? "Você" : message.sender_side === "buyer" ? "Cliente" : "Vendedor"}</p><p className="whitespace-pre-wrap break-words text-sm leading-6">{message.body}</p><p className="mt-2 text-[10px] text-zinc-500">{new Date(message.created_at).toLocaleString("pt-BR")} {message.sender_side === current.side && (message.read_at ? "· Lida" : "· Enviada")}</p></article>)}<div ref={bottom}/></div><form onSubmit={send} className="border-t border-white/10 p-5"><label htmlFor="chat-message" className="text-xs text-zinc-400">Sua mensagem</label><textarea id="chat-message" value={text} onChange={event => setText(event.target.value)} disabled={busy} required maxLength={2000} rows={3} className="market-input mt-2" placeholder="Escreva aqui..."/><div className="mt-3 flex items-center justify-between gap-4"><span className="text-xs text-zinc-500">{text.length}/2000 · Não envie senhas ou dados de cartão.</span><button disabled={busy || !text.trim() || !historyLoaded} className="market-primary">{busy ? "Enviando..." : "Enviar"}</button></div></form></section> : <p className="market-panel p-8 text-sm text-zinc-400">Selecione uma conversa.</p>}
      </div>}
  </main>;
}
export default function MarketMessages() { return <AccountGate returnTo="/marketplace/mensagens"><Suspense fallback={<p className="p-8">Carregando...</p>}><Inbox /></Suspense></AccountGate>; }
