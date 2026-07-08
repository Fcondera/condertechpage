"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Landmark,
  Monitor,
  Server,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

const services = [
  {
    title: "Segurança",
    description:
      "Temos a melhor equipe de cibersegurança para proteger seus dados e sistemas.",
    href: "/governanca-de-dados",
    icon: ShieldCheck,
  },
  {
    title: "E-commerce",
    description: "Tenha sua loja escalável com a Condertech.",
    href: "/ecommerce",
    icon: ShoppingBag,
  },
  {
    title: "Sistemas Personalizados",
    description: "Desenvolvimento personalizado para sua empresa.",
    href: "/sistemainterno",
    icon: Monitor,
  },
  {
    title: "Infraestrutura",
    description: "Migração, estrutura segura, escalável e preparada para crescimento.",
    href: "/solucoes-de-tecnologia",
    icon: Server,
  },
  {
    title: "Governo",
    description: "Conte com a ConderTech para gerenciar desafios da administração pública.",
    href: "/empresa-de-tecnologia/brasilia",
    icon: Landmark,
  },
];

function getCardStyle(index: number, active: number) {
  const offset = index - active;
  const absOffset = Math.abs(offset);

  if (absOffset > 2) {
    return { opacity: 0, pointerEvents: "none" as const, zIndex: 0 };
  }

  return {
    translateX: offset * 275,
    scale: absOffset === 0 ? 1 : absOffset === 1 ? 0.78 : 0.62,
    rotateY: offset * -22,
    zIndex: services.length - absOffset,
    opacity: absOffset === 0 ? 1 : absOffset === 1 ? 0.72 : 0.38,
    blur: absOffset === 0 ? 0 : absOffset === 1 ? 0 : 2,
    pointerEvents: "auto" as const,
  };
}

const SegmentSolutionsPage = () => {
  const [active, setActive] = useState(1);

  const prev = useCallback(() => {
    setActive((current) => (current - 1 + services.length) % services.length);
  }, []);

  const next = useCallback(() => {
    setActive((current) => (current + 1) % services.length);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#383E42] pt-24 text-white">
      <section className="relative flex min-h-[calc(100vh-6rem)] items-center overflow-hidden py-10 sm:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "180px",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,rgba(255,255,255,0.06),transparent_68%)]" />

        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mb-12 text-center sm:mb-16">
            <h1 className="font-inter text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-6xl">
              Soluções especializadas para o seu{" "}
              <span className="italic text-[#e22d2e]">segmento</span>
            </h1>
          </div>

          <div
            className="relative mx-auto hidden items-center justify-center md:flex"
            style={{ height: 360, perspective: 1200 }}
          >
            {services.map((service, index) => {
              const { translateX, scale, rotateY, zIndex, opacity, blur, pointerEvents } =
                getCardStyle(index, active);
              const Icon = service.icon;
              const isActive = index === active;

              return (
                <motion.div
                  key={service.title}
                  onClick={() => !isActive && setActive(index)}
                  animate={{
                    x: translateX,
                    scale,
                    rotateY,
                    opacity,
                    filter: `blur(${blur}px)`,
                    zIndex,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  style={{
                    position: "absolute",
                    transformStyle: "preserve-3d",
                    pointerEvents,
                    cursor: isActive ? "default" : "pointer",
                  }}
                  className="w-[300px]"
                  whileHover={!isActive ? { scale: (scale ?? 0.78) + 0.04 } : {}}
                >
                  <Link
                    href={service.href}
                    className={`relative block min-h-[255px] rounded-2xl bg-white p-8 text-center transition-shadow duration-300 ${
                      isActive ? "shadow-[0_30px_80px_rgba(0,0,0,0.45)]" : "shadow-lg"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-8 right-8 top-0 h-[2px] rounded-full bg-[#e22d2e]" />
                    )}
                    <span className="mx-auto mb-7 flex h-20 w-20 items-center justify-center text-[#e22d2e]">
                      <Icon className="h-12 w-12" strokeWidth={1.6} />
                    </span>
                    <h2 className="mb-3 font-inter text-xl font-semibold text-[#383E42]">
                      {service.title}
                    </h2>
                    <p className="font-inter text-sm font-light leading-relaxed text-slate-500">
                      {service.description}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="rounded-2xl bg-white p-6 text-center shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
                >
                  <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center text-[#e22d2e]">
                    <Icon className="h-10 w-10" strokeWidth={1.6} />
                  </span>
                  <h2 className="mb-2 font-inter text-lg font-semibold text-[#383E42]">
                    {service.title}
                  </h2>
                  <p className="font-inter text-sm leading-6 text-slate-500">
                    {service.description}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 hidden items-center justify-center gap-8 md:flex">
            <button
              onClick={prev}
              aria-label="Anterior"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all duration-200 hover:border-[#e22d2e] hover:text-[#e22d2e]"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              {services.map((service, index) => (
                <button
                  key={service.title}
                  onClick={() => setActive(index)}
                  aria-label={`Ir para ${service.title}`}
                  className={`rounded-full transition-all duration-300 ${
                    index === active
                      ? "h-2 w-6 bg-[#e22d2e]"
                      : "h-2 w-2 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Próximo"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all duration-200 hover:border-[#e22d2e] hover:text-[#e22d2e]"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SegmentSolutionsPage;
