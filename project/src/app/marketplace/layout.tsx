import type { ReactNode } from "react";
import MarketShell from "@/components/marketplace/MarketShell";
import "./marketplace.css";

export default function MarketplaceLayout({ children }: { children: ReactNode }) {
  return <MarketShell>{children}</MarketShell>;
}
