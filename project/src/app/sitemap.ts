import type { MetadataRoute } from "next";
import { cities } from "@/data/cities";

const SITE_URL = "https://www.condertech.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/sobre",
    "/cidades",
    "/solucoes-de-tecnologia",
    "/estoque",
    "/ecommerce",
    "/landing",
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
    lastModified: new Date("2026-07-02"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/cidades" ? 0.9 : 0.7,
  }));

  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${SITE_URL}/empresa-de-tecnologia/${city.slug}`,
    lastModified: new Date("2026-07-02"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...cityPages];
}
