"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguage, type Lang } from "@/contexts/LanguageContext";

const FLAGS: { lang: Lang; code: string; label: string }[] = [
  { lang: "pt-BR", code: "br", label: "PT" },
  { lang: "en", code: "us", label: "EN" },
  { lang: "es", code: "es", label: "ES" },
];

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t.nav.sobre, href: "/sobre" },
    { label: t.nav.faq, href: "/#faq" },
    { label: t.nav.contato, href: "/#contato" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* ─── Desktop: barra branca ─── */}
      <div className="hidden md:block bg-white">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center shrink-0"
              aria-label="ConderTech Home"
            >
              <img
                src="/image/hero-lpg-01.png"
                alt="ConderTech Logo"
                className="h-8 sm:h-9 w-auto"
              />
            </Link>

            {/* Desktop items */}
            <div className="flex items-center gap-7">
              {/* Links */}
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
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full object-cover ring-1 ring-gray-300"
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
          </div>
        </div>
      </div>

      {/* ─── Mobile: pílula flutuante ─── */}
      <div className="md:hidden px-4 pt-3">
        {/* Pílula */}
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-[#e5e5e5]">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="ConderTech Home"
          >
            <img
              src="/image/hero-lpg-01.png"
              alt="ConderTech"
              className="h-7 w-auto"
            />
          </Link>

          {/* Flags — direita */}
          <div className="ml-auto flex items-center gap-1.5">
            {FLAGS.map((f) => (
              <button
                key={f.lang}
                onClick={() => setLang(f.lang)}
                title={f.label}
                className={`transition-opacity ${
                  lang === f.lang
                    ? "opacity-100"
                    : "opacity-35 hover:opacity-65"
                }`}
              >
                <img
                  src={`https://flagcdn.com/w40/${f.code}.png`}
                  alt={f.label}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-gray-200"
                />
              </button>
            ))}
          </div>

          {/* Menu toggle */}
          <button
            className="p-1 ml-1"
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

        {/* Menu expandido */}
        {mobileOpen && (
          <div
            className="mt-2 rounded-2xl bg-[#0d0d0d] border border-white/[0.08] overflow-hidden shadow-2xl"
            role="navigation"
          >
            <div className="px-5 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 font-inter text-sm font-medium text-white hover:text-[#e22d2e] border-b border-white/10 transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-4">
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
