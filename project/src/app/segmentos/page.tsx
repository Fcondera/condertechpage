import type { Metadata } from "next";
import SegmentSolutionsPage from "@components/SegmentSolutionsPage";

export const metadata: Metadata = {
  title: "Soluções por Segmento | ConderTech",
  description:
    "Conheça soluções especializadas da ConderTech para e-commerce, sistemas personalizados, infraestrutura, segurança e governo.",
};

export default function Page() {
  return <SegmentSolutionsPage />;
}
