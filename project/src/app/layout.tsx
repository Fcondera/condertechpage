import type { Metadata } from "next";
import "swiper/css";
import "../index.css";
import SiteLayout from "@components/SiteLayout";
import { defaultMetadata } from "@utils/metadata";

export const metadata: Metadata = defaultMetadata;

const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.condertech.com.br/#organization",
  name: "ConderTech",
  description: defaultMetadata.description,
  image: "https://www.condertech.com.br/image/logocondertech.png",
  url: "https://www.condertech.com.br",
  telephone: "+55-47-9273-9983",
  email: "condertech@gmail.com",
  address: [{
    "@type": "PostalAddress",
    addressLocality: "Blumenau",
    addressRegion: "SC",
    addressCountry: "BR",
  }, {
    "@type": "PostalAddress",
    streetAddress: "AM-070",
    addressRegion: "AM",
    addressCountry: "BR",
  }],
  areaServed: {
    "@type": "Country",
    name: "Brasil",
  },
  knowsAbout: [
    "Cibersegurança empresarial",
    "Migração para a nuvem",
    "IA personalizada para empresas",
    "Desenvolvimento de sites",
    "Landing pages",
    "E-commerce",
    "Sistemas web personalizados",
    "UI/UX Design",
    "Inteligência artificial",
    "Desenvolvimento de IA personalizada",
    "RAG e bases de conhecimento",
    "MCP e integração de ferramentas",
    "LLMs e agentes de IA",
    "Automação de processos",
    "Painéis de LED",
    "Digital signage",
    "Monitoramento de PDV",
    "Sistemas para mercados e supermercados",
    "Cloud computing",
    "Internet das Coisas",
    "Business Intelligence",
    "Cibersegurança",
    "Infraestrutura de TI",
  ],
  sameAs: ["https://instagram.com/condertech_"],
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [schema, {
    "@type": "WebSite",
    "@id": "https://www.condertech.com.br/#website",
    url: "https://www.condertech.com.br",
    name: "ConderTech",
    publisher: { "@id": schema["@id"] },
    inLanguage: ["pt-BR", "en", "es"],
  }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <SiteLayout>{children}</SiteLayout>
        <script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
