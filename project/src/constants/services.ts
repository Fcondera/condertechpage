import { Globe, ShoppingCart, Settings, Palette } from "lucide-react";
import type { Service } from "../types";

export const SERVICES: Service[] = [
  {
    icon: Globe,
    industry: "Agro e Industria",
    eyebrow: "Sites institucionais e landing pages",
    title: "Presenca Digital de Alta Conversao",
    description:
      "Estruturamos presenca digital para empresas do agro e da industria, com paginas rapidas, claras e orientadas a geracao de demanda.",
    details:
      "Aplicamos estrategia de posicionamento, SEO tecnico e narrativa comercial para transformar trafego em reuniao comercial.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80",
    highlights: ["SEO e performance", "Landing pages", "Geracao de leads"],
    route: "/landing",
  },
  {
    icon: ShoppingCart,
    industry: "Varejo e D2C",
    eyebrow: "Comercio digital e operacao de vendas",
    title: "E-commerce e Escala de Receita",
    description:
      "Desenvolvemos e-commerces com foco em margem, ticket medio e recorrencia para marcas que precisam crescer com previsibilidade.",
    details:
      "Desenhamos catalogo, checkout, promocoes e integracoes para dar fluidez a jornada e reduzir abandono de carrinho.",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1920&q=80",
    highlights: ["Checkout fluido", "Catalogo escalavel", "Integracoes de pagamento"],
    route: "/ecommerce",
  },
  {
    icon: Settings,
    industry: "Industria e Logistica",
    eyebrow: "Sistemas internos sob medida",
    title: "Sistemas Operacionais e Gestao",
    description:
      "Criamos sistemas internos para operacao critica, conectando areas e reduzindo gargalos de processo em tempo real.",
    details:
      "De paineis gerenciais a automacoes de rotina, entregamos software que acompanha a realidade da operacao e melhora decisao.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80",
    highlights: ["Dashboards", "Automacao", "Permissoes e fluxos"],
    route: "/sistemainterno",
  },
  {
    icon: Palette,
    industry: "SaaS, Fintech e Servicos",
    eyebrow: "UI/UX para produto digital",
    title: "Design de Produto e Experiencia",
    description:
      "Construimos interfaces fortes para negocios digitais que querem aumentar percepcao de valor e melhorar conversao.",
    details:
      "Definimos arquitetura de interface, sistema visual e fluxo de uso para reduzir friccao e aumentar retencao.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1920&q=80",
    highlights: ["Design system", "UX orientado a KPI", "Consistencia visual"],
    route: "/uiux",
  },
  {
    icon: Settings,
    industry: "Atacado, Distribuicao e Agro",
    eyebrow: "Controle de estoque e operacao",
    title: "Gestao de Estoque e Movimentacao",
    description:
      "Implementamos gestao de estoque para operacoes com alto giro, reduzindo rupturas e melhorando previsibilidade de compra.",
    details:
      "Centralizamos entradas, saidas, alertas e indicadores para dar visibilidade completa de ponta a ponta na operacao.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80",
    highlights: ["Alertas criticos", "Rastreabilidade", "Visao em tempo real"],
    route: "/estoque",
  },
];
