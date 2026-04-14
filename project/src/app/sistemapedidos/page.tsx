import type { Metadata } from "next";
import SistemaPedidosPage from "@views/SistemaPedidosPage";
import { sistemaPedidosMetadata } from "@utils/metadata";

export const metadata: Metadata = sistemaPedidosMetadata;

export default function Page() {
  return <SistemaPedidosPage />;
}
