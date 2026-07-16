import type { Metadata } from "next";
import { SEO_CONFIGS } from "./seoConfig";

const DEFAULT_TITLE =
  "Empresa de Tecnologia e Soluções de TI no Brasil | ConderTech";
const DEFAULT_DESCRIPTION =
  "Soluções completas de tecnologia: software, IA, automação, painel de LED, monitoramento de PDV, cloud, IoT, dados, segurança e infraestrutura.";
const DEFAULT_IMAGE = "https://www.condertech.com.br/image/logocondertech.png";
const SITE_URL = "https://www.condertech.com.br";

const siteName = "ConderTech";

function buildMetadata({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords,
  image = DEFAULT_IMAGE,
  url = SITE_URL,
  locale = "pt_BR",
  languages,
}: {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  locale?: string;
  languages?: Record<string, string>;
}): Metadata {
  return {
    title: {
      default: title,
      template: "%s",
    },
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
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [{ url: image }],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

/**
 * Builds the hreflang alternate-language map for a locale-aware route.
 * `path` is the bare, unprefixed path (e.g. "/", "/sobre").
 */
function buildLanguageAlternates(path: string): Record<string, string> {
  const suffix = path === "/" ? "" : path;
  return {
    "pt-BR": `${SITE_URL}${path}`,
    en: `${SITE_URL}/en${suffix}`,
    es: `${SITE_URL}/es${suffix}`,
    "x-default": `${SITE_URL}${path}`,
  };
}

export const defaultMetadata = buildMetadata({
  keywords:
    "empresa de tecnologia, soluções de TI, desenvolvimento de software, inteligência artificial, automação, painel de LED, monitoramento de PDV, sistema para mercado, cloud, IoT, cibersegurança, infraestrutura de TI, integração de sistemas, consultoria de tecnologia",
  languages: buildLanguageAlternates("/"),
});
export const aboutMetadata = buildMetadata({
  ...SEO_CONFIGS.sobre,
  languages: buildLanguageAlternates("/sobre"),
});
export const estoqueMetadata = buildMetadata(SEO_CONFIGS.estoque);
export const ecommerceMetadata = buildMetadata(SEO_CONFIGS.ecommerce);
export const landingMetadata = buildMetadata(SEO_CONFIGS.landing);
export const uiuxMetadata = buildMetadata(SEO_CONFIGS.uiux);
export const sistemaInternoMetadata = buildMetadata(SEO_CONFIGS.sistemaInterno);
export const plataformaEnsinoMetadata = buildMetadata(
  SEO_CONFIGS.plataformaEnsino,
);
export const sistemaPedidosMetadata = buildMetadata(SEO_CONFIGS.sistemaPedidos);
export const termsMetadata = buildMetadata({
  title: "Termos de Uso - ConderTech",
  description:
    "Condições gerais para utilização dos canais digitais da ConderTech.",
  url: `${SITE_URL}/termos-de-uso`,
  languages: buildLanguageAlternates("/termos-de-uso"),
});
export const governanceMetadata = buildMetadata({
  title: "Governança de Dados (LGPD) - ConderTech",
  description: "Diretrizes de tratamento de dados alinhadas à LGPD.",
  url: `${SITE_URL}/governanca-de-dados`,
  languages: buildLanguageAlternates("/governanca-de-dados"),
});
export const budgetMetadata = buildMetadata({
  title: "Simulador de Orçamento - ConderTech",
  description:
    "Simule online o investimento do seu próximo projeto digital com o simulador de orçamento da ConderTech.",
  keywords:
    "simulador de orçamento, desenvolvimento web, landing page, ecommerce, sistema web",
  url: `${SITE_URL}/orcamento`,
  languages: buildLanguageAlternates("/orcamento"),
});

// ─── Locale-prefixed metadata (en/es) for the 5 translated routes ───────────
const LOCALE_META = {
  en: {
    home: {
      title: "Technology Company & IT Solutions in Brazil | ConderTech",
      description:
        "Complete technology solutions: software, AI, automation, LED panels, POS monitoring, cloud, IoT, data, security, and infrastructure.",
    },
    about: {
      title: "About ConderTech - History & Mission | Web Development",
      description:
        "Get to know ConderTech, a web development company based in Blumenau, Brazil. Our mission is to turn ideas into innovative, scalable digital solutions.",
    },
    terms: {
      title: "Terms of Use - ConderTech",
      description: "General terms for using ConderTech's digital channels.",
    },
    governance: {
      title: "Data Governance (LGPD) - ConderTech",
      description: "Data handling guidelines aligned with Brazil's LGPD.",
    },
    budget: {
      title: "Budget Simulator - ConderTech",
      description:
        "Simulate the investment for your next digital project online with ConderTech's budget simulator.",
    },
  },
  es: {
    home: {
      title: "Empresa de Tecnología y Soluciones de TI en Brasil | ConderTech",
      description:
        "Soluciones completas de tecnología: software, IA, automatización, paneles LED, monitoreo de PDV, cloud, IoT, datos, seguridad e infraestructura.",
    },
    about: {
      title: "Sobre ConderTech - Historia y Misión | Desarrollo Web",
      description:
        "Conoce a ConderTech, empresa especializada en desarrollo web en Blumenau, Brasil. Nuestra misión es transformar ideas en soluciones digitales innovadoras y escalables.",
    },
    terms: {
      title: "Términos de Uso - ConderTech",
      description:
        "Condiciones generales para el uso de los canales digitales de ConderTech.",
    },
    governance: {
      title: "Gobernanza de Datos (LGPD) - ConderTech",
      description: "Directrices de tratamiento de datos alineadas con la LGPD.",
    },
    budget: {
      title: "Simulador de Presupuesto - ConderTech",
      description:
        "Simula en línea la inversión de tu próximo proyecto digital con el simulador de presupuesto de ConderTech.",
    },
  },
} as const;

function buildLocaleMetadata(
  locale: "en" | "es",
  page: keyof (typeof LOCALE_META)["en"],
  path: string,
): Metadata {
  const copy = LOCALE_META[locale][page];
  const suffix = path === "/" ? "" : path;
  return buildMetadata({
    ...copy,
    url: `${SITE_URL}/${locale}${suffix}`,
    locale: locale === "en" ? "en_US" : "es_ES",
    languages: buildLanguageAlternates(path),
  });
}

export const homeMetadataByLocale = {
  en: buildLocaleMetadata("en", "home", "/"),
  es: buildLocaleMetadata("es", "home", "/"),
};
export const aboutMetadataByLocale = {
  en: buildLocaleMetadata("en", "about", "/sobre"),
  es: buildLocaleMetadata("es", "about", "/sobre"),
};
export const termsMetadataByLocale = {
  en: buildLocaleMetadata("en", "terms", "/termos-de-uso"),
  es: buildLocaleMetadata("es", "terms", "/termos-de-uso"),
};
export const governanceMetadataByLocale = {
  en: buildLocaleMetadata("en", "governance", "/governanca-de-dados"),
  es: buildLocaleMetadata("es", "governance", "/governanca-de-dados"),
};
export const budgetMetadataByLocale = {
  en: buildLocaleMetadata("en", "budget", "/orcamento"),
  es: buildLocaleMetadata("es", "budget", "/orcamento"),
};
