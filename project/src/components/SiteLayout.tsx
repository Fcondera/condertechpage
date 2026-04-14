"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import ErrorBoundary from "@components/ErrorBoundary";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import WhatsAppButton from "@components/WhatsAppButton";

interface SiteLayoutProps {
  children: ReactNode;
}

const HIDDEN_CHROME_ROUTES = new Set(["/orcamento"]);

export default function SiteLayout({ children }: SiteLayoutProps) {
  const pathname = usePathname();
  const hideChrome = pathname ? HIDDEN_CHROME_ROUTES.has(pathname) : false;

  return (
    <ErrorBoundary>
      <div className="font-inter">
        {!hideChrome && <Navbar />}
        {children}
        {!hideChrome && <Footer />}
        {!hideChrome && <WhatsAppButton />}
      </div>
    </ErrorBoundary>
  );
}
