import type { Metadata } from "next";
import EcommercePage from "@views/EcommercePage";
import { ecommerceMetadata } from "@utils/metadata";

export const metadata: Metadata = ecommerceMetadata;

export default function Page() {
  return <EcommercePage />;
}
