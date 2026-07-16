import type { Metadata } from "next";
import AboutPage from "@views/AboutPage";
import { aboutMetadataByLocale } from "@utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return aboutMetadataByLocale[locale];
}

export default function Page() {
  return <AboutPage />;
}
