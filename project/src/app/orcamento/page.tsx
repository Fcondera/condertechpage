import type { Metadata } from "next";
import BudgetSimulatorPage from "@views/BudgetSimulatorPage";
import { budgetMetadata } from "@utils/metadata";

export const metadata: Metadata = budgetMetadata;

export default function Page() {
  return <BudgetSimulatorPage />;
}
