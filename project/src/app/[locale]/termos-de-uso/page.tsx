import type { Metadata } from "next";
import TermsPage from "@views/TermsPage";
import { termsMetadataByLocale } from "@utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return termsMetadataByLocale[locale];
}

export default function Page() {
  return <TermsPage />;
}
