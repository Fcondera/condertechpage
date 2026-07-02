import type { Metadata } from "next";
import Link from "next/link";
import { cities, citiesByState } from "@/data/cities";

export const metadata: Metadata = {
  title: "Empresa de Tecnologia no Brasil | Cidades Atendidas",
  description:
    "Software, IA, automação, painel de LED, monitoramento de PDV e soluções de TI para empresas em 379 cidades brasileiras.",
  alternates: { canonical: "https://www.condertech.com.br/cidades" },
  openGraph: {
    title: "Cidades atendidas pela ConderTech no Brasil",
    description:
      "Soluções digitais para empresas nas principais cidades brasileiras.",
    url: "https://www.condertech.com.br/cidades",
  },
};

export default function CitiesPage() {
  return (
    <main className="min-h-screen bg-white pb-24 pt-28">
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e22d2e]">
          Atendimento em todo o Brasil
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-tight text-[#383E42] sm:text-6xl">
          Tecnologia para empresas nas principais cidades brasileiras.
        </h1>
        <p className="mt-7 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
          A ConderTech atende remotamente {cities.length} cidades com mais de 90
          mil habitantes, distribuídas pelos 26 estados e Distrito Federal. O
          recorte reúne 60,1% da população do país, conforme as estimativas
          municipais do IBGE de 2025.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/#contato"
            className="rounded-full bg-[#e22d2e] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#601311]"
          >
            Falar sobre meu projeto
          </a>
          <a
            href="https://www.ibge.gov.br/estatisticas/sociais/populacao/9103-estimativas-de-populacao.html"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-300 px-7 py-3 text-sm font-semibold text-[#383E42] transition-colors hover:border-[#e22d2e]"
          >
            Fonte: IBGE 2025
          </a>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-6 sm:px-8 lg:px-12">
        <h2 className="text-3xl font-medium text-[#383E42]">
          Encontre sua cidade
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {citiesByState.map((group) => (
            <div key={group.state}>
              <h3 className="border-b border-slate-200 pb-3 text-lg font-semibold text-[#383E42]">
                {group.stateName}{" "}
                <span className="text-sm font-normal text-slate-400">
                  ({group.state})
                </span>
              </h3>
              <ul className="mt-4 space-y-2">
                {group.cities.map((city) => (
                  <li key={city.slug}>
                    <Link
                      href={`/empresa-de-tecnologia/${city.slug}`}
                      className="text-sm text-slate-600 transition-colors hover:text-[#e22d2e]"
                    >
                      Empresa de tecnologia em {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
