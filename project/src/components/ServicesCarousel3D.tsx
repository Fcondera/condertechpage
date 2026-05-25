"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

/* ─── Tipos ─────────────────────────────────────────────── */
interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

/* ─── Ícones SVG inline ──────────────────────────────────── */
const ShieldIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-10 h-10"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
  </svg>
);

const CartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-10 h-10"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
    />
    <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 10a4 4 0 01-8 0"
    />
  </svg>
);

const CodeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-10 h-10"
  >
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      points="16 18 22 12 16 6"
    />
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      points="8 6 2 12 8 18"
    />
    <line x1="12" y1="2" x2="12" y2="22" strokeLinecap="round" />
  </svg>
);

const ServerIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-10 h-10"
  >
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <line
      x1="6"
      y1="6"
      x2="6.01"
      y2="6"
      strokeWidth={2.5}
      strokeLinecap="round"
    />
    <line
      x1="6"
      y1="18"
      x2="6.01"
      y2="18"
      strokeWidth={2.5}
      strokeLinecap="round"
    />
  </svg>
);

/* ─── Dados dos serviços ─────────────────────────────────── */
const SERVICES: Service[] = [
  {
    id: 0,
    title: "Segurança",
    description:
      "Soluções pensadas para proteger dados, acessos e operações críticas.",
    icon: <ShieldIcon />,
  },
  {
    id: 1,
    title: "E-commerce",
    description:
      "Lojas virtuais modernas, rápidas e preparadas para vender mais.",
    icon: <CartIcon />,
  },
  {
    id: 2,
    title: "Sistemas Personalizados",
    description:
      "Desenvolvimento sob medida para processos específicos da empresa.",
    icon: <CodeIcon />,
  },
  {
    id: 3,
    title: "Infraestrutura",
    description:
      "Estrutura digital segura, escalável e preparada para crescimento.",
    icon: <ServerIcon />,
  },
];

/* ─── Função de posicionamento 3D ───────────────────────── */
function getCardStyle(index: number, active: number, total: number) {
  const offset = index - active;
  const absOffset = Math.abs(offset);

  if (absOffset > 2) {
    return { opacity: 0, pointerEvents: "none" as const, zIndex: 0 };
  }

  const translateX = offset * 260;
  const scale = absOffset === 0 ? 1 : absOffset === 1 ? 0.78 : 0.6;
  const rotateY = offset * -22;
  const zIndex = total - absOffset;
  const opacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.65 : 0.35;
  const blur = absOffset === 0 ? 0 : absOffset === 1 ? 0 : 2;

  return { translateX, scale, rotateY, zIndex, opacity, blur };
}

/* ─── Componente principal ───────────────────────────────── */
const ServicesCarousel3D = () => {
  const [active, setActive] = useState(1);

  const prev = useCallback(
    () => setActive((a) => (a - 1 + SERVICES.length) % SERVICES.length),
    [],
  );
  const next = useCallback(
    () => setActive((a) => (a + 1) % SERVICES.length),
    [],
  );

  return (
    <section className="relative overflow-hidden bg-[#383E42] py-24 sm:py-32">
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px",
        }}
      />

      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(255,255,255,0.05),transparent)]" />

      {/* Conteúdo */}
      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 font-inter text-xs font-semibold uppercase tracking-[0.3em] text-[#e22d2e]">
            O que fazemos
          </p>
          <h2 className="font-inter text-3xl font-medium text-white sm:text-4xl lg:text-5xl">
            Quais são nossos{" "}
            <span className="italic text-[#e22d2e]">serviços?</span>
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="relative mx-auto flex items-center justify-center"
          style={{ height: 380, perspective: 1200 }}
        >
          {SERVICES.map((service, index) => {
            const { translateX, scale, rotateY, zIndex, opacity, blur } =
              getCardStyle(index, active, SERVICES.length);
            const isActive = index === active;

            return (
              <motion.div
                key={service.id}
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
                  cursor: isActive ? "default" : "pointer",
                }}
                className="w-[260px] sm:w-[300px]"
                whileHover={!isActive ? { scale: (scale ?? 0.78) + 0.04 } : {}}
              >
                <div
                  className={`relative rounded-2xl bg-white p-8 transition-shadow duration-300 ${
                    isActive
                      ? "shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
                      : "shadow-lg"
                  }`}
                >
                  {/* Linha decorativa topo */}
                  {isActive && (
                    <div className="absolute top-0 left-8 right-8 h-[2px] rounded-full bg-[#e22d2e]" />
                  )}

                  {/* Ícone */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-[#e22d2e]/10 text-[#e22d2e]">
                    {service.icon}
                  </div>

                  {/* Número */}
                  <span className="mb-2 block font-inter text-xs font-semibold uppercase tracking-[0.25em] text-[#e22d2e]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Título */}
                  <h3 className="mb-3 font-inter text-xl font-semibold text-[#383E42]">
                    {service.title}
                  </h3>

                  {/* Descrição */}
                  <p className="font-inter text-sm font-light leading-relaxed text-slate-500">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navegação */}
        <div className="mt-12 flex items-center justify-center gap-8">
          {/* Seta esquerda */}
          <button
            onClick={prev}
            aria-label="Anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-200 hover:border-[#e22d2e] hover:text-[#e22d2e]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-4 h-4"
            >
              <polyline
                strokeLinecap="round"
                strokeLinejoin="round"
                points="15 18 9 12 15 6"
              />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {SERVICES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Ir para serviço ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-6 h-2 bg-[#e22d2e]"
                    : "w-2 h-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Seta direita */}
          <button
            onClick={next}
            aria-label="Próximo"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-200 hover:border-[#e22d2e] hover:text-[#e22d2e]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-4 h-4"
            >
              <polyline
                strokeLinecap="round"
                strokeLinejoin="round"
                points="9 18 15 12 9 6"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel3D;
