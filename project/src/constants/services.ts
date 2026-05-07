import { Globe, ShoppingCart, Settings } from "lucide-react";
import type { Service } from "../types";

export const SERVICES: Service[] = [
  {
    icon: Globe,
    industry: "Agro & Indústria",
    eyebrow: "Cadeias complexas sob controle",
    title: "Agro & Indústria",
    description:
      "Monitoramento de ativos, controle de produção e inteligência embarcada para cadeias complexas.",
    details:
      "Projetamos plataformas resilientes para conectar chão de fábrica, sensores, indicadores e decisão operacional em uma única arquitetura.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80",
    highlights: [
      "Ativos conectados",
      "Produção em tempo real",
      "Inteligência embarcada",
    ],
    route: "/estoque",
  },
  {
    icon: ShoppingCart,
    industry: "Varejo & E-commerce",
    eyebrow: "Conversão e recorrência em alta escala",
    title: "Varejo & E-commerce",
    description:
      "Arquiteturas transacionais de alta volumetria focadas em máxima conversão e recorrência.",
    details:
      "Da vitrine ao pós-venda, estruturamos jornadas comerciais robustas para suportar picos, automações e crescimento sem atrito.",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1920&q=80",
    highlights: ["Alta volumetria", "Máxima conversão", "Recorrência"],
    route: "/ecommerce",
  },
  {
    icon: Settings,
    industry: "Operações Críticas",
    eyebrow: "Governança e decisão em tempo real",
    title: "Operações Críticas",
    description:
      "Sistemas sob medida (ERPs e Dashboards) para governança e tomada de decisão em tempo real.",
    details:
      "Desenvolvemos ERPs, painéis executivos e fluxos de aprovação com confiabilidade operacional para ambientes em que erro custa caro.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80",
    highlights: ["ERPs sob medida", "Dashboards críticos", "Tomada de decisão"],
    route: "/sistemainterno",
  },
];
