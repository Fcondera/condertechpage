import type { Metadata } from "next";
import EstoquePage from "@views/EstoquePage";
import { estoqueMetadata } from "@utils/metadata";

export const metadata: Metadata = estoqueMetadata;

export default function Page() {
  return <EstoquePage />;
}
