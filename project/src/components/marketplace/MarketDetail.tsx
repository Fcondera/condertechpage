"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Heart } from "lucide-react";
import ProductCardImage from "@/components/ProductCardImage";
import type { MarketProduct } from "@/data/marketplace";
import { marketRequest, money, useMarket, type Listing } from "./MarketProvider";

function Detail({ product, listing }: { product?: MarketProduct; listing?: Listing }) {
  const { add, ready, favorites, toggleFavorite } = useMarket();
  const id = product?.id || listing!.id;
  const name = product?.name || listing!.title;
  const seller = product ? "ConderTech" : listing?.marketplace_sellers?.name || "Vendedor parceiro";
  const image = product ? `/image/products/${id}.png` : listing!.image_url;
  const price = listing?.price_cents ?? null;
  const details = product && "features" in product ? product.features : [];
  return <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8"><Link href="/marketplace#catalogo" className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white"><ArrowLeft size={14} />Voltar ao catálogo</Link><div className="mt-7 grid items-start gap-9 lg:grid-cols-2"><div><div className="overflow-hidden rounded-2xl border border-white/10">{product ? <ProductCardImage id={id} /> : <img src={image} alt={name} className="aspect-[3/2] w-full bg-zinc-800 object-contain" />}</div>{product && <p className="mt-3 text-xs text-zinc-500">Imagem ilustrativa do produto.</p>}<section className="mt-8"><h2 className="text-lg font-semibold">Sobre o produto</h2><p className="mt-4 whitespace-pre-line text-sm leading-7 text-zinc-400">{product?.description || listing?.description}</p>{details.length > 0 && <ul className="mt-5 space-y-3 text-sm text-zinc-300">{details.map(item => <li key={item} className="flex gap-3"><span className="text-red-400">—</span>{item}</li>)}</ul>}</section></div><aside className="market-panel p-6 sm:p-8"><p className="text-xs font-medium uppercase tracking-wider text-red-300">{product?.category || listing?.category}</p><h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight">{name}</h1><p className="mt-3 text-sm text-zinc-500">Vendido por <span className="text-zinc-300">{seller}</span></p><p className="mt-8 text-3xl font-bold">{price === null ? "Preço sob consulta" : money(price)}</p><p className="mt-3 text-xs leading-6 text-zinc-400">{listing ? `${listing.stock} unidades informadas pelo vendedor. Frete e condições a confirmar.` : "Consulte configurações, planos e disponibilidade para sua operação."}</p><button disabled={!ready} onClick={() => add({ id, name, image, price, seller })} className="market-primary mt-7 w-full !py-4">Adicionar ao carrinho</button><Link href="/marketplace/carrinho" className="market-secondary mt-3 w-full">Ver carrinho</Link><button onClick={() => toggleFavorite(id)} aria-pressed={favorites.includes(id)} className="mt-5 flex w-full items-center justify-center gap-2 text-xs text-zinc-400 hover:text-white"><Heart size={15} fill={favorites.includes(id) ? "#e22d2e" : "none"} />{favorites.includes(id) ? "Remover dos favoritos" : "Salvar nos favoritos"}</button><p className="mt-6 border-t border-white/10 pt-5 text-xs leading-6 text-zinc-500">Envie sua solicitação pelo carrinho. A compra e o pagamento serão combinados no atendimento com o vendedor.</p></aside></div></main>;
}

export default function MarketDetail({ product }: { product: MarketProduct }) { return <Detail product={product} />; }

export function SellerListingDetail({ id }: { id: string }) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => { let alive = true; marketRequest(`listings?id=${encodeURIComponent(id)}`).then(data => { if (alive) setListing(data.listings[0] || null); }).catch(error => { if (alive) setError(error.message); }).finally(() => { if (alive) setLoading(false); }); return () => { alive = false; }; }, [id]);
  if (loading) return <p role="status" className="p-16 text-center text-zinc-400">Carregando produto...</p>;
  if (!listing) return <main className="mx-auto max-w-xl px-5 py-16"><div className="market-panel p-9"><h1 className="text-2xl font-semibold">{error ? "Não foi possível carregar o anúncio." : "Anúncio indisponível."}</h1><p className="mt-4 text-sm text-zinc-400">{error || "Esse produto pode ter sido pausado ou ainda estar em análise."}</p><Link href="/marketplace" className="market-primary mt-6">Voltar ao catálogo</Link></div></main>;
  return <Detail listing={listing} />;
}
