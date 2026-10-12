"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowUpRight, Search, ArrowRight } from "lucide-react";
import {
  marketCategories,
  marketProducts,
  matchesCategory,
} from "@/data/marketplace";
import MarketCard from "@/components/marketplace/MarketCard";
import {
  marketRequest,
  type Listing,
} from "@/components/marketplace/MarketProvider";

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

function Storefront() {
  const params = useSearchParams();
  const router = useRouter();
  const query = params.get("q") || "";
  const category = params.get("categoria") || "Todos";
  const [input, setInput] = useState(query);
  const [sort, setSort] = useState("destaques");
  const [listings, setListings] = useState<Listing[]>([]);
  const [listingState, setListingState] = useState("loading");
  useEffect(() => {
    setInput(query);
  }, [query]);
  useEffect(() => {
    let alive = true;
    marketRequest("listings")
      .then((data) => {
        if (alive) {
          setListings(data.listings);
          setListingState("ready");
        }
      })
      .catch(() => {
        if (alive) setListingState("error");
      });
    return () => {
      alive = false;
    };
  }, []);
  const products = marketProducts.filter(
    (product) =>
      matchesCategory(product, category) &&
      normalize(`${product.name} ${product.summary} ConderTech`).includes(
        normalize(query),
      ),
  );
  const vendorProducts = listings.filter(
    (item) =>
      (category === "Todos" || category === item.category) &&
      normalize(
        `${item.title} ${item.description} ${item.marketplace_sellers?.name || ""}`,
      ).includes(normalize(query)),
  );
  const sorted = [...vendorProducts].sort((a, b) =>
    sort === "menor"
      ? a.price_cents - b.price_cents
      : sort === "maior"
        ? b.price_cents - a.price_cents
        : b.created_at.localeCompare(a.created_at),
  );
  function filter(value: string) {
    router.push(
      `/marketplace?categoria=${encodeURIComponent(value)}${query ? `&q=${encodeURIComponent(query)}` : ""}#catalogo`,
    );
  }
  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/[0.04]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(226,45,46,0.13),transparent_65%)]"
        />
        <div className="relative mx-auto max-w-4xl px-5 pb-14 pt-14 text-center sm:px-8 sm:pb-20 sm:pt-20">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-red-300">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e22d2e]" />
            Tecnologia para o seu negócio
          </p>
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl lg:text-[68px]">
            O próximo passo começa
            <br />
            <span className="bg-gradient-to-r from-[#ff999d] via-[#f0444c] to-[#df252f] bg-clip-text text-transparent">
              com a tecnologia certa.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
            Equipamentos, sistemas e soluções da ConderTech e de vendedores
            parceiros. Tudo em um só lugar.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              router.push(
                `/marketplace?q=${encodeURIComponent(input)}#catalogo`,
              );
            }}
            className="mx-auto mt-8 flex max-w-xl items-center gap-3 rounded-2xl border border-white/15 bg-[#14151b] p-2 pl-4 shadow-xl"
          >
            <Search
              size={19}
              className="shrink-0 text-zinc-500"
              aria-hidden="true"
            />
            <label htmlFor="hero-search" className="sr-only">
              O que você procura?
            </label>
            <input
              id="hero-search"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="O que você procura?"
              className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-zinc-500"
            />
            <button className="market-primary">Buscar</button>
          </form>
          <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-zinc-500">
            <span>Explore por categoria</span>
            <button onClick={() => filter("PDV")} className="hover:text-white">
              PDV
            </button>
            <button
              onClick={() => filter("Software")}
              className="hover:text-white"
            >
              Sistemas
            </button>
            <button
              onClick={() => filter("Ponto")}
              className="hover:text-white"
            >
              Ponto
            </button>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <section className="py-9" aria-labelledby="categories-title">
          <div className="mb-5 flex items-center justify-between">
            <h2
              id="categories-title"
              className="text-xl font-semibold tracking-tight"
            >
              Explore as categorias
            </h2>
            <Link
              href="/marketplace/vender"
              className="hidden items-center gap-1 text-xs text-zinc-400 hover:text-white sm:flex"
            >
              Anuncie na plataforma <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {marketCategories
              .filter((item) => item.id !== "Todos")
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => filter(item.id)}
                  aria-pressed={category === item.id}
                  className={`group flex items-center gap-3 overflow-hidden rounded-xl border bg-[#14151b] pr-3 text-left transition-colors hover:border-red-400/60 ${category === item.id ? "border-red-400/70" : "border-white/10"}`}
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden">
                    <Image
                      src={`/image/products/${item.image}.png`}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                  <span className="text-xs font-semibold leading-5 sm:text-sm">
                    {item.name}
                  </span>
                </button>
              ))}
          </div>
        </section>
        <section
          id="catalogo"
          className="scroll-mt-40 pt-4"
          aria-labelledby="catalog-title"
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2
                id="catalog-title"
                className="text-2xl font-semibold tracking-tight"
              >
                {query
                  ? `Resultados para “${query}”`
                  : category === "Todos"
                    ? "Encontre sua próxima solução"
                    : marketCategories.find((item) => item.id === category)
                        ?.name || category}
              </h2>
              <p className="mt-2 text-xs text-zinc-500">
                {products.length + sorted.length} produtos encontrados
              </p>
            </div>
            <label className="flex items-center gap-2 text-xs text-zinc-400">
              Ordenar anúncios parceiros
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="rounded-lg border border-white/10 bg-[#14151b] px-3 py-2 text-zinc-200"
              >
                <option value="destaques">Mais recentes</option>
                <option value="menor">Menor preço</option>
                <option value="maior">Maior preço</option>
              </select>
            </label>
          </div>
          <div className="mb-6 flex flex-wrap gap-2">
            {[...marketCategories, { id: "Outros", name: "Outros" }].map(
              (item) => (
                <button
                  key={item.id}
                  onClick={() => filter(item.id)}
                  aria-pressed={category === item.id}
                  className={`rounded-full border px-4 py-2 text-xs font-medium ${category === item.id ? "border-[#e22d2e] bg-[#e22d2e] text-white" : "border-white/10 text-zinc-400 hover:text-white"}`}
                >
                  {item.name}
                </button>
              ),
            )}
          </div>
          {products.length + sorted.length === 0 ? (
            <div className="market-panel p-12 text-center">
              <p className="text-zinc-400">
                Nenhum produto encontrado com esses filtros.
              </p>
              <Link
                href="/marketplace#catalogo"
                className="market-secondary mt-5"
              >
                Limpar filtros
              </Link>
            </div>
          ) : (
            <>
              {sorted.length > 0 && (
                <div className="mb-6 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4">
                  {sorted.map((listing) => (
                    <MarketCard key={listing.id} listing={listing} />
                  ))}
                </div>
              )}
              {products.length > 0 && (
                <>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-xs font-medium text-zinc-400">
                      Seleção ConderTech
                    </span>
                    <span className="h-px flex-1 bg-white/5" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                      <MarketCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
          {listingState === "loading" && (
            <p role="status" className="mt-5 text-xs text-zinc-500">
              Carregando anúncios de parceiros...
            </p>
          )}
          {listingState === "error" && (
            <p role="status" className="mt-5 text-xs text-zinc-400">
              Os anúncios de parceiros estão temporariamente indisponíveis. A
              seleção ConderTech continua disponível.
            </p>
          )}
          <p className="mt-5 text-[11px] text-zinc-500">
            Imagens ConderTech ilustrativas. Valores e condições dos itens sob
            consulta são confirmados no orçamento.
          </p>
        </section>
        <section className="mt-14 flex flex-col justify-between gap-6 rounded-2xl border border-red-400/15 bg-gradient-to-r from-[#261317] to-[#131419] p-7 sm:flex-row sm:items-center sm:p-9">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-300">
              Para quem vende tecnologia
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Sua loja também pode estar aqui.
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              Crie sua conta, cadastre sua loja e envie seu primeiro anúncio.
            </p>
          </div>
          <Link
            href="/marketplace/vender"
            className="market-primary shrink-0 self-start sm:self-center"
          >
            Começar a vender <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </main>
  );
}

export default function Marketplace() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-zinc-400">
          Carregando catálogo...
        </div>
      }
    >
      <Storefront />
    </Suspense>
  );
}
