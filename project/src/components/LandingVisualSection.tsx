"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGsapReveal } from "@hooks/useGsapReveal";

const SLIDE_DURATION = 4500;

const showcases = [
  {
    title: "Seguranca operacional",
    description:
      "Ambientes digitais com controle, rastreabilidade e protecao para dados, acessos e processos criticos.",
    image: "/image/lp-02.jpeg",
    href: "/governanca-de-dados",
  },
  {
    title: "Crescimento com inteligencia",
    description:
      "Indicadores, automacoes e IA aplicada para transformar dados em decisoes mais rapidas e previsiveis.",
    image: "/image/lp-03.jpeg",
    href: "/solucoes-de-tecnologia",
  },
  {
    title: "Times e sistemas conectados",
    description:
      "Desenvolvimento sob medida para organizar operacoes, integrar equipes e reduzir gargalos do dia a dia.",
    image: "/image/lp-04.jpeg",
    href: "/sistemainterno",
  },
];

const LandingVisualSection = () => {
  const [active, setActive] = useState(0);
  const titleRef = useGsapReveal<HTMLDivElement>();
  const cardsRef = useGsapReveal<HTMLDivElement>({ delay: 0.15, stagger: true });

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setActive((current) => (current + 1) % showcases.length);
    }, SLIDE_DURATION);

    return () => window.clearTimeout(timeout);
  }, [active]);

  return (
    <section className="bg-white py-16 sm:py-28 lg:bg-[#f7f8fa]">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div
          ref={titleRef}
          className="mb-10 lg:mb-12 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-6"
        >
          <div>
            <span className="mb-4 hidden font-inter text-xs font-semibold uppercase tracking-widest text-[#e22d2e] lg:block">
              Experiencias digitais
            </span>
            <h2 className="hidden font-inter text-3xl font-medium leading-tight text-[#383E42] sm:text-4xl lg:block lg:text-5xl">
              Solucoes visuais para operacoes que precisam evoluir.
            </h2>
            <h2 className="max-w-[12ch] font-inter text-[28px] font-normal leading-[1.08] text-[#1f2f3d] lg:hidden">
              Engenharia aplicada a operacoes que exigem{" "}
              <span className="italic text-[#e22d2e]">escala.</span>
            </h2>
          </div>
          <p className="hidden max-w-2xl font-inter text-base leading-8 text-slate-600 lg:ml-auto lg:block">
            Unimos estrategia, produto e engenharia para construir experiencias
            digitais mais claras, seguras e preparadas para crescimento.
          </p>
        </div>

        <div className="lg:hidden">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {showcases.map((item, index) => (
                <div key={item.title} className="w-full shrink-0 pr-0">
                  <Link
                    href={item.href}
                    className="block"
                  >
                    <div className="relative mx-auto mt-8 aspect-[4/3] w-full max-w-[330px] overflow-hidden bg-white">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="100vw"
                        priority={active === index}
                        className="object-contain"
                      />
                    </div>
                    <div className="mx-auto mt-2 max-w-[300px]">
                      <p className="font-inter text-[11px] leading-5 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-5 h-px w-[190px] overflow-hidden bg-slate-200">
            <span
              key={`mobile-progress-${active}`}
              className="block h-full w-full bg-[#e22d2e] animate-[carouselProgress_4.5s_linear]"
            />
          </div>
        </div>

        <div ref={cardsRef} className="hidden grid-cols-3 gap-6 lg:grid">
          {showcases.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-1 hover:border-[#e22d2e]/40"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <h3 className="font-inter text-xl font-semibold text-[#383E42]">
                    {item.title}
                  </h3>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#383E42] transition-colors group-hover:bg-[#e22d2e] group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="font-inter text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes carouselProgress {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default LandingVisualSection;
