"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { marketRequest, money, useMarket } from "./MarketProvider";

export default function MarketCart() {
  const { cart, ready, quantity, user, loading, clear } = useMarket();
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [requestId, setRequestId] = useState("");
  const total = cart.reduce(
    (sum, row) => sum + (row.price || 0) * row.quantity,
    0,
  );
  async function submit() {
    setBusy(true);
    setError("");
    const id = requestId || crypto.randomUUID();
    setRequestId(id);
    try {
      const data = await marketRequest("quotes", {
        items: cart.map((row) => ({ id: row.id, quantity: row.quantity })),
        notes,
        requestId: id,
      });
      setSuccess(data.id);
      clear();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Tente novamente.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <Link
        href="/marketplace#catalogo"
        className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white"
      >
        <ArrowLeft size={14} />
        Continuar explorando
      </Link>
      <h1 className="mt-6 text-3xl font-semibold">Seu carrinho</h1>
      <p className="mt-3 text-sm text-zinc-400">
        Reúna os produtos e solicite as condições de compra.
      </p>
      {success ? (
        <div className="market-panel mt-8 p-9">
          <p className="text-xl font-semibold">Solicitação recebida.</p>
          <p className="mt-3 text-sm text-zinc-400">
            Referência {success.slice(0, 8).toUpperCase()}. Acompanhe o
            atendimento na sua conta.
          </p>
          <Link href="/marketplace/conta" className="market-primary mt-6">
            Ver minhas solicitações
          </Link>
        </div>
      ) : !ready ? (
        <p className="py-12 text-zinc-400">Carregando carrinho...</p>
      ) : !cart.length ? (
        <div className="market-panel mt-8 p-12 text-center">
          <ShoppingBag size={36} className="mx-auto text-zinc-600" />
          <h2 className="mt-5 text-xl font-semibold">
            Seu carrinho está vazio.
          </h2>
          <p className="mt-3 text-sm text-zinc-400">
            Encontre a tecnologia que faz sentido para você.
          </p>
          <Link href="/marketplace#catalogo" className="market-primary mt-6">
            Explorar produtos
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="market-panel divide-y divide-white/5">
            {cart.map((row) => (
              <div
                key={row.id}
                className="flex flex-wrap items-center gap-4 p-5"
              >
                <img
                  src={row.image}
                  alt=""
                  className="h-20 w-24 rounded-lg bg-zinc-800 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{row.name}</p>
                  <p className="mt-1 text-xs text-zinc-500">{row.seller}</p>
                  <p className="mt-2 text-sm">
                    {row.price === null ? "Sob consulta" : money(row.price)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled={busy}
                    onClick={() => quantity(row.id, row.quantity - 1)}
                    aria-label={`Diminuir ${row.name}`}
                    className="market-secondary !p-2.5"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="w-7 text-center text-sm">
                    {row.quantity}
                  </span>
                  <button
                    disabled={busy || row.quantity >= 999}
                    onClick={() => quantity(row.id, row.quantity + 1)}
                    aria-label={`Aumentar ${row.name}`}
                    className="market-secondary !p-2.5"
                  >
                    <Plus size={15} />
                  </button>
                  <button
                    disabled={busy}
                    onClick={() => quantity(row.id, 0)}
                    aria-label={`Remover ${row.name}`}
                    className="ml-1 p-2 text-zinc-500 hover:text-red-300"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <aside className="market-panel p-6">
            <h2 className="text-lg font-semibold">Resumo da solicitação</h2>
            <div className="my-6 space-y-3 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Unidades</span>
                <span>{cart.reduce((sum, row) => sum + row.quantity, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Produtos com preço</span>
                <span className="font-semibold">
                  {total ? money(total) : "Sob consulta"}
                </span>
              </div>
              {cart.some((row) => row.price === null) && (
                <p className="text-xs leading-5 text-zinc-500">
                  Itens sob consulta não estão incluídos no valor acima.
                </p>
              )}
              <p className="border-t border-white/10 pt-3 text-xs leading-5 text-zinc-500">
                Frete e condições serão confirmados pelo vendedor. Nenhum
                pagamento será cobrado nesta etapa.
              </p>
            </div>
            <label className="text-xs text-zinc-400">
              Observações
              <textarea
                maxLength={2000}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Cidade de entrega, especificações..."
                rows={3}
                className="market-input mt-2 resize-y"
              />
            </label>
            {error && (
              <p role="alert" className="market-error mt-4">
                {error}
              </p>
            )}
            {user && user.profileComplete && user.phoneVerified ? (
              <button
                disabled={busy}
                onClick={submit}
                className="market-primary mt-5 w-full"
              >
                {busy ? "Enviando..." : "Enviar solicitação"}
              </button>
            ) : user ? (
              <Link
                href="/marketplace/conta"
                className="market-primary mt-5 w-full"
              >
                Completar cadastro e confirmar celular
              </Link>
            ) : (
              <Link
                href="/marketplace/entrar?next=/marketplace/carrinho"
                className="market-primary mt-5 w-full"
              >
                {loading ? "Verificando conta..." : "Continuar com Google"}
              </Link>
            )}
            <p className="mt-3 text-[11px] leading-5 text-zinc-500">
              Ao enviar, seu nome, e-mail e observações serão compartilhados com
              os vendedores dos itens selecionados para atendimento.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
