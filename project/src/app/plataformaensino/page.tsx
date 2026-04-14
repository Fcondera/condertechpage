import type { Metadata } from "next";
import PlataformaEnsinoPage from "@views/PlataformaEnsinoPage";
import { plataformaEnsinoMetadata } from "@utils/metadata";

export const metadata: Metadata = plataformaEnsinoMetadata;

export default function Page() {
  return <PlataformaEnsinoPage />;
}
