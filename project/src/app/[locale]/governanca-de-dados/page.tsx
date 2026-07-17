import type { Metadata } from "next";
import DataGovernancePage from "@views/DataGovernancePage";
import { governanceMetadataByLocale } from "@utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return governanceMetadataByLocale[locale];
}

export default function Page() {
  return <DataGovernancePage />;
}
