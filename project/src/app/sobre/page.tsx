import type { Metadata } from "next";
import AboutPage from "@views/AboutPage";
import { aboutMetadata } from "@utils/metadata";

export const metadata: Metadata = aboutMetadata;

export default function Page() {
  return <AboutPage />;
}
