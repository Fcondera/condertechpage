import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactSection from "@components/ContactSection";
import { cities, getCityBySlug } from "@/data/cities";
import { technologyServices } from "@/data/technologyServices";

const SITE_URL = "https://www.condertech.com.br";

interface CityPageProps {
  params: Promise<{ cidade: string }>;
}

export function generateStaticParams() {
  return cities.map((city) => ({ cidade: city.slug }));
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);

  if (!city) return {};

  const title = `Empresa de Tecnologia em ${city.name} | ConderTech`;
  const description = `Soluções de tecnologia em ${city.name}: software, IA, automação, painel de LED, monitoramento de PDV, cloud, IoT, dados e infraestrutura.`;
  const url = `${SITE_URL}/empresa-de-tecnologia/${city.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "ConderTech",
      locale: "pt_BR",
      type: "website",
      images: ["/image/logocondertech.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/image/logocondertech.png"],
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  if (!city) notFound();

  const url = `${SITE_URL}/empresa-de-tecnologia/${city.slug}`;
  const nearbyCities = cities
    .filter((item) => item.state === city.state && item.slug !== city.slug)
    .slice(0, 8);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `Soluções de tecnologia em ${city.name}`,
        serviceType: "Tecnologia da informação e transformação digital",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: {
          "@type": "City",
          name: city.name,
          containedInPlace: {
            "@type": "State",
            name: city.stateName,
          },
        },
        url,
        description: `Software, inteligência artificial, automação, painel de LED, monitoramento de PDV, cloud, IoT, dados e infraestrutura para empresas de ${city.name}, ${city.state}.`,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Serviços de tecnologia em ${city.name}`,
          itemListElement: technologyServices.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              description: service.description,
            },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Cidades atendidas",
            item: `${SITE_URL}/cidades`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: city.name,
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `A ConderTech atende empresas em ${city.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Sim. Atendemos empresas de ${city.name} de forma remota, com reuniões online, acompanhamento do projeto e suporte estruturado.`,
            },
          },
          {
            "@type": "Question",
            name: "Quais soluções de tecnologia a ConderTech oferece?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A ConderTech atua com software, sites, aplicativos, inteligência artificial, automação, e-commerce, monitoramento de PDV, painéis de LED, dados, IoT, cloud, infraestrutura, integrações e segurança.",
            },
          },
          {
            "@type": "Question",
            name: `A ConderTech trabalha com painel de LED e monitoramento de PDV em ${city.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Sim. A ConderTech desenvolve projetos de painel de LED e comunicação digital, além de soluções para monitoramento de PDV, mercados, lojas e redes varejistas em ${city.name}.`,
            },
          },
        ],
      },
    ],
  };

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="bg-[#101213] pb-24 pt-32 text-white sm:pb-32 sm:pt-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <nav className="text-sm text-white/50" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              Início
            </Link>
            <span className="mx-2">/</span>
            <Link href="/cidades" className="hover:text-white">
              Cidades
            </Link>
            <span className="mx-2">/</span>
            <span>{city.name}</span>
          </nav>
          <p className="mt-12 text-xs font-semibold uppercase tracking-[0.28em] text-[#e22d2e]">
            {city.name}, {city.state} · Região {city.region}
          </p>
          <h1 className="mt-5 max-w-5xl text-4xl font-medium leading-tight sm:text-6xl lg:text-7xl">
            Empresa de tecnologia em {city.name}
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            Software, inteligência artificial, automação, painel de LED,
            monitoramento de PDV, cloud, IoT, dados e infraestrutura para
            empresas de {city.name}.
          </p>
          <a
            href="#contato"
            className="mt-10 inline-flex rounded-full bg-[#e22d2e] px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-colors hover:bg-[#601311]"
          >
            Solicitar proposta
          </a>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:px-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e22d2e]">
            Estratégia local, execução nacional
          </p>
          <h2 className="mt-5 text-3xl font-medium leading-tight text-[#383E42] sm:text-5xl">
            Um parceiro completo de tecnologia para sua empresa em {city.name}.
          </h2>
          <p className="mt-7 text-base leading-8 text-slate-600">
            Entendemos a operação, definimos a arquitetura e conectamos
            tecnologia física e digital em uma solução adequada ao negócio.
            Todo o processo tem comunicação clara, acompanhamento e suporte.
          </p>
          <Link
            href="/solucoes-de-tecnologia"
            className="mt-7 inline-flex text-sm font-semibold text-[#e22d2e] hover:text-[#601311]"
          >
            Conhecer todas as soluções →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {technologyServices.map((service) => (
            <article key={service.name} className="border border-slate-200 p-6">
              <h3 className="font-semibold text-[#383E42]">
                {service.shortName}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f7f7f7] py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <h2 className="text-3xl font-medium text-[#383E42]">
            Dúvidas frequentes
          </h2>
          <div className="mt-10 divide-y divide-slate-200">
            <article className="py-7">
              <h3 className="font-semibold text-[#383E42]">
                A ConderTech atende empresas em {city.name}?
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                Sim. Atendemos {city.name} remotamente, com reuniões online,
                acompanhamento contínuo e suporte organizado.
              </p>
            </article>
            <article className="py-7">
              <h3 className="font-semibold text-[#383E42]">
                Vocês trabalham com painel de LED em {city.name}?
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                Sim. Desenvolvemos projetos de painel de LED, videowall, mídia
                indoor, digital signage e gerenciamento remoto de conteúdo.
              </p>
            </article>
            <article className="py-7">
              <h3 className="font-semibold text-[#383E42]">
                A ConderTech oferece monitoramento de PDV para mercados?
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                Sim. Criamos soluções para monitorar frente de caixa, terminais,
                vendas, filas, disponibilidade e indicadores de lojas,
                supermercados e redes varejistas.
              </p>
            </article>
          </div>
        </div>
      </section>

      {nearbyCities.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
          <h2 className="text-2xl font-medium text-[#383E42]">
            Atendimento em outras cidades de {city.stateName}
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {nearbyCities.map((item) => (
              <Link
                key={item.slug}
                href={`/empresa-de-tecnologia/${item.slug}`}
                className="rounded-full border border-slate-300 px-5 py-2 text-sm text-slate-600 transition-colors hover:border-[#e22d2e] hover:text-[#e22d2e]"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <ContactSection />
    </main>
  );
}
