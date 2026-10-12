import MarketAuth from "@/components/marketplace/MarketAuth";
export const metadata = { title: "Entrar | ConderTech Marketplace", robots: { index: false, follow: false } };
export default function Page() { return <MarketAuth mode="login" />; }
