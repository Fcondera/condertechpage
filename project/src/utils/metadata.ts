import type { Metadata } from "next";
import { SEO_CONFIGS } from "./seoConfig";

const DEFAULT_TITLE = "ConderTech - Desenvolvimento Web & Solucoes Digitais";
const DEFAULT_DESCRIPTION =
  "Especialistas em desenvolvimento web moderno, e-commerce, sistemas internos e landing pages. Transformamos ideias em experiencias digitais excepcionais em todo Brasil.";
const DEFAULT_IMAGE = "https://www.condertech.com.br/image/logocondertech.png";
const SITE_URL = "https://www.condertech.com.br";

const siteName = "ConderTech";

function buildMetadata({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords,
  image = DEFAULT_IMAGE,
  url = SITE_URL,
}: {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}): Metadata {
  return {
    title,
    description,
    keywords,
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: "/image/logocondertech.png",
      shortcut: "/image/logocondertech.png",
      apple: "/image/logocondertech.png",
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [{ url: image }],
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export const defaultMetadata = buildMetadata({});
export const aboutMetadata = buildMetadata(SEO_CONFIGS.sobre);
export const estoqueMetadata = buildMetadata(SEO_CONFIGS.estoque);
export const ecommerceMetadata = buildMetadata(SEO_CONFIGS.ecommerce);
export const landingMetadata = buildMetadata(SEO_CONFIGS.landing);
export const uiuxMetadata = buildMetadata(SEO_CONFIGS.uiux);
export const sistemaInternoMetadata = buildMetadata(SEO_CONFIGS.sistemaInterno);
export const plataformaEnsinoMetadata = buildMetadata(
  SEO_CONFIGS.plataformaEnsino,
);
export const sistemaPedidosMetadata = buildMetadata(SEO_CONFIGS.sistemaPedidos);
export const budgetMetadata = buildMetadata({
  title: "Simulador de Orcamento - ConderTech",
  description:
    "Simule online o investimento do seu proximo projeto digital com o simulador de orcamento da ConderTech.",
  keywords:
    "simulador de orcamento, desenvolvimento web, landing page, ecommerce, sistema web",
  url: `${SITE_URL}/orcamento`,
});
