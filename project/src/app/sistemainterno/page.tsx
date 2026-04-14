import type { Metadata } from "next";
import SistemaInternoPage from "@views/SistemaInternoPage";
import { sistemaInternoMetadata } from "@utils/metadata";

export const metadata: Metadata = sistemaInternoMetadata;

export default function Page() {
  return <SistemaInternoPage />;
}
