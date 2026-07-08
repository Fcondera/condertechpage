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
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.7}
    className="w-14 h-14"
  >
    {/* Escudo */}
    <path d="M24 4L40 10V24C40 34.5 32.5 41.5 24 44C15.5 41.5 8 34.5 8 24V10L24 4Z" />
    {/* Corpo do cadeado */}
    <rect x="17.5" y="25" width="13" height="10" rx="2" />
    {/* Arco do cadeado */}
    <path d="M20.5 25V21C20.5 18 27.5 18 27.5 21V25" />
    {/* Buraco da chave */}
    <circle cx="24" cy="29.5" r="1.8" fill="currentColor" stroke="none" />
    <line x1="24" y1="31.3" x2="24" y2="33.5" strokeWidth={2} />
  </svg>
);

const CartIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.7}
    className="w-14 h-14"
  >
    {/* Sacola */}
    <path d="M16 21V17C16 11.477 19.582 7 24 7C28.418 7 32 11.477 32 17V21" />
    <path d="M6 21H42L38.5 41H9.5L6 21Z" />
    {/* Checkmark */}
    <path d="M19 31L22.5 34.5L30 27" strokeWidth={2.2} />
  </svg>
);

const CodeIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.7}
    className="w-14 h-14"
  >
    {/* Monitor */}
    <rect x="4" y="7" width="40" height="28" rx="3" />
    <line x1="4" y1="30" x2="44" y2="30" />
    <line x1="20" y1="42" x2="28" y2="42" />
    <line x1="24" y1="35" x2="24" y2="42" />
    {/* Código */}
    <path d="M16 21L11.5 24L16 27" />
    <path d="M32 21L36.5 24L32 27" />
    <line x1="22" y1="18" x2="26" y2="30" />
  </svg>
);

const ServerIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.7}
    className="w-14 h-14"
  >
    {/* Rack de servidores */}
    <rect x="5" y="7" width="38" height="10" rx="2" />
    <rect x="5" y="21" width="38" height="10" rx="2" />
    <rect x="5" y="35" width="38" height="8" rx="2" />
    {/* LEDs */}
    <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    <circle cx="12" cy="26" r="2" fill="currentColor" stroke="none" />
    <circle cx="12" cy="39" r="2" fill="currentColor" stroke="none" />
    {/* Barras de status */}
    <line x1="20" y1="12" x2="38" y2="12" />
    <line x1="20" y1="26" x2="38" y2="26" />
    <line x1="20" y1="39" x2="31" y2="39" />
  </svg>
);

const GovIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.7}
    className="w-14 h-14"
  >
    {/* Cúpula */}
    <path d="M8 20C8 20 10 12 24 10C38 12 40 20 40 20" />
    {/* Base da cúpula */}
    <line x1="6" y1="20" x2="42" y2="20" />
    {/* Colunas */}
    <line x1="12" y1="20" x2="12" y2="36" />
    <line x1="20" y1="20" x2="20" y2="36" />
    <line x1="28" y1="20" x2="28" y2="36" />
    <line x1="36" y1="20" x2="36" y2="36" />
    {/* Degraus */}
    <line x1="8" y1="36" x2="40" y2="36" />
    <line x1="5" y1="40" x2="43" y2="40" />
    <line x1="4" y1="44" x2="44" y2="44" />
    {/* Pináculo */}
    <line x1="24" y1="6" x2="24" y2="10" />
    <circle cx="24" cy="5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

/* ─── Dados dos serviços ─────────────────────────────────── */
const SERVICES: Service[] = [
  {
    id: 0,
    title: "Segurança",
    description:
      "Temos a melhor equipe de cibersegurança para proteger seus dados e sistemas.",
    icon: <ShieldIcon />,
  },
  {
    id: 1,
    title: "E-commerce",
    description: "Tenha sua loja escalável com a Condertech.",
    icon: <CartIcon />,
  },
  {
    id: 2,
    title: "Sistemas Personalizados",
    description: "Desenvolvimento personalizado para sua empresa.",
    icon: <CodeIcon />,
  },
  {
    id: 3,
    title: "Infraestrutura",
    description:
      "Migração, Estrutura segura, escalável e preparada para crescimento.",
    icon: <ServerIcon />,
  },
  {
    id: 4,
    title: "Governo",
    description:
      "Conte com a condertech para gerenciar desafios da administração pública.",
    icon: <GovIcon />,
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
          <h2 className="font-inter text-3xl font-medium text-white sm:text-4xl lg:text-5xl">
            Soluções especializadas para o seu{" "}
            <span className="italic text-[#e22d2e]">segmento</span>
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

                  {/* Ícone centralizado */}
                  <div className="mb-6 mx-auto flex h-20 w-20 items-center justify-center text-[#e22d2e]">
                    {service.icon}
                  </div>

                  {/* Título centralizado */}
                  <h3 className="mb-3 font-inter text-xl font-semibold text-[#383E42] text-center">
                    {service.title}
                  </h3>

                  {/* Descrição centralizada */}
                  <p className="font-inter text-sm font-light leading-relaxed text-slate-500 text-center">
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
