import { Globe, ShoppingCart, Settings, Palette } from "lucide-react";
import type { Service } from "../types";

export const SERVICES: Service[] = [
  {
    icon: Globe,
    title: "Desenvolvimento de Sites",
    description:
      "Sites responsivos e otimizados para SEO, desenvolvidos com as tecnologias mais modernas.",
    route: "/landing",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description:
      "Lojas virtuais completas com integração de pagamento e gestão de produtos.",
    route: "/ecommerce",
  },
  {
    icon: Settings,
    title: "Sistemas Internos",
    description:
      "Desenvolvimento de sistemas personalizados para automatizar processos empresariais.",
    route: "/sistemainterno",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Interfaces intuitivas e experiências de usuário excepcionais para seus projetos.",
    route: "/uiux",
  },
  {
    icon: Settings,
    title: "Gerenciador de Estoque",
    description:
      "Controle total de estoque, entradas, saídas e relatórios para sua empresa.",
    route: "/estoque",
  },
];
