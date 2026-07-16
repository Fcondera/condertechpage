import type { Metadata } from "next";
import BudgetSimulatorPage from "@views/BudgetSimulatorPage";
import { budgetMetadataByLocale } from "@utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return budgetMetadataByLocale[locale];
}

export default function Page() {
  return <BudgetSimulatorPage />;
}
