import type { Metadata } from "next";
import HomePage from "@components/HomePage";
import { homeMetadataByLocale } from "@utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return homeMetadataByLocale[locale];
}

export default function Page() {
  return <HomePage />;
}
