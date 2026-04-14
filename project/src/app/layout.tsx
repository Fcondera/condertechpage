import type { Metadata } from "next";
import "swiper/css";
import "../index.css";
import SiteLayout from "@components/SiteLayout";
import { defaultMetadata } from "@utils/metadata";

export const metadata: Metadata = defaultMetadata;

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ConderTech",
  description: defaultMetadata.description,
  image: "https://www.condertech.com.br/image/logocondertech.png",
  url: "https://www.condertech.com.br",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
