"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGsapReveal } from "@hooks/useGsapReveal";

const SLIDE_DURATION = 2000;

const showcases = [
  {
    title: "Proteção total da sua empresa",
    description:
      "Blindamos os dados do seu negócio, controlamos quem acessa o quê e garantimos que informações confidenciais fiquem trancadas a sete chaves.",
    image: "/image/lp-02.jpeg",
    href: "/governanca-de-dados",
  },
  {
    title: "Decisões rápidas e automáticas",
    description:
      "Transformamos seus dados de vendas e custos em relatórios automáticos. Chega de perder tempo preenchendo planilhas manualmente.",
    image: "/image/lp-03.jpeg",
    href: "/solucoes-de-tecnologia",
  },
  {
    title: "Sua equipe em total sintonia",
    description:
      "Criamos ferramentas sob medida que conectam seus departamentos, eliminando erros de comunicação e os gargalos do dia a dia.",
    image: "/image/lp-04.jpeg",
    href: "/sistemainterno",
  },
  {
    title: "Acesso seguro de qualquer lugar",
    description:
      "Seus funcionários acessam o que precisam com segurança e permissões controladas, sem expor a empresa a riscos ou vazamentos.",
    image: "/image/lp-05.jpeg",
    href: "/governanca-de-dados",
  },
  {
    title: "Seu sistema sempre funcionando",
    description:
      "Cuidamos da estrutura para que o seu sistema nunca caia, antecipando falhas antes que elas atrapalhem as suas vendas ou sua operação.",
    image: "/image/lp-06.jpeg",
    href: "/solucoes-de-tecnologia",
  },
  {
    title: "Tecnologia pronta para o crescimento",
    description:
      "Construímos sistemas que acompanham o ritmo do seu negócio. Sua empresa pode dobrar de tamanho e a tecnologia vai aguentar o tranco.",
    image: "/image/lp-07.jpeg",
    href: "/solucoes-de-tecnologia",
  },
];

const LandingVisualSection = () => {
  const [active, setActive] = useState(0);
  const titleRef = useGsapReveal<HTMLDivElement>();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setActive((current) => (current + 1) % showcases.length);
    }, SLIDE_DURATION);

    return () => window.clearTimeout(timeout);
  }, [active]);

  return (
    <section className="bg-white py-16 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div
          ref={titleRef}
          className="mb-8 lg:mb-12 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-10"
        >
          <div>
            <h2 className="max-w-[12ch] font-inter text-[28px] font-normal leading-[1.08] text-[#1f2f3d] sm:text-4xl lg:text-5xl">
              Engenharia aplicada a operacoes que exigem{" "}
              <span className="italic text-[#e22d2e]">escala.</span>
            </h2>
          </div>
          <p className="mt-6 max-w-2xl font-inter text-sm leading-7 text-slate-600 sm:text-base lg:ml-auto lg:mt-0 lg:leading-8">
            Unimos estrategia, produto e engenharia para construir experiencias
            digitais mais claras, seguras e preparadas para crescimento.
          </p>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {showcases.map((item, index) => (
              <div key={item.title} className="w-full shrink-0">
                <Link href={item.href} className="block">
                  <div className="relative mx-auto mt-4 aspect-[4/3] w-full max-w-[340px] overflow-hidden bg-white sm:max-w-[720px] lg:max-w-[1040px] xl:max-w-[1120px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1280px) 1120px, (min-width: 1024px) 1040px, (min-width: 640px) 720px, 100vw"
                      priority={active === index}
                      className="object-contain"
                    />
                  </div>
                  <div className="mx-auto mt-3 max-w-[300px] text-left sm:max-w-xl lg:max-w-2xl lg:text-center">
                    <h3 className="font-inter text-base font-semibold leading-snug text-[#1f2f3d] sm:text-xl lg:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-inter text-[11px] leading-5 text-slate-500 sm:text-sm sm:leading-6">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-6 h-px w-[190px] overflow-hidden bg-slate-200 sm:w-[260px]">
          <span
            key={`visual-progress-${active}`}
            className="block h-full w-full bg-[#e22d2e] animate-[carouselProgress_2s_linear]"
          />
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {showcases.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Ver ${item.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === index ? "w-6 bg-[#e22d2e]" : "w-1.5 bg-slate-300"
              }`}
            />
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
