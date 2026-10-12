import { notFound } from "next/navigation";
import { SellerListingDetail } from "@/components/marketplace/MarketDetail";
export const metadata = { title: "Produto | ConderTech Marketplace", robots: { index: false, follow: true } };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) notFound();
  return <SellerListingDetail id={id} />;
}
