"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLanguage, type Lang } from "@/contexts/LanguageContext";

const FLAGS: { lang: Lang; code: string; label: string }[] = [
  { lang: "pt-BR", code: "br", label: "PT" },
  { lang: "en", code: "us", label: "EN" },
  { lang: "es", code: "es", label: "ES" },
];

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  // Close products dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        productsRef.current &&
        !productsRef.current.contains(e.target as Node)
      ) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { label: t.nav.sobre, href: "/sobre" },
    { label: t.nav.faq, href: "/#faq" },
    { label: t.nav.contato, href: "/#contato" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="ConderTech Home"
          >
            <img
              src="/image/navbar-01.svg"
              alt="ConderTech Logo"
              className="h-12 sm:h-14 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-7">
            {/* Produtos dropdown */}
            <div ref={productsRef} className="relative">
              <button
                onClick={() => setProductsOpen((v) => !v)}
                className="flex items-center gap-1 font-inter text-sm font-medium text-[#252525] transition-colors duration-200 hover:text-[#e22d2e]"
                aria-expanded={productsOpen}
              >
                {t.nav.produtos}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {productsOpen && (
                <div className="absolute top-full left-0 mt-3 w-56 bg-white border border-[#e5e5e5] shadow-lg">
                  {t.nav.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setProductsOpen(false)}
                      className="block px-5 py-3 font-inter text-sm text-[#252525] hover:text-[#e22d2e] hover:bg-[#fafafa] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Other links */}
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-inter text-sm font-medium text-[#252525] transition-colors duration-200 hover:text-[#e22d2e]"
              >
                {link.label}
              </a>
            ))}

            {/* Separator */}
            <span className="w-px h-5 bg-[#e5e5e5]" />

            {/* Language flags */}
            <div className="flex items-center gap-1">
              {FLAGS.map((f) => (
                <button
                  key={f.lang}
                  onClick={() => setLang(f.lang)}
                  title={f.label}
                  className={`flex items-center gap-1.5 px-1.5 py-1 rounded transition-opacity ${
                    lang === f.lang
                      ? "opacity-100"
                      : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <img
                    src={`https://flagcdn.com/w40/${f.code}.png`}
                    alt={f.label}
                    width={22}
                    height={22}
                    className="w-[22px] h-[22px] rounded-full object-cover ring-1 ring-black/10"
                  />
                  <span className="hidden lg:inline font-inter text-xs font-medium text-[#444]">
                    {f.label}
                  </span>
                </button>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://wa.me/5592982054683"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#e22d2e] px-5 py-2.5 rounded-full font-inter text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-[#601311]"
            >
              {t.nav.cta}
            </a>
          </div>

          {/* Mobile: flags + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            {FLAGS.map((f) => (
              <button
                key={f.lang}
                onClick={() => setLang(f.lang)}
                className={`transition-opacity ${
                  lang === f.lang ? "opacity-100" : "opacity-40"
                }`}
                title={f.label}
              >
                <img
                  src={`https://flagcdn.com/w40/${f.code}.png`}
                  alt={f.label}
                  width={22}
                  height={22}
                  className="w-[22px] h-[22px] rounded-full object-cover ring-1 ring-black/10"
                />
              </button>
            ))}
            <button
              className="p-2 ml-1 rounded-full"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-[#090909]" />
              ) : (
                <Menu className="w-5 h-5 text-[#090909]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="md:hidden bg-white border-t border-[#e5e5e5] pb-6"
            role="navigation"
          >
            <div className="py-2 space-y-0">
              {/* Produtos accordion */}
              <div>
                <button
                  onClick={() => setMobileProductsOpen((v) => !v)}
                  className="flex w-full items-center justify-between px-0 py-3 font-inter text-sm font-medium text-[#252525] border-b border-[#e5e5e5]"
                >
                  {t.nav.produtos}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileProductsOpen && (
                  <div className="pl-4 border-b border-[#e5e5e5]">
                    {t.nav.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2.5 font-inter text-sm text-[#555] hover:text-[#e22d2e] transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-0 py-3 font-inter text-sm font-medium text-[#252525] hover:text-[#e22d2e] border-b border-[#e5e5e5] transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-5">
                <a
                  href="https://wa.me/5592982054683"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#e22d2e] px-6 py-3 rounded-full font-inter text-xs font-semibold uppercase tracking-widest text-white"
                >
                  {t.nav.cta}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
