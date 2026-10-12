"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import AccountGate from "./AccountGate";
import { marketRequest, money, type Listing } from "./MarketProvider";
import type { MarketQuote } from "@/data/marketplace";

type Seller = { name: string; city: string; description: string };
type Inquiry = MarketQuote & { customer_contact: { name: string; email: string } };
const labels: Record<string, string> = { pendente: "Em análise", aprovado: "Publicado", pausado: "Pausado", rejeitado: "Não aprovado" };

function SellerPanel() {
  const [seller, setSeller] = useState<Seller | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [requests, setRequests] = useState<Inquiry[]>([]);
  const [tab, setTab] = useState("listings");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  async function load() {
    const [store, catalog] = await Promise.all([marketRequest("seller"), marketRequest("listings?mine=1")]);
    setSeller(store.seller); setRequests(store.requests); setListings(catalog.listings);
  }
  useEffect(() => { load().catch(error => setError(error.message)).finally(() => setLoading(false)); }, []);
  useEffect(() => { if (!photo) { setPreview(""); return; } const url = URL.createObjectURL(photo); setPreview(url); return () => URL.revokeObjectURL(url); }, [photo]);
  async function saveStore(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(""); setMessage(""); const form = new FormData(event.currentTarget);
    try { await marketRequest("seller", { name: form.get("name"), city: form.get("city"), description: form.get("description") }); await load(); setMessage("Loja salva. Você já pode enviar anúncios."); setTab("listings"); }
    catch (error) { setError(error instanceof Error ? error.message : "Não foi possível salvar."); } finally { setBusy(false); }
  }
  async function createListing(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(""); setMessage(""); const form = new FormData(event.currentTarget);
    try {
      if (!photo) throw new Error("Selecione uma foto do produto.");
      const payload = new FormData(); payload.set("image", photo);
      const response = await fetch("/api/marketplace/upload", { method: "POST", body: payload });
      const upload = await response.json(); if (!response.ok) throw new Error(upload.error);
      await marketRequest("listings", { title: form.get("title"), description: form.get("description"), category: form.get("category"), price_cents: Math.round(Number(form.get("price")) * 100), stock: Number(form.get("stock")), image_path: upload.path });
      await load(); setTab("listings"); setPhoto(null); setMessage("Anúncio enviado para análise. Ele aparecerá na vitrine após aprovação.");
    } catch (error) { setError(error instanceof Error ? error.message : "Não foi possível enviar."); } finally { setBusy(false); }
  }
  async function status(item: Listing) {
    setBusy(true); setError(""); setMessage("");
    try { await marketRequest("listings", { id: item.id, status: item.status === "aprovado" || item.status === "pendente" ? "pausado" : "pendente" }, "PATCH"); await load(); }
    catch (error) { setError(error instanceof Error ? error.message : "Tente novamente."); } finally { setBusy(false); }
  }
  return <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8"><Link href="/marketplace/conta" className="text-xs text-zinc-500 hover:text-white">Minha conta / Área do vendedor</Link><div className="mt-5 flex flex-wrap items-center justify-between gap-5"><div><h1 className="text-3xl font-semibold">{seller?.name || "Sua loja no marketplace"}</h1><p className="mt-3 text-sm text-zinc-400">Gerencie seus anúncios e as solicitações dos clientes.</p></div>{seller && <button onClick={() => setTab("new")} className="market-primary">Criar anúncio</button>}</div>
    {error && <div className="market-error mt-6" role="alert">{error}<button onClick={() => { setLoading(true); setError(""); load().catch(error => setError(error.message)).finally(() => setLoading(false)); }} className="ml-3 underline">Tentar novamente</button></div>}{message && <p className="market-success mt-6" role="status">{message}</p>}
    {loading ? <p className="py-12 text-sm text-zinc-400">Carregando sua loja...</p> : <>
      {seller && <><div className="my-7 grid grid-cols-3 gap-3">{[{ label: "Anúncios", value: listings.length }, { label: "Publicados", value: listings.filter(item => item.status === "aprovado").length }, { label: "Solicitações", value: requests.length }].map(item => <div key={item.label} className="market-panel p-4 sm:p-6"><p className="text-xs text-zinc-500">{item.label}</p><p className="mt-3 text-3xl font-semibold">{item.value}</p></div>)}</div><nav aria-label="Área do vendedor" className="mb-6 flex flex-wrap gap-2">{[{ id: "listings", label: "Meus anúncios" }, { id: "requests", label: "Solicitações" }, { id: "store", label: "Dados da loja" }].map(item => <button key={item.id} onClick={() => setTab(item.id)} className={tab === item.id ? "market-primary" : "market-secondary"}>{item.label}</button>)}</nav></>}
      {(!seller || tab === "store") && <form onSubmit={saveStore} className="market-panel mt-7 max-w-2xl space-y-5 p-6"><h2 className="text-xl font-semibold">{seller ? "Dados da loja" : "Cadastre sua loja"}</h2><p className="text-sm text-zinc-400">Essas informações identificam sua loja para os compradores.</p><label className="block text-sm">Nome da loja<input name="name" required minLength={3} maxLength={80} defaultValue={seller?.name} className="market-input mt-2" /></label><label className="block text-sm">Cidade / UF<input name="city" required minLength={2} maxLength={100} placeholder="Ex.: Blumenau / SC" defaultValue={seller?.city} className="market-input mt-2" /></label><label className="block text-sm">Sobre a loja<textarea name="description" maxLength={1000} rows={3} defaultValue={seller?.description} className="market-input mt-2" /></label><button disabled={busy} className="market-primary">{busy ? "Salvando..." : "Salvar loja"}</button></form>}
      {seller && tab === "listings" && (listings.length ? <div className="space-y-3">{listings.map(item => <article key={item.id} className="market-panel flex flex-wrap items-center gap-5 p-4"><img src={item.image_url} alt="" className="h-20 w-28 rounded-lg bg-zinc-800 object-cover" /><div className="min-w-0 flex-1"><h2 className="font-semibold">{item.title}</h2><p className="mt-2 text-sm text-zinc-400">{money(item.price_cents)} · {item.stock} unidades</p></div><span className={`rounded-full px-3 py-1.5 text-xs ${item.status === "aprovado" ? "bg-emerald-400/10 text-emerald-300" : "bg-white/5 text-zinc-400"}`}>{labels[item.status]}</span><button onClick={() => void status(item)} disabled={busy} className="market-secondary">{item.status === "aprovado" || item.status === "pendente" ? "Pausar" : "Enviar para análise"}</button></article>)}</div> : <div className="market-panel p-10"><h2 className="text-xl font-semibold">Seu primeiro anúncio está a um passo.</h2><p className="mt-3 text-sm text-zinc-400">Adicione uma boa foto, descreva o produto e informe o preço.</p><button onClick={() => setTab("new")} className="market-primary mt-6">Criar primeiro anúncio</button></div>)}
      {seller && tab === "new" && <form onSubmit={createListing} className="market-panel max-w-3xl space-y-6 p-6 sm:p-8"><h2 className="text-2xl font-semibold">Novo anúncio</h2><label className="block text-sm">Foto do produto<input type="file" accept="image/jpeg,image/png,image/webp" required onChange={event => { const file = event.target.files?.[0]; if (file && file.size > 5 * 1024 * 1024) { setError("Use uma imagem de até 5 MB."); event.target.value = ""; setPhoto(null); return; } setPhoto(file || null); }} className="market-input mt-2" /><span className="mt-2 block text-xs text-zinc-500">JPG, PNG ou WebP. Até 5 MB.</span></label>{preview && <img src={preview} alt="Prévia da foto do anúncio" className="max-h-60 rounded-xl object-contain" />}<label className="block text-sm">Título<input name="title" required minLength={5} maxLength={100} className="market-input mt-2" placeholder="Nome, marca e modelo do produto" /></label><label className="block text-sm">Descrição<textarea name="description" required minLength={20} maxLength={4000} rows={5} className="market-input mt-2" placeholder="Condição, características, o que acompanha o produto e condições de entrega." /></label><div className="grid gap-5 sm:grid-cols-3"><label className="block text-sm">Categoria<select name="category" className="market-input mt-2">{["PDV", "Ponto", "NFC", "Software", "Outros"].map(item => <option key={item}>{item}</option>)}</select></label><label className="block text-sm">Preço (R$)<input name="price" type="number" required min="1" max="1000000" step="0.01" className="market-input mt-2" /></label><label className="block text-sm">Quantidade<input name="stock" type="number" required min="1" max="99999" step="1" defaultValue="1" className="market-input mt-2" /></label></div><p className="text-xs leading-6 text-zinc-500">O anúncio passará por análise antes de ser publicado. Informe apenas produtos que você está autorizado a comercializar.</p><div className="flex gap-3"><button disabled={busy} className="market-primary">{busy ? "Enviando anúncio..." : "Enviar para análise"}</button><button type="button" disabled={busy} onClick={() => setTab("listings")} className="market-secondary">Cancelar</button></div></form>}
      {seller && tab === "requests" && (requests.length ? <div className="space-y-4">{requests.map(row => <article key={row.id} className="market-panel p-6"><div className="flex flex-wrap justify-between gap-3"><h2 className="font-semibold">Solicitação #{row.id.slice(0, 8).toUpperCase()}</h2><span className="text-xs text-zinc-500">{new Date(row.created_at).toLocaleDateString("pt-BR")}</span></div><p className="mt-3 text-sm text-zinc-400">{row.customer_contact.name} · <a className="text-red-300" href={`mailto:${row.customer_contact.email}`}>{row.customer_contact.email}</a></p><ul className="mt-4 space-y-2 text-sm">{row.items.map(item => <li key={item.id}>{item.quantity} × {item.name}</li>)}</ul>{row.notes && <p className="mt-4 text-sm text-zinc-500">{row.notes}</p>}</article>)}</div> : <div className="market-panel p-10 text-sm text-zinc-400">Quando um cliente solicitar seus produtos, o contato aparecerá aqui.</div>)}
    </>}
  </main>;
}

export default function MarketSeller() { return <AccountGate seller><SellerPanel /></AccountGate>; }
