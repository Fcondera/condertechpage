import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useGsapReveal } from "@hooks/useGsapReveal";

const pages = [
  {
    title: "E-commerce",
    description: "Loja virtual moderna, escalavel e preparada para vender.",
    href: "/ecommerce",
  },
  {
    title: "Estoque",
    description: "Controle de produtos, indicadores e operacao em tempo real.",
    href: "/estoque",
  },
  {
    title: "Landing Page",
    description: "Pagina de conversao para campanhas, ofertas e captacao.",
    href: "/landing",
  },
  {
    title: "Orcamento",
    description: "Simulador para estimar investimento em projetos digitais.",
    href: "/orcamento",
  },
  {
    title: "Plataforma de Ensino",
    description: "Ambiente digital para cursos, treinamentos e conteudo.",
    href: "/plataformaensino",
  },
  {
    title: "Portfolio LP",
    description: "Vitrine de landing pages e experiencias comerciais.",
    href: "/portfolio-lp",
  },
  {
    title: "Sistema Interno",
    description: "Sistema sob medida para organizar processos da empresa.",
    href: "/sistemainterno",
  },
  {
    title: "Sistema de Pedidos",
    description: "Fluxo digital para pedidos, atendimento e operacao.",
    href: "/sistemapedidos",
  },
  {
    title: "UI/UX",
    description: "Interfaces pensadas para clareza, conversao e uso real.",
    href: "/uiux",
  },
  {
    title: "Solucoes de Tecnologia",
    description: "Servicos de tecnologia, automacao, dados e infraestrutura.",
    href: "/solucoes-de-tecnologia",
  },
  {
    title: "Governanca de Dados",
    description: "Diretrizes de dados, seguranca, privacidade e LGPD.",
    href: "/governanca-de-dados",
  },
  {
    title: "IMA",
    description: "Pagina dedicada para captacao e apresentacao da oferta IMA.",
    href: "/ima",
  },
  {
    title: "Sobre",
    description: "Conheca a ConderTech, sua visao e forma de trabalho.",
    href: "/sobre",
  },
];

const PageDirectorySection = () => {
  const titleRef = useGsapReveal<HTMLDivElement>();
  const gridRef = useGsapReveal<HTMLDivElement>({ delay: 0.15, stagger: true });

  return (
    <section id="paginas" className="bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div
          ref={titleRef}
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <span className="mb-4 block font-inter text-xs font-semibold uppercase tracking-widest text-[#e22d2e]">
              Paginas
            </span>
            <h2 className="max-w-[18ch] font-inter text-3xl font-medium leading-tight text-[#383E42] sm:text-4xl lg:text-5xl">
              Solucoes prontas para conhecer em detalhes.
            </h2>
          </div>
          <p className="max-w-xl font-inter text-base leading-7 text-slate-600">
            Acesse as principais paginas da ConderTech para explorar exemplos,
            solucoes e caminhos de atendimento.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group flex min-h-[168px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#e22d2e]/40 hover:shadow-[0_18px_50px_rgba(15,23,42,0.10)]"
            >
              <div>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h3 className="font-inter text-lg font-semibold text-[#383E42]">
                    {page.title}
                  </h3>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#383E42] transition-colors group-hover:bg-[#e22d2e] group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="font-inter text-sm leading-6 text-slate-600">
                  {page.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PageDirectorySection;
