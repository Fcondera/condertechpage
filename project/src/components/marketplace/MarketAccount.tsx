"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ClipboardList,
  Heart,
  UserRound,
  Store,
  LogOut,
  MessageCircle,
} from "lucide-react";
import { marketProducts, type MarketQuote } from "@/data/marketplace";
import { salesLink } from "@/data/products";
import AccountGate from "./AccountGate";
import MarketCard from "./MarketCard";
import { marketRequest, useMarket, type Listing } from "./MarketProvider";
import MarketProfile from "./MarketProfile";

const statusLabels: Record<string, string> = {
  solicitado: "Solicitação enviada",
  em_atendimento: "Em atendimento",
  respondido: "Respondido",
  cancelado: "Cancelado",
};

function Account() {
  const { user, favorites, logout } = useMarket();
  const router = useRouter();
  const [tab, setTab] = useState("requests");
  const [quotes, setQuotes] = useState<MarketQuote[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    let alive = true;
    marketRequest("quotes")
      .then((data) => {
        if (alive) setQuotes(data.quotes);
      })
      .catch((error) => {
        if (alive) setError(error.message);
      })
      .finally(() => {
        if (alive) setFetching(false);
      });
    marketRequest("listings")
      .then((data) => {
        if (alive) setListings(data.listings);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  if (!user) return null;
  const saved = marketProducts.filter((product) =>
    favorites.includes(product.id),
  );
  const savedListings = listings.filter((product) =>
    favorites.includes(product.id),
  );
  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <p className="text-xs text-zinc-500">Área do cliente</p>
      <h1 className="mt-3 text-3xl font-semibold">
        Olá, {user.name.split(" ")[0] || "bem-vindo"}.
      </h1>
      <p className="mt-3 text-sm text-zinc-400">
        Acompanhe suas solicitações e encontre suas próximas soluções.
      </p>
      {!user.profileComplete || !user.phoneVerified ? (
        <div className="market-panel mt-6 flex flex-wrap items-center justify-between gap-4 border border-amber-300/20 p-5">
          <div>
            <p className="font-semibold">Complete a validação da sua conta</p>
            <p className="mt-2 text-sm text-zinc-400">
              Preencha os dados e confirme o celular para enviar solicitações ou
              vender.
            </p>
          </div>
          <button type="button" onClick={() => setTab("profile")}>
            Completar cadastro
          </button>
        </div>
      ) : null}
      <div className="mt-8 grid gap-7 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="market-panel h-fit p-3">
          <nav aria-label="Sua conta" className="space-y-1">
            {[
              {
                id: "requests",
                label: "Minhas solicitações",
                Icon: ClipboardList,
              },
              { id: "favorites", label: "Favoritos", Icon: Heart },
              { id: "profile", label: "Meus dados", Icon: UserRound },
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setTab(id);
                  setMessage("");
                }}
                aria-current={tab === id ? "page" : undefined}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm ${tab === id ? "bg-red-500/10 text-red-300" : "text-zinc-400 hover:bg-white/5"}`}
              >
                <Icon size={17} />
                {label}
              </button>
            ))}
            <Link
              href="/marketplace/vender"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-zinc-400 hover:bg-white/5"
            >
              <Store size={17} />
              Área do vendedor
            </Link>
            <a
              href={salesLink(
                "Olá! Preciso de ajuda com o marketplace ConderTech.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-zinc-400 hover:bg-white/5"
            >
              <MessageCircle size={17} />
              Falar com suporte
            </a>
            <button
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                try {
                  await logout();
                  router.push("/marketplace");
                } catch {
                  setError("Não foi possível sair. Tente novamente.");
                } finally {
                  setBusy(false);
                }
              }}
              className="flex w-full items-center gap-3 border-t border-white/5 px-4 py-4 text-sm text-zinc-500"
            >
              <LogOut size={17} />
              Sair da conta
            </button>
          </nav>
        </aside>
        <div>
          {error && (
            <p role="alert" className="market-error mb-5">
              {error}
            </p>
          )}
          {message && (
            <p role="status" className="market-success mb-5">
              {message}
            </p>
          )}
          {tab === "requests" && (
            <>
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="market-panel p-5">
                  <p className="text-xs text-zinc-500">Solicitações</p>
                  <p className="mt-3 text-3xl font-semibold">
                    {fetching ? "—" : quotes.length}
                  </p>
                </div>
                <div className="market-panel p-5">
                  <p className="text-xs text-zinc-500">Em andamento</p>
                  <p className="mt-3 text-3xl font-semibold">
                    {fetching
                      ? "—"
                      : quotes.filter((row) =>
                          ["solicitado", "em_atendimento"].includes(row.status),
                        ).length}
                  </p>
                </div>
              </div>
              <h2 className="mb-5 text-xl font-semibold">
                Minhas solicitações
              </h2>
              {fetching ? (
                <p className="text-sm text-zinc-400">Carregando...</p>
              ) : !quotes.length ? (
                <div className="market-panel p-9">
                  <h3 className="font-semibold">
                    Seu próximo projeto começa no catálogo.
                  </h3>
                  <p className="mt-3 text-sm text-zinc-400">
                    Quando você enviar uma solicitação, ela aparecerá aqui.
                  </p>
                  <Link href="/marketplace" className="market-primary mt-6">
                    Explorar produtos
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {quotes.map((quote) => (
                    <article key={quote.id} className="market-panel p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold">
                            Solicitação #{quote.id.slice(0, 8).toUpperCase()}
                          </h3>
                          <p className="mt-1 text-xs text-zinc-500">
                            {new Date(quote.created_at).toLocaleDateString(
                              "pt-BR",
                            )}
                          </p>
                        </div>
                        <span className="rounded-full bg-red-500/10 px-3 py-1.5 text-xs text-red-300">
                          {statusLabels[quote.status] || quote.status}
                        </span>
                      </div>
                      <ul className="mt-4 space-y-2 border-t border-white/5 pt-4 text-sm text-zinc-300">
                        {quote.items.map((item) => (
                          <li key={item.id}>
                            {item.quantity} × {item.name}
                          </li>
                        ))}
                      </ul>
                      {quote.notes && (
                        <p className="mt-4 text-xs leading-5 text-zinc-500">
                          {quote.notes}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
          {tab === "favorites" && (
            <>
              <h2 className="text-xl font-semibold">Seus favoritos</h2>
              <p className="mb-6 mt-2 text-xs text-zinc-500">
                Salvos neste navegador. Anúncios indisponíveis não são exibidos.
              </p>
              {saved.length + savedListings.length ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {saved.map((product) => (
                    <MarketCard key={product.id} product={product} />
                  ))}
                  {savedListings.map((listing) => (
                    <MarketCard key={listing.id} listing={listing} />
                  ))}
                </div>
              ) : (
                <div className="market-panel p-9 text-sm text-zinc-400">
                  Use o coração nos produtos para encontrá-los aqui.
                </div>
              )}
            </>
          )}
          {tab === "profile" && <MarketProfile />}
        </div>
      </div>
    </main>
  );
}

export default function MarketAccount() {
  return (
    <AccountGate>
      <Account />
    </AccountGate>
  );
}
