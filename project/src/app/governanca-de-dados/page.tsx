import type { Metadata } from "next";
import DataGovernancePage from "@views/DataGovernancePage";
import { governanceMetadata } from "@utils/metadata";

export const metadata: Metadata = governanceMetadata;

export default function Page() {
  return <DataGovernancePage />;
}
