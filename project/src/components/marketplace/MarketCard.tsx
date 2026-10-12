"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import ProductCardImage from "@/components/ProductCardImage";
import { money, useMarket, type Listing } from "./MarketProvider";
import type { MarketProduct } from "@/data/marketplace";

export default function MarketCard({ product, listing }: { product?: MarketProduct; listing?: Listing }) {
  const { favorites, toggleFavorite, add, ready } = useMarket();
  const id = product?.id || listing!.id;
  const name = product?.name || listing!.title;
  const image = product ? `/image/products/${id}.png` : listing!.image_url;
  const seller = product ? "ConderTech" : listing?.marketplace_sellers?.name || "Vendedor parceiro";
  const price = listing?.price_cents ?? null;
  const href = product ? `/marketplace/${id}` : `/marketplace/anuncio/${id}`;
  return <article className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#14151b] transition-colors hover:border-white/25">
    <Link href={href} aria-label={`Conhecer ${name}`} className="block overflow-hidden">
      {product ? <ProductCardImage id={id} /> : <div className="aspect-[3/2] bg-zinc-800">{image && <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />}</div>}
    </Link>
    <button type="button" aria-label={favorites.includes(id) ? `Remover ${name} dos favoritos` : `Favoritar ${name}`} aria-pressed={favorites.includes(id)} onClick={() => toggleFavorite(id)} className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/65 p-2.5 text-white backdrop-blur-sm"><Heart size={17} fill={favorites.includes(id) ? "#e22d2e" : "none"} className={favorites.includes(id) ? "text-red-400" : ""} /></button>
    <div className="flex flex-1 flex-col p-4 sm:p-5">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#ff858a]">{product?.label || listing?.category}</p>
      <h3 className="text-base font-semibold leading-6"><Link href={href} className="hover:text-[#ff777d]">{name}</Link></h3>
      <p className="mb-4 mt-2 line-clamp-2 text-xs leading-5 text-zinc-400">{product?.summary || listing?.description}</p>
      <p className="mt-auto text-lg font-bold">{price === null ? "Sob consulta" : money(price)}</p>
      <p className="mb-4 mt-1 text-xs text-zinc-500">{seller}</p>
      <Link href={href} className="market-primary w-full">Conhecer produto</Link>
      <button onClick={() => add({ id, name, image, price, seller })} disabled={!ready} className="mt-2 rounded-lg border border-red-400/25 bg-red-500/[0.06] px-3 py-2.5 text-xs font-semibold text-red-200 transition-colors hover:bg-red-500/15">Adicionar ao carrinho</button>
    </div>
  </article>;
}
