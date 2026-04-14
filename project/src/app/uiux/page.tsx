import type { Metadata } from "next";
import UiUxPage from "@views/UiUxPage";
import { uiuxMetadata } from "@utils/metadata";

export const metadata: Metadata = uiuxMetadata;

export default function Page() {
  return <UiUxPage />;
}
