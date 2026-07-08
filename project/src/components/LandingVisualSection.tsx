import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useGsapReveal } from "@hooks/useGsapReveal";

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
  const titleRef = useGsapReveal<HTMLDivElement>();
  const cardsRef = useGsapReveal<HTMLDivElement>({ delay: 0.15, stagger: true });

  return (
    <section className="bg-[#f7f8fa] py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div
          ref={titleRef}
          className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div>
            <span className="mb-4 block font-inter text-xs font-semibold uppercase tracking-widest text-[#e22d2e]">
              Experiencias digitais
            </span>
            <h2 className="font-inter text-3xl font-medium leading-tight text-[#383E42] sm:text-4xl lg:text-5xl">
              Solucoes visuais para operacoes que precisam evoluir.
            </h2>
          </div>
          <p className="max-w-2xl font-inter text-base leading-8 text-slate-600 lg:ml-auto">
            Unimos estrategia, produto e engenharia para construir experiencias
            digitais mais claras, seguras e preparadas para crescimento.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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
    </section>
  );
};

export default LandingVisualSection;
