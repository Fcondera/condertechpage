import type { Metadata } from "next";
import LandingPageMock from "@views/LandingPageMock";
import { landingMetadata } from "@utils/metadata";

export const metadata: Metadata = landingMetadata;

export default function Page() {
  return <LandingPageMock />;
}
