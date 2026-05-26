"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import ErrorBoundary from "@components/ErrorBoundary";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import WhatsAppButton from "@components/WhatsAppButton";
import { LanguageProvider } from "@/contexts/LanguageContext";

interface SiteLayoutProps {
  children: ReactNode;
}

const HIDDEN_CHROME_ROUTES = new Set(["/orcamento", "/ima", "/ecommerce"]);
const HIDDEN_NAVBAR_ONLY_ROUTES = new Set(["/portfolio-lp"]);

export default function SiteLayout({ children }: SiteLayoutProps) {
  const pathname = usePathname();
  const hideChrome = pathname
    ? pathname.startsWith("/ima") || HIDDEN_CHROME_ROUTES.has(pathname)
    : false;
  const hideNavbar =
    hideChrome || (pathname ? HIDDEN_NAVBAR_ONLY_ROUTES.has(pathname) : false);

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <div className="font-inter">
          {!hideNavbar && <Navbar />}
          {children}
          {!hideChrome && <Footer />}
          {!hideChrome && <WhatsAppButton />}
        </div>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
