import type { Metadata } from "next";
import Link from "next/link";
import BusinessSolutionsSection from "@/components/BusinessSolutionsSection";
import {
  technologyKeywords,
  technologyServices,
} from "@/data/technologyServices";

const url = "https://www.condertech.com.br/solucoes-de-tecnologia";

export const metadata: Metadata = {
  title: "Cibersegurança, migração cloud e IA personalizada | ConderTech",
  description:
    "Cibersegurança empresarial, migração para a nuvem e IA personalizada com RAG, MCP e LLMs. Atendimento no Amazonas e em todo o Brasil.",
  keywords: technologyKeywords,
  alternates: { canonical: url },
  openGraph: {
    title: "Cibersegurança, nuvem e IA personalizada | ConderTech",
    description:
      "Proteção de dados e sistemas, planejamento de migração cloud e desenvolvimento de IA personalizada para empresas.",
    url,
  },
};

export default function TechnologySolutionsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Soluções de tecnologia da ConderTech",
    url,
    itemListElement: technologyServices.map((service, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        provider: {
          "@id": "https://www.condertech.com.br/#organization",
        },
        areaServed: { "@type": "Country", name: "Brasil" },
      },
    })),
  };

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="bg-[#101213] pb-24 pt-36 text-white sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e22d2e]">
            ConderTech · Tecnologia de ponta a ponta
          </p>
          <h1 className="mt-6 max-w-5xl text-4xl font-medium leading-tight sm:text-6xl lg:text-7xl">
            Cibersegurança, migração para a nuvem e IA personalizada.
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            Três prioridades para sua empresa: proteger dados e sistemas,
            modernizar a infraestrutura e aplicar inteligência artificial aos
            processos. Atendimento no Amazonas e em todo o Brasil, com escopo
            definido conforme sua operação.
          </p>
          <a
            href="#contato-tecnologia"
            className="mt-10 inline-flex rounded-full bg-[#e22d2e] px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-[#601311]"
          >
            Falar com um especialista
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-12 px-6 py-20 sm:px-8 lg:px-12" aria-label="Serviços prioritários">
        <article id="ciberseguranca" className="scroll-mt-28 rounded-2xl border border-slate-200 p-7 sm:p-10">
          <h2 className="text-3xl font-medium text-[#383E42]">Cibersegurança para empresas</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Avaliação de riscos, controle de acesso e proteção de aplicações e dados. O trabalho começa pelo levantamento dos sistemas, usuários e pontos críticos para definir as medidas adequadas à operação.</p>
          <ul className="mt-5 list-disc space-y-3 pl-5 leading-7 text-slate-600"><li>Revisão de permissões, autenticação e acessos aos sistemas.</li><li>Planejamento de backup, recuperação e continuidade do negócio.</li><li>Priorização de melhorias e orientação à equipe conforme os riscos identificados.</li></ul>
          <Link href="/#contato" className="mt-7 inline-block font-semibold text-[#c22425] underline underline-offset-4">Conversar sobre cibersegurança</Link>
        </article>
        <article id="infraestrutura" className="scroll-mt-28 rounded-2xl border border-slate-200 p-7 sm:p-10">
          <h2 className="text-3xl font-medium text-[#383E42]">Migração para a nuvem e infraestrutura cloud</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Planejamento da migração de aplicações, servidores e bancos de dados para a nuvem. Avaliamos dependências, capacidade, custos e requisitos de acesso antes de definir as etapas da mudança.</p>
          <ul className="mt-5 list-disc space-y-3 pl-5 leading-7 text-slate-600"><li>Inventário do ambiente atual e definição da arquitetura de destino.</li><li>Backup, testes de migração e plano de retorno em caso de falha.</li><li>Validação da operação, monitoramento e acompanhamento dos custos.</li></ul>
          <p className="mt-5 leading-7 text-slate-600">Prazos, janelas de indisponibilidade e responsabilidades são definidos na proposta conforme a complexidade do ambiente.</p>
          <Link href="/#contato" className="mt-7 inline-block font-semibold text-[#c22425] underline underline-offset-4">Planejar minha migração para a nuvem</Link>
        </article>
        <article className="rounded-2xl border border-slate-200 p-7 sm:p-10">
          <h2 className="text-3xl font-medium text-[#383E42]">IA personalizada com RAG, MCP e LLMs</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Assistentes e agentes adaptados aos documentos, ferramentas e processos da empresa. Definimos as fontes de conhecimento, as permissões e os critérios de avaliação antes da implantação.</p>
          <Link href="/solucoes/inteligencia-artificial-personalizada" className="mt-7 inline-block font-semibold text-[#c22425] underline underline-offset-4">Conhecer o desenvolvimento de IA personalizada</Link>
        </article>
      </section>
      <BusinessSolutionsSection />
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e22d2e]">
            Portfólio de soluções
          </p>
          <h2 className="mt-5 text-3xl font-medium leading-tight text-[#383E42] sm:text-5xl">
            Um único parceiro para os desafios digitais e físicos da empresa.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {technologyServices.map((service, index) => (
            <article
              key={service.name}
              className="border border-slate-200 p-7 transition-colors hover:border-[#e22d2e]"
            >
              <span className="text-xs font-semibold text-[#e22d2e]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-[#383E42]">
                {service.name}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="contato-tecnologia" className="bg-[#f7f7f7] py-20">
        <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">
          <h2 className="text-3xl font-medium text-[#383E42] sm:text-5xl">
            Seu desafio não está na lista?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-600">
            Conte o que a sua empresa precisa. A ConderTech avalia o cenário,
            define a arquitetura e reúne as tecnologias adequadas para a
            solução.
          </p>
          <Link
            href="/#contato"
            className="mt-8 inline-flex rounded-full bg-[#e22d2e] px-8 py-4 text-sm font-semibold text-white hover:bg-[#601311]"
          >
            Solicitar diagnóstico
          </Link>
        </div>
      </section>
    </main>
  );
}
