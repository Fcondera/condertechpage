export interface TechnologyService {
  name: string;
  shortName: string;
  description: string;
  keywords: string[];
}

export const technologyServices: TechnologyService[] = [
  {
    name: "Desenvolvimento de sites e portais",
    shortName: "Sites e portais",
    description:
      "Sites institucionais, portais corporativos, landing pages e aplicações web rápidas, responsivas e preparadas para SEO.",
    keywords: [
      "criação de sites",
      "desenvolvimento web",
      "portal corporativo",
      "landing page",
    ],
  },
  {
    name: "Sistemas, aplicativos e software sob medida",
    shortName: "Software sob medida",
    description:
      "Sistemas web, aplicativos, ERPs, CRMs, plataformas SaaS e integrações desenvolvidas para processos específicos.",
    keywords: [
      "sistema personalizado",
      "aplicativo",
      "ERP",
      "CRM",
      "software sob medida",
    ],
  },
  {
    name: "Inteligência artificial e automação",
    shortName: "IA e automação",
    description:
      "Agentes de IA, chatbots, modelos de linguagem, automação de tarefas, atendimento e análise inteligente de dados.",
    keywords: [
      "inteligência artificial",
      "agente de IA",
      "chatbot",
      "automação",
      "LLM",
    ],
  },
  {
    name: "E-commerce e tecnologia para varejo",
    shortName: "Varejo e e-commerce",
    description:
      "Lojas virtuais, marketplaces, integrações de pagamento, estoque, pedidos, fidelização e operação omnichannel.",
    keywords: [
      "loja virtual",
      "e-commerce",
      "marketplace",
      "varejo digital",
      "omnichannel",
    ],
  },
  {
    name: "Monitoramento de PDV para mercados e lojas",
    shortName: "Monitoramento de PDV",
    description:
      "Monitoramento de frente de caixa, disponibilidade de terminais, vendas, filas, equipamentos e indicadores do ponto de venda.",
    keywords: [
      "monitoramento PDV",
      "PDV para mercado",
      "frente de caixa",
      "monitoramento de loja",
      "sistema para supermercado",
    ],
  },
  {
    name: "Painéis de LED e comunicação digital",
    shortName: "Painéis de LED",
    description:
      "Projetos de painel de LED, digital signage, videowall, mídia indoor e gerenciamento remoto de conteúdo para empresas e eventos.",
    keywords: [
      "painel de LED",
      "digital signage",
      "videowall",
      "mídia indoor",
      "painel eletrônico",
    ],
  },
  {
    name: "Dados, BI e dashboards",
    shortName: "Dados e BI",
    description:
      "Dashboards gerenciais, Business Intelligence, indicadores, data warehouse, relatórios e análise de dados em tempo real.",
    keywords: [
      "Business Intelligence",
      "dashboard",
      "análise de dados",
      "Power BI",
      "indicadores",
    ],
  },
  {
    name: "IoT, sensores e monitoramento de ativos",
    shortName: "IoT e telemetria",
    description:
      "Internet das Coisas, telemetria, sensores, rastreamento e monitoramento remoto de máquinas, ambientes e operações.",
    keywords: [
      "IoT",
      "telemetria",
      "sensores",
      "monitoramento de ativos",
      "rastreamento",
    ],
  },
  {
    name: "Cloud, servidores e infraestrutura",
    shortName: "Cloud e infraestrutura",
    description:
      "Arquitetura em nuvem, servidores, bancos de dados, redes, backup, observabilidade, implantação e sustentação.",
    keywords: [
      "cloud computing",
      "servidores",
      "infraestrutura de TI",
      "redes",
      "backup",
    ],
  },
  {
    name: "Cibersegurança e proteção de dados",
    shortName: "Cibersegurança",
    description:
      "Diagnóstico de segurança, controle de acesso, proteção de aplicações, continuidade, governança e adequação à LGPD.",
    keywords: [
      "cibersegurança",
      "segurança da informação",
      "LGPD",
      "controle de acesso",
      "proteção de dados",
    ],
  },
  {
    name: "Integrações, APIs e automação de processos",
    shortName: "Integrações e APIs",
    description:
      "Integração entre sistemas, APIs, gateways, automação de processos e conexão com plataformas de terceiros.",
    keywords: [
      "integração de sistemas",
      "API",
      "automação de processos",
      "gateway",
      "RPA",
    ],
  },
  {
    name: "Consultoria, suporte e transformação digital",
    shortName: "Consultoria de tecnologia",
    description:
      "Diagnóstico, planejamento, modernização de sistemas, suporte técnico e estratégia de transformação digital.",
    keywords: [
      "consultoria de TI",
      "suporte de tecnologia",
      "transformação digital",
      "modernização",
      "outsourcing de TI",
    ],
  },
];

export const technologyKeywords = technologyServices.flatMap(
  (service) => service.keywords,
);
