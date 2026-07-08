"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

/* ─── Tipos ─────────────────────────────────────────────── */
interface CaseCard {
  id: number;
  tag: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  image: string;
}

/* ─── Dados dos cases ────────────────────────────────────── */
const CASES: CaseCard[] = [
  {
    id: 0,
    tag: "Agronegócio",
    title: "Plataforma Agro",
    description:
      "Rastreabilidade de safra, controle de insumos por talhão e integração com bolsa de commodities em tempo real.",
    metric: "40%",
    metricLabel: "redução de perdas operacionais",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=70",
  },
  {
    id: 1,
    tag: "Gestão Empresarial",
    title: "ERP Integrado",
    description:
      "Sistema com módulos de financeiro, RH, compras e estoque unificados, com relatórios gerenciais automatizados.",
    metric: "3×",
    metricLabel: "ganho de produtividade",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=70",
  },
  {
    id: 2,
    tag: "IA Personalizada",
    title: "LLM/TAG",
    description:
      "Modelos de linguagem personalizados para tarefas específicas, como atendimento ao cliente, análise de dados e geração de conteúdo.",
    metric: "92%",
    metricLabel: "de precisão nos modelos",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=70",
  },
  {
    id: 3,
    tag: "Comércio Digital",
    title: "E-commerce",
    description:
      "Plataforma de vendas online com integração de pagamentos, gestão de estoque e análise de comportamento do consumidor.",
    metric: "R$ 2M+",
    metricLabel: "em transações processadas",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=70",
  },
  {
    id: 4,
    tag: "Análise AI",
    title: "Dashboard Gerencial",
    description:
      "Central de KPIs com visualizações dinâmicas, alertas inteligentes e exportação de relatórios para diretoria.",
    metric: "120+",
    metricLabel: "indicadores monitorados",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=70",
  },
  {
    id: 5,
    tag: "Processos",
    title: "Automação",
    description:
      "Automatização de fluxos de trabalho repetitivos, integração entre sistemas e redução de intervenção manual em processos críticos.",
    metric: "80%",
    metricLabel: "de tarefas automatizadas",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=70",
  },
];

/* ─── Posicionamento 3D ──────────────────────────────────── */
function getCardStyle(index: number, active: number, total: number) {
  const offset = index - active;
  const absOffset = Math.abs(offset);

  if (absOffset > 2)
    return { opacity: 0, pointerEvents: "none" as const, zIndex: 0 };

  const translateX = offset * 270;
  const scale = absOffset === 0 ? 1 : absOffset === 1 ? 0.78 : 0.6;
  const rotateY = offset * -22;
  const zIndex = total - absOffset;
  const opacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.65 : 0.35;
  const blur = absOffset === 0 ? 0 : absOffset === 1 ? 0 : 2;

  return { translateX, scale, rotateY, zIndex, opacity, blur };
}

/* ─── Componente ─────────────────────────────────────────── */
const IndustriesSection = () => {
  const [active, setActive] = useState(2);

  const prev = useCallback(
    () => setActive((a) => (a - 1 + CASES.length) % CASES.length),
    [],
  );
  const next = useCallback(() => setActive((a) => (a + 1) % CASES.length), []);

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
            Cases e <span className="italic text-[#e22d2e]">operações</span>
          </h2>
          <p className="mt-4 font-inter text-base font-light text-white/50">
            Soluções entregues em diferentes setores da economia
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative mx-auto flex items-center justify-center"
          style={{ height: 500, perspective: 1200 }}
        >
          {CASES.map((item, index) => {
            const { translateX, scale, rotateY, zIndex, opacity, blur } =
              getCardStyle(index, active, CASES.length);
            const isActive = index === active;

            return (
              <motion.div
                key={item.id}
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
                className="w-[270px] sm:w-[310px]"
                whileHover={!isActive ? { scale: (scale ?? 0.78) + 0.04 } : {}}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl bg-white transition-shadow duration-300 ${
                    isActive
                      ? "shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
                      : "shadow-lg"
                  }`}
                >
                  {/* Linha decorativa topo */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#e22d2e] z-10" />
                  )}

                  {/* Imagem do sistema */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Tag sobre a imagem */}
                    <span className="absolute bottom-3 left-4 inline-block rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 font-inter text-[10px] font-semibold uppercase tracking-widest text-white">
                      {item.tag}
                    </span>
                  </div>

                  {/* Conteúdo */}
                  <div className="px-6 py-5">
                    {/* Título */}
                    <h3 className="mb-2 font-inter text-lg font-semibold text-[#383E42]">
                      {item.title}
                    </h3>

                    {/* Descrição */}
                    <p className="mb-4 font-inter text-sm font-light leading-relaxed text-slate-500">
                      {item.description}
                    </p>

                    {/* Métrica */}
                    <div className="border-t border-slate-100 pt-4 flex items-baseline gap-2">
                      <span className="font-inter text-2xl font-semibold text-[#e22d2e]">
                        {item.metric}
                      </span>
                      <span className="font-inter text-xs font-light text-slate-400">
                        {item.metricLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navegação */}
        <div className="mt-14 flex items-center justify-center gap-8">
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

          <div className="flex items-center gap-2">
            {CASES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Ir para case ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-6 h-2 bg-[#e22d2e]"
                    : "w-2 h-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

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

export default IndustriesSection;
