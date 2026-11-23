import type { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { systems } from "@/data/products";
import { marketProducts } from "@/data/marketplace";
import { businessSolutions } from "@/data/businessSolutions";

const SITE_URL = "https://www.condertech.com.br";

// Routes that exist in pt-BR (unprefixed), en (/en/...) and es (/es/...).
const LOCALE_AWARE_ROUTES = [
  "",
  "/sobre",
  "/termos-de-uso",
  "/governanca-de-dados",
  "/orcamento",
];

function languageAlternates(route: string) {
  return {
    "pt-BR": `${SITE_URL}${route}`,
    en: `${SITE_URL}/en${route}`,
    es: `${SITE_URL}/es${route}`,
    "x-default": `${SITE_URL}${route}`,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/produtos",
    "/marketplace",
    ...systems.map(product => `/produtos/${product.id}`),
    ...marketProducts.map(product => `/marketplace/${product.id}`),
    ...businessSolutions.map(solution => `/solucoes/${solution.slug}`),
    "",
    "/sobre",
    "/cidades",
    "/solucoes-de-tecnologia",
    "/estoque",
    "/ecommerce",
    "/landing",
    "/curso",
    "/uiux",
    "/sistemainterno",
    "/plataformaensino",
    "/sistemapedidos",
    "/orcamento",
    "/portfolio-lp",
    "/governanca-de-dados",
    "/termos-de-uso",
  ];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/cidades" ? 0.9 : 0.7,
    ...(LOCALE_AWARE_ROUTES.includes(route)
      ? { alternates: { languages: languageAlternates(route) } }
      : {}),
  }));

  const localePages: MetadataRoute.Sitemap = LOCALE_AWARE_ROUTES.flatMap(
    (route) =>
      (["en", "es"] as const).map((locale) => ({
        url: `${SITE_URL}/${locale}${route}`,
        changeFrequency: "monthly" as const,
        priority: route === "" ? 0.9 : 0.6,
        alternates: { languages: languageAlternates(route) },
      })),
  );

  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${SITE_URL}/empresa-de-tecnologia/${city.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...localePages, ...cityPages];
}
