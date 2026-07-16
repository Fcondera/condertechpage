import type { Metadata } from "next";
import TermsPage from "@views/TermsPage";
import { termsMetadata } from "@utils/metadata";

export const metadata: Metadata = termsMetadata;

export default function Page() {
  return <TermsPage />;
}
