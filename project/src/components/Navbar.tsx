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
      className={`fixed top-0 left-0 w-full z-50 bg-white shadow-md transition-transform duration-300 ${
        isVisible || isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
            aria-label="ConderTech Home"
          >
            <img
              src="/image/logo02.png"
              alt="ConderTech Logo"
              className="h-10 sm:h-12 md:h-14 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {NAV_LINKS.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-cabinet text-[15px] md:text-[17px] font-semibold tracking-[-0.02em] transition-colors duration-300 text-gray-900 hover:text-gray-600"
                  style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)" }}
                  role="link"
                  aria-label={`Navegue para ${link.name}`}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-cabinet text-[15px] md:text-[17px] font-semibold tracking-[-0.02em] transition-colors duration-300 text-gray-900 hover:text-gray-600"
                  style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)" }}
                  role="link"
                  aria-label={`Navegue para ${link.name}`}
                >
                  {link.name}
                </a>
              ),
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={toggle}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-900" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden bg-white border-t border-gray-200 shadow-lg mb-4 overflow-hidden w-full"
            role="navigation"
            aria-label="Mobile Navigation"
          >
            <div className="py-2 sm:py-4">
              {NAV_LINKS.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="font-cabinet block px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold tracking-[-0.02em] text-gray-900 hover:bg-gray-50 hover:text-gray-600 transition-colors"
                    onClick={close}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="font-cabinet block px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold tracking-[-0.02em] text-gray-900 hover:bg-gray-50 hover:text-gray-600 transition-colors"
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
