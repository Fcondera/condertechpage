"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@constants/navigation";
import { useMobileMenu } from "@hooks/index";

const Navbar = () => {
  const { isOpen: isMobileMenuOpen, toggle, close } = useMobileMenu();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      if (currentScrollY <= 24) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        isVisible || isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
        <div className="flex items-center justify-end h-12 sm:h-14 md:h-16 lg:h-18">
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {NAV_LINKS.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-cabinet text-[15px] md:text-[17px] font-semibold tracking-[-0.02em] transition-colors duration-300 text-white hover:text-white/70"
                  role="link"
                  aria-label={`Navegue para ${link.name}`}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-cabinet text-[15px] md:text-[17px] font-semibold tracking-[-0.02em] transition-colors duration-300 text-white hover:text-white/70"
                  role="link"
                  aria-label={`Navegue para ${link.name}`}
                >
                  {link.name}
                </a>
              ),
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={toggle}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            className="md:hidden bg-black/85 backdrop-blur-sm rounded-lg shadow-lg mb-4 overflow-hidden w-full border border-white/15"
            role="navigation"
            aria-label="Mobile Navigation"
          >
            <div className="py-2 sm:py-4">
              {NAV_LINKS.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="font-cabinet block px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold tracking-[-0.02em] text-white hover:bg-white/10 hover:text-white/70 transition-colors"
                    onClick={close}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="font-cabinet block px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold tracking-[-0.02em] text-white hover:bg-white/10 hover:text-white/70 transition-colors"
                    onClick={close}
                  >
                    {link.name}
                  </a>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
