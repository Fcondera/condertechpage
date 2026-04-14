import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const DEFAULT_SEO = {
  title: "ConderTech - Desenvolvimento Web & Soluções Digitais",
  description:
    "Especialistas em desenvolvimento web moderno, e-commerce, sistemas internos e landing pages. Transformamos ideias em experiências digitais excepcionais em todo Brasil.",
  keywords:
    "desenvolvimento web, e-commerce, sistemas web, landing page, React, TypeScript, Blumenau, Santa Catarina, desenvolvimento de sites, sistemas personalizados, UI/UX design",
  image: "https://www.condertech.com.br/image/logocondertech.png",
  url: "https://www.condertech.com.br",
  type: "website",
};

const SEOHead = ({
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  keywords = DEFAULT_SEO.keywords,
  image = DEFAULT_SEO.image,
  url = DEFAULT_SEO.url,
  type = DEFAULT_SEO.type,
}: SEOHeadProps) => {
  useEffect(() => {
    // Atualiza o título
    document.title = title;

    // Atualiza meta tags
    const metaTags = [
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { name: "author", content: "ConderTech" },
      { name: "robots", content: "index, follow" },
      { name: "googlebot", content: "index, follow" },

      // Open Graph (Facebook, LinkedIn)
      { property: "og:type", content: type },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:url", content: url },
      { property: "og:site_name", content: "ConderTech" },
      { property: "og:locale", content: "pt_BR" },

      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },

      // Mobile
      { name: "theme-color", content: "#000000" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const attr = name ? "name" : "property";
      const value = name || property;

      let element = document.querySelector(`meta[${attr}="${value}"]`);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, value!);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    });

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // JSON-LD Schema
    const schemaScript = document.getElementById("schema-org");
    if (schemaScript) {
      schemaScript.remove();
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "ConderTech",
      description: description,
      image: image,
      url: url,
      telephone: "+55-47-9273-9983",
      email: "condertech@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Blumenau",
        addressRegion: "SC",
        addressCountry: "BR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -26.9194,
        longitude: -49.0661,
      },
      sameAs: ["https://instagram.com/condertech_"],
      priceRange: "$$",
      openingHours: "Mo-Fr 09:00-18:00",
    };

    const script = document.createElement("script");
    script.id = "schema-org";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }, [title, description, keywords, image, url, type]);

  return null;
};

export default SEOHead;
