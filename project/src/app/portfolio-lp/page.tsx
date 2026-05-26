"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Award,
  CheckCircle2,
  Clock,
  ExternalLink,
  Star,
  Target,
  Users,
} from "lucide-react";

/* ─── Types ───────────────────────────────────────────────────────────────── */
interface Project {
  id: number;
  name: string;
  category: string;
  description: string;
  accentColor: string;
  image: string;
  link: string;
}

interface Testimonial {
  id: number;
  text: string;
  name: string;
  avatar: string;
}

interface Feature {
  Icon: LucideIcon;
  label: string;
}

/* ─── PromoBanner ────────────────────────────────────────────────────────── */
const PROMO_ITEMS: string[] = [
  "Site completo por $97",
  "Hospedagem inclusa",
  "Oferta até 18 de julho",
];

function PromoBanner() {
  const track = Array.from({ length: 8 }, () => PROMO_ITEMS).flat();

  return (
    <>
      <style>{`
        @keyframes ticker-ltr {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .promo-track {
          animation: ticker-ltr 38s linear infinite;
          will-change: transform;
        }
        .promo-track:hover { animation-play-state: paused; }

        .promo-item {
          transition: color 0.25s ease;
          color: rgba(255,255,255,0.88);
        }
        .promo-item:hover { color: rgba(255,255,255,1); }

        .promo-dot {
          display: inline-block;
          width: 3px;
          height: 3px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.25);
          margin: 0 28px;
          flex-shrink: 0;
        }

        .promo-highlight {
          color: #e22d2e;
          font-weight: 700;
        }
      `}</style>

      {/* Barra */}
      <div
        className="fixed top-0 left-0 w-full z-50 overflow-hidden flex items-center"
        style={{
          height: 36,
          background:
            "linear-gradient(90deg, #0077a8 0%, #0096c7 50%, #0077a8 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {/* Fade lateral esquerdo */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-20 z-10"
          style={{ background: "linear-gradient(90deg, #0077a8, transparent)" }}
        />
        {/* Fade lateral direito */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-20 z-10"
          style={{
            background: "linear-gradient(270deg, #0077a8, transparent)",
          }}
        />

        {/* Track único */}
        <div className="promo-track flex whitespace-nowrap items-center">
          {track.map((text, i) => {
            const parts = text.split(/(\$97|18 de julho)/g);
            return (
              <span key={i} className="inline-flex items-center">
                <span className="promo-item font-inter text-[12px] tracking-wide">
                  {parts.map((part, j) =>
                    part === "$97" || part === "18 de julho" ? (
                      <span key={j} className="promo-highlight">
                        {part}
                      </span>
                    ) : (
                      part
                    ),
                  )}
                </span>
                <span className="promo-dot" />
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ─── Grain SVG (mesmo da landing principal) ─────────────────────────────── */
const GRAIN_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

/* ─── Dados ───────────────────────────────────────────────────────────────── */
const FEATURES: Feature[] = [
  { Icon: Users, label: "Equipe Especializada" },
  { Icon: Target, label: "Foco em Resultados" },
  { Icon: Award, label: "Compromisso com Qualidade" },
  { Icon: Clock, label: "Entrega no Prazo" },
];

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Clínica Vitalis",
    category: "Institucional",
    description:
      "Landing page institucional para clínica médica com agendamento online.",
    accentColor: "#0284c7",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    link: "#",
  },
  {
    id: 2,
    name: "Power Gym",
    category: "Serviços",
    description:
      "Landing page para academia com foco em conversão de novos alunos.",
    accentColor: "#f97316",
    image:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80",
    link: "#",
  },
  {
    id: 3,
    name: "Agro Smart",
    category: "Produto",
    description:
      "Landing page de produto para plataforma tecnológica do agronegócio.",
    accentColor: "#16a34a",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
    link: "#",
  },
  {
    id: 4,
    name: "Flow Gestão",
    category: "SaaS",
    description: "Landing page de software SaaS com foco em geração de leads.",
    accentColor: "#7c3aed",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    link: "#",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    text: "Melhor decisão que tomamos. A landing page ficou bonita, rápida e realmente representa a nossa marca.",
    name: "Beatriz Rocha",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 2,
    text: "Comunicação clara e prazos cumpridos. Raro encontrar uma empresa de tecnologia tão organizada.",
    name: "Diego Martins",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 3,
    text: "Profissionalismo, qualidade técnica e visão estratégica. Parceiros de longo prazo.",
    name: "Ana Beatriz Costa",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 4,
    text: "O site ficou moderno, responsivo e muito melhor do que imaginávamos. Superaram todas as expectativas!",
    name: "Rafael Almeida",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
  },
];

/* ─── MonitorMockup ───────────────────────────────────────────────────────── */
function MonitorMockup({ project }: { project: Project }) {
  return (
    <div className="flex flex-col items-center select-none w-full">
      {/* Tela + moldura */}
      <div className="w-full bg-[#1c1c1e] rounded-xl p-2 shadow-[0_16px_48px_rgba(0,0,0,0.3)] border border-[#2c2c2e]">
        {/* Borda superior com câmera */}
        <div className="flex justify-center pt-0.5 pb-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#3a3a3c]" />
        </div>

        {/* Screenshot real dentro da tela */}
        <div
          className="overflow-hidden rounded-[3px]"
          style={{ aspectRatio: "16/10" }}
        >
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        </div>
      </div>

      {/* Haste */}
      <div className="w-4 sm:w-6 h-2 sm:h-4 bg-[#2c2c2e]" />
      {/* Base */}
      <div className="h-1 sm:h-1.5 w-16 sm:w-24 rounded-full bg-[#2c2c2e]" />
    </div>
  );
}

/* ─── ProjectCard ─────────────────────────────────────────────────────────── */
function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-2xl border border-[#e8e8e8] p-3 sm:p-5 cursor-pointer
                 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:border-[#e22d2e]/25
                 transition-all duration-300"
    >
      {/* Linha vermelha no topo — hover */}
      <div className="absolute top-0 left-6 right-6 h-[2px] rounded-full bg-[#e22d2e] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      {/* Monitor */}
      <MonitorMockup project={project} />

      {/* Info */}
      <div className="mt-3 sm:mt-5 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-inter text-[13px] sm:text-[15px] font-semibold text-[#383E42] mb-0.5 sm:mb-1 leading-snug">
            {project.name}
          </h3>
          <p className="hidden sm:block font-inter text-sm font-light text-slate-500 leading-relaxed">
            {project.description}
          </p>
        </div>
        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 mt-0.5 sm:mt-1 text-slate-300 group-hover:text-[#e22d2e] transition-colors duration-200" />
      </div>
    </motion.article>
  );
}

/* ─── TestimonialCard ─────────────────────────────────────────────────────── */
function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-white rounded-2xl p-6 shadow-sm flex flex-col"
    >
      {/* Estrelas + Google */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#FBBC04] text-[#FBBC04]" />
          ))}
        </div>
        {/* Google "G" SVG */}
        <svg viewBox="0 0 24 24" className="w-5 h-5" aria-label="Google">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
      </div>

      {/* Texto */}
      <p className="font-inter text-sm font-light text-slate-600 leading-relaxed italic flex-1 mb-5">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Autor */}
      <div className="flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-9 h-9 rounded-full object-cover shrink-0"
          loading="lazy"
        />
        <div>
          <p className="font-inter text-sm font-semibold text-[#383E42] leading-none mb-0.5">
            {testimonial.name}
          </p>
          <p className="font-inter text-xs text-slate-400">Via Google</p>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Página principal ────────────────────────────────────────────────────── */
export default function LandingPagesPortfolioPage() {
  return (
    <>
      <PromoBanner />
      <main className="font-inter pt-10">
        {/* ══ 1. HERO / SOBRE NÓS ══════════════════════════════════════════════ */}
        <section className="bg-white pt-16 pb-20 sm:pb-28 lg:pt-20">
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20 lg:items-center">
              {/* Coluna esquerda */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55 }}
              >
                <p className="mb-4 font-inter text-xs font-semibold uppercase tracking-widest text-[#e22d2e]">
                  Sobre Nós
                </p>

                <h1 className="mb-6 font-inter text-[2.2rem] font-medium leading-tight text-[#383E42] sm:text-[2.8rem] lg:text-[3.2rem]">
                  Somos uma equipe{" "}
                  <span className="italic text-[#e22d2e]">comprometida</span>{" "}
                  com resultados reais.
                </h1>

                <p className="mb-10 font-inter text-base font-light leading-relaxed text-slate-500 sm:text-[1.05rem]">
                  Cada projeto que entregamos é fruto de planejamento,
                  estratégia e atenção aos detalhes. Do primeiro briefing ao
                  lançamento, trabalhamos ao seu lado para transformar ideias em
                  experiências digitais que geram impacto e impulsionam
                  negócios.
                </p>

                {/* 4 pontos */}
                <div className="grid grid-cols-2 gap-4">
                  {FEATURES.map(({ Icon, label }) => (
                    <div key={label} className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0 text-[#e22d2e]" />
                      <span className="font-inter text-sm font-medium text-[#383E42]">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Coluna direita — imagem + card flutuante */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=75"
                    alt="Equipe ConderTech em operação"
                    className="w-full h-[420px] object-cover"
                  />
                  {/* Overlay gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/50 to-transparent" />
                </div>

                {/* Card flutuante */}
                <div className="absolute bottom-6 left-5 right-5 rounded-xl bg-white/95 backdrop-blur-sm p-5 shadow-2xl border border-white/60">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e22d2e]">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <p className="font-inter text-sm font-light text-slate-600 leading-relaxed">
                      Nosso time está pronto para entender seus desafios e
                      entregar soluções que fazem a diferença.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ 2. PROJETOS ══════════════════════════════════════════════════════ */}
        <section className="bg-[#f7f7f7] py-20 sm:py-28">
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 font-inter text-3xl font-medium text-[#383E42] sm:text-4xl lg:text-5xl">
                Projetos de{" "}
                <span className="italic text-[#e22d2e]">Landing Pages</span>
              </h2>
              <p className="font-inter text-base font-light text-slate-500">
                Veja alguns dos sites que nossa equipe desenvolveu para nossos
                clientes.
              </p>
            </motion.div>

            {/* Grid de cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 xl:grid-cols-4">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* CTA central */}
            <div className="mt-12 text-center">
              <button className="inline-flex items-center gap-2 rounded-full border border-[#383E42] px-8 py-3.5 font-inter text-sm font-semibold uppercase tracking-widest text-[#383E42] transition-all duration-200 hover:bg-[#383E42] hover:text-white">
                Ver todos os projetos
              </button>
            </div>
          </div>
        </section>

        {/* ══ 3. DEPOIMENTOS ═══════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-[#383E42] py-20 sm:py-28">
          {/* Grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: GRAIN_BG,
              backgroundRepeat: "repeat",
              backgroundSize: "180px",
            }}
          />
          {/* Glow radial */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(255,255,255,0.05),transparent)]" />

          <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <p className="mb-4 font-inter text-xs font-semibold uppercase tracking-widest text-[#e22d2e]">
                Depoimentos
              </p>
              <h2 className="mb-4 font-inter text-3xl font-medium text-white sm:text-4xl lg:text-5xl">
                O que dizem{" "}
                <span className="italic text-[#e22d2e]">sobre nós.</span>
              </h2>
              <p className="font-inter text-base font-light text-white/60">
                Avaliações e percepções de clientes sobre nossos projetos.
              </p>
            </motion.div>

            {/* Carrossel mobile / grid desktop */}
            <div
              className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory
                         lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:pb-0
                         -mx-6 sm:-mx-8 lg:mx-0 px-6 sm:px-8 lg:px-0"
              style={{ scrollbarWidth: "none" } as React.CSSProperties}
            >
              {TESTIMONIALS.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="snap-start shrink-0 w-[82vw] sm:w-[44vw] lg:w-auto"
                >
                  <TestimonialCard testimonial={testimonial} index={index} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
