"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "pt-BR" | "en" | "es";

// ─── PT-BR (base) ────────────────────────────────────────────────────────────
const ptBR = {
  nav: {
    produtos: "Produtos",
    portfolio: "Portfólio",
    sobre: "Sobre",
    faq: "FAQ",
    contato: "Contato",
    cta: "Falar Conosco",
    items: [
      { label: "E-commerce", href: "/ecommerce" },
      { label: "Sites Institucionais", href: "/landing" },
      { label: "Sistemas Internos", href: "/sistemainterno" },
      { label: "Plataformas de Ensino", href: "/plataformaensino" },
      { label: "Inteligência Artificial", href: "/ima" },
      { label: "Consultoria", href: "/#contato" },
    ],
  },
  hero: {
    headline1: "Tecnologia que conecta empresas à",
    accent: "inovação real.",
    sub: "Desenvolvemos sistemas ERP, websites e soluções digitais com performance, eficiência e escalabilidade. Transformamos desafios em crescimento.",
    stats: [
      { value: "50+", label: "Empresas Atendidas" },
      { value: "200+", label: "Projetos Entregues" },
      { value: "5 anos", label: "No Mercado" },
      { value: "99,9%", label: "Uptime Médio" },
    ],
  },
  services: {
    eyebrow: "Verticais de negócio",
    headline1: "Engenharia aplicada a operações que exigem",
    accent: "escala.",
    cta: "Ver serviço",
    items: [
      {
        eyebrow: "Varejo & E-commerce",
        title: "Varejo & E-commerce",
        description:
          "Arquiteturas transacionais de alta volumetria focadas em máxima conversão e recorrência.",
        highlights: ["Alta volumetria", "Máxima conversão", "Recorrência"],
        route: "/ecommerce",
      },
      {
        eyebrow: "Agro & Indústria",
        title: "Agro & Indústria",
        description:
          "Monitoramento de ativos, controle de produção e inteligência embarcada para cadeias complexas.",
        highlights: [
          "Ativos conectados",
          "Produção em tempo real",
          "Inteligência embarcada",
        ],
        route: "/estoque",
      },
      {
        eyebrow: "Operações Críticas",
        title: "Operações Críticas",
        description:
          "Sistemas sob medida (ERPs e Dashboards) para governança e tomada de decisão em tempo real.",
        highlights: [
          "ERPs sob medida",
          "Dashboards críticos",
          "Tomada de decisão",
        ],
        route: "/sistemainterno",
      },
    ],
  },
  whyChoose: {
    eyebrow: "Diferenciais",
    headline1: "Por que a",
    accent: "ConderTech?",
    benefits: [
      {
        title: "Engenharia de Squads",
        description:
          "Times de elite integrados à sua cultura técnica para acelerar o roadmap sem inércia.",
      },
      {
        title: "Governança & Blindagem",
        description:
          "Arquiteturas resilientes em conformidade com padrões globais de segurança e auditoria de dados.",
      },
      {
        title: "IA Aplicada ao ROI",
        description:
          "Inteligência Artificial focada em eficiência operacional e geração de lucro real, não apenas inovação visual.",
      },
    ],
  },
  about: {
    eyebrow: "Sobre",
    headline1: "A espinha dorsal digital para operações de",
    accent: "elite",
    body1:
      "A ConderTech nasceu da necessidade de um parceiro tecnológico que realmente entende operações empresariais complexas.",
    body2:
      "Não terceirizamos o pensamento estratégico — cada projeto recebe atenção total da nossa equipe sênior.",
    pillars: [
      {
        title: "Precisão Cirúrgica",
        description:
          "Cada linha de código é estrategicamente projetada para resolver problemas reais de negócio, não apenas funcionar.",
      },
      {
        title: "Velocidade Controlada",
        description:
          "Entregamos rápido sem comprometer qualidade. Metodologias ágeis aplicadas com disciplina de engenharia.",
      },
      {
        title: "Segurança como Base",
        description:
          "Arquiteturas resilientes desde o primeiro commit. Compliance e governança não são opcionais.",
      },
    ],
  },
  process: {
    eyebrow: "Metodologia",
    headline1: "Como",
    accent: "trabalhamos",
    sub: "Um processo estruturado que elimina riscos e garante previsibilidade do primeiro contato até a operação em escala.",
    deliveries: "Entregas:",
    cta_text: "Pronto para transformar sua operação?",
    cta_button: "Falar com especialista",
    steps: [
      {
        number: "01",
        title: "Descoberta & Estratégia",
        description:
          "Imersão profunda no seu negócio. Mapeamos dores, objetivos e arquitetamos a solução ideal.",
        deliverables: [
          "Workshop estratégico",
          "Análise de viabilidade",
          "Documentação técnica",
        ],
      },
      {
        number: "02",
        title: "Engenharia & Desenvolvimento",
        description:
          "Squads dedicados desenvolvem com metodologias ágeis, entregas incrementais e comunicação transparente.",
        deliverables: [
          "Sprints semanais",
          "Code reviews rigorosos",
          "Testes automatizados",
        ],
      },
      {
        number: "03",
        title: "Deploy & Go-Live",
        description:
          "Infraestrutura cloud resiliente, monitoramento 24/7 e migração de dados sem interrupção de operação.",
        deliverables: [
          "CI/CD configurado",
          "Treinamento de equipes",
          "Documentação completa",
        ],
      },
      {
        number: "04",
        title: "Evolução Contínua",
        description:
          "Suporte técnico especializado, melhorias incrementais e roadmap de evolução alinhado ao crescimento.",
        deliverables: ["SLA garantido", "Updates regulares", "Novas features"],
      },
    ],
  },
  industries: {
    eyebrow: "Setores",
    headline1: "Experiência",
    accent: "multissetorial",
    items: [
      {
        name: "E-commerce",
        description:
          "Plataformas completas de vendas online com marketplace regional integrado",
      },
      {
        name: "Educação",
        description:
          "Sistemas de gestão educacional e plataformas de ensino adaptativo",
      },
      {
        name: "Financeiro",
        description:
          "Soluções seguras para fintechs e instituições financeiras",
      },
      {
        name: "Saúde",
        description:
          "Sistemas de gestão hospitalar e clínicas com conformidade LGPD",
      },
      {
        name: "Varejo",
        description: "PDV integrado, gestão de estoque e analytics de vendas",
      },
      {
        name: "Logística",
        description:
          "Rastreamento em tempo real e otimização de rotas e frotas",
      },
      {
        name: "Indústria",
        description:
          "Automação de processos produtivos e integração com maquinário",
      },
      {
        name: "Serviços",
        description: "CRM customizado e plataformas de atendimento ao cliente",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    headline1: "Perguntas",
    accent: "Frequentes",
    not_found: "Não encontrou a resposta que procurava?",
    cta: "Entre em Contato",
    items: [
      {
        question: "Como funciona o modelo de trabalho da ConderTech?",
        answer:
          "Atuamos como um squad recorrente sob demanda. Em vez de você montar e gerir um time interno, a ConderTech entra como estrutura técnica contínua para sustentar, evoluir e escalar o seu produto com acompanhamento estratégico.",
      },
      {
        question: "Vocês também fazem desenvolvimento personalizado?",
        answer:
          "Sim. Além dos planos recorrentes, também desenvolvemos soluções sob medida para necessidades específicas, como sistemas internos, plataformas, automações, integrações, e-commerces e produtos digitais com escopo estratégico definido.",
      },
      {
        question: "A ConderTech cria agentes de IA e automações inteligentes?",
        answer:
          "Sim. Projetamos e implementamos agentes de IA, fluxos de automação, integrações com modelos generativos e soluções operacionais com inteligência artificial para atendimento, produtividade, suporte interno e ganho de escala.",
      },
      {
        question: "É possível integrar com sistemas que já uso?",
        answer:
          "Com certeza. Temos experiência com integrações via API REST, webhooks e conectores nativos com ferramentas como ERPs, CRMs, gateways de pagamento e plataformas de e-commerce.",
      },
      {
        question: "Como funciona o processo de orçamento?",
        answer:
          "Após o primeiro contato, realizamos uma reunião de Discovery para entender profundamente o seu cenário. Com base nisso, entregamos uma proposta técnica detalhada com escopo, prazo e investimento.",
      },
      {
        question: "Vocês atendem empresas de qualquer lugar do Brasil?",
        answer:
          "Sim. Operamos de forma remota com empresas de diferentes regiões do Brasil. Mantemos comunicação estruturada, rotina de acompanhamento e cadência de execução para garantir previsibilidade, qualidade e velocidade nas entregas.",
      },
    ],
  },
  contact: {
    eyebrow: "Contato",
    headline1: "Vamos começar seu",
    accent: "projeto?",
    body: "Fale com nossa equipe. Entendemos seu negócio e apresentamos a solução mais adequada para o seu crescimento.",
    name_label: "Nome",
    name_placeholder: "Seu nome",
    email_label: "E-mail",
    email_placeholder: "Seu e-mail",
    message_label: "Mensagem",
    message_placeholder: "Descreva seu projeto...",
    submit: "Enviar Mensagem",
    budget_cta: "Simular Orçamento",
    error_email: "E-mail inválido",
    error_message: "Mensagem deve ter no mínimo 10 caracteres",
  },
  footer: {
    rights: "© 2025 ConderTech. Todos os direitos reservados.",
    privacy: "Política de Privacidade",
    terms: "Termos de Uso",
  },
};

// ─── Type alias ─────────────────────────────────────────────────────────────
type T = typeof ptBR;

// ─── EN ──────────────────────────────────────────────────────────────────────
const en: T = {
  nav: {
    produtos: "Products",
    portfolio: "Portfolio",
    sobre: "About",
    faq: "FAQ",
    contato: "Contact",
    cta: "Talk to Us",
    items: [
      { label: "E-commerce", href: "/ecommerce" },
      { label: "Institutional Websites", href: "/landing" },
      { label: "Internal Systems", href: "/sistemainterno" },
      { label: "Learning Platforms", href: "/plataformaensino" },
      { label: "Artificial Intelligence", href: "/ima" },
      { label: "Consulting", href: "/#contato" },
    ],
  },
  hero: {
    headline1: "Technology that connects companies to",
    accent: "real innovation.",
    sub: "We develop ERP systems, websites, and digital solutions with performance, efficiency, and scalability. We turn challenges into growth.",
    stats: [
      { value: "50+", label: "Companies Served" },
      { value: "200+", label: "Projects Delivered" },
      { value: "5 years", label: "In the Market" },
      { value: "99.9%", label: "Avg. Uptime" },
    ],
  },
  services: {
    eyebrow: "Business Verticals",
    headline1: "Engineering applied to operations that demand",
    accent: "scale.",
    cta: "View service",
    items: [
      {
        eyebrow: "Retail & E-commerce",
        title: "Retail & E-commerce",
        description:
          "High-volume transactional architectures focused on maximum conversion and recurrence.",
        highlights: ["High volume", "Max conversion", "Recurrence"],
        route: "/ecommerce",
      },
      {
        eyebrow: "Agro & Industry",
        title: "Agro & Industry",
        description:
          "Asset monitoring, production control, and embedded intelligence for complex supply chains.",
        highlights: [
          "Connected assets",
          "Real-time production",
          "Embedded intelligence",
        ],
        route: "/estoque",
      },
      {
        eyebrow: "Critical Operations",
        title: "Critical Operations",
        description:
          "Custom-built systems (ERPs & Dashboards) for real-time governance and decision-making.",
        highlights: ["Custom ERPs", "Critical dashboards", "Decision-making"],
        route: "/sistemainterno",
      },
    ],
  },
  whyChoose: {
    eyebrow: "Our difference",
    headline1: "Why",
    accent: "ConderTech?",
    benefits: [
      {
        title: "Squad Engineering",
        description:
          "Elite teams integrated into your technical culture to accelerate the roadmap without inertia.",
      },
      {
        title: "Governance & Shield",
        description:
          "Resilient architectures compliant with global security and data audit standards.",
      },
      {
        title: "AI Applied to ROI",
        description:
          "Artificial Intelligence focused on operational efficiency and real profit generation, not just visual innovation.",
      },
    ],
  },
  about: {
    eyebrow: "About",
    headline1: "The digital backbone for",
    accent: "elite operations",
    body1:
      "ConderTech was born from the need for a technology partner that truly understands complex business operations.",
    body2:
      "We don't outsource strategic thinking — every project receives full attention from our senior team.",
    pillars: [
      {
        title: "Surgical Precision",
        description:
          "Every line of code is strategically designed to solve real business problems, not just to work.",
      },
      {
        title: "Controlled Speed",
        description:
          "We deliver fast without compromising quality. Agile methodologies applied with engineering discipline.",
      },
      {
        title: "Security as a Foundation",
        description:
          "Resilient architectures from the first commit. Compliance and governance are not optional.",
      },
    ],
  },
  process: {
    eyebrow: "Methodology",
    headline1: "How we",
    accent: "work",
    sub: "A structured process that eliminates risk and guarantees predictability from first contact to scaled operations.",
    deliveries: "Deliverables:",
    cta_text: "Ready to transform your operations?",
    cta_button: "Talk to an expert",
    steps: [
      {
        number: "01",
        title: "Discovery & Strategy",
        description:
          "Deep immersion into your business. We map pain points, objectives and architect the ideal solution.",
        deliverables: [
          "Strategic workshop",
          "Feasibility analysis",
          "Technical documentation",
        ],
      },
      {
        number: "02",
        title: "Engineering & Development",
        description:
          "Dedicated squads develop with agile methodologies, incremental deliveries and transparent communication.",
        deliverables: [
          "Weekly sprints",
          "Rigorous code reviews",
          "Automated testing",
        ],
      },
      {
        number: "03",
        title: "Deploy & Go-Live",
        description:
          "Resilient cloud infrastructure, 24/7 monitoring, and data migration without operational downtime.",
        deliverables: [
          "CI/CD configured",
          "Team training",
          "Full documentation",
        ],
      },
      {
        number: "04",
        title: "Continuous Evolution",
        description:
          "Specialized technical support, incremental improvements, and an evolution roadmap aligned with growth.",
        deliverables: ["Guaranteed SLA", "Regular updates", "New features"],
      },
    ],
  },
  industries: {
    eyebrow: "Industries",
    headline1: "Multi-sector",
    accent: "experience",
    items: [
      {
        name: "E-commerce",
        description:
          "Complete online sales platforms with integrated regional marketplace",
      },
      {
        name: "Education",
        description:
          "Educational management systems and adaptive learning platforms",
      },
      {
        name: "Finance",
        description: "Secure solutions for fintechs and financial institutions",
      },
      {
        name: "Healthcare",
        description: "Hospital and clinic management systems with compliance",
      },
      {
        name: "Retail",
        description:
          "Integrated POS, inventory management, and sales analytics",
      },
      {
        name: "Logistics",
        description: "Real-time tracking and route and fleet optimization",
      },
      {
        name: "Industry",
        description:
          "Automation of productive processes and machinery integration",
      },
      {
        name: "Services",
        description: "Custom CRM and customer service platforms",
      },
    ],
  },
  faq: {
    eyebrow: "Questions",
    headline1: "Frequently Asked",
    accent: "Questions",
    not_found: "Didn't find the answer you were looking for?",
    cta: "Contact Us",
    items: [
      {
        question: "How does ConderTech's work model work?",
        answer:
          "We operate as an on-demand recurring squad. Instead of you building and managing an internal team, ConderTech enters as a continuous technical structure to sustain, evolve, and scale your product with strategic oversight.",
      },
      {
        question: "Do you also do custom development?",
        answer:
          "Yes. In addition to recurring plans, we also develop custom solutions for specific needs, such as internal systems, platforms, automations, integrations, e-commerces, and digital products with defined strategic scope.",
      },
      {
        question:
          "Does ConderTech create AI agents and intelligent automations?",
        answer:
          "Yes. We design and implement AI agents, automation workflows, integrations with generative models, and AI-powered operational solutions for customer service, productivity, internal support, and scale.",
      },
      {
        question: "Can you integrate with systems I already use?",
        answer:
          "Absolutely. We have experience with integrations via REST API, webhooks, and native connectors with tools such as ERPs, CRMs, payment gateways, and e-commerce platforms.",
      },
      {
        question: "How does the budgeting process work?",
        answer:
          "After first contact, we hold a Discovery meeting to deeply understand your situation. Based on this, we deliver a detailed technical proposal with scope, timeline, and investment.",
      },
      {
        question: "Do you serve companies from anywhere in Brazil?",
        answer:
          "Yes. We operate remotely with companies from different regions of Brazil. We maintain structured communication, monitoring routines, and execution cadence to ensure predictability, quality, and speed in deliveries.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    headline1: "Let's start your",
    accent: "project?",
    body: "Talk to our team. We understand your business and present the most suitable solution for your growth.",
    name_label: "Name",
    name_placeholder: "Your name",
    email_label: "E-mail",
    email_placeholder: "Your e-mail",
    message_label: "Message",
    message_placeholder: "Describe your project...",
    submit: "Send Message",
    budget_cta: "Simulate Budget",
    error_email: "Invalid e-mail",
    error_message: "Message must be at least 10 characters",
  },
  footer: {
    rights: "© 2025 ConderTech. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
  },
};

// ─── ES ──────────────────────────────────────────────────────────────────────
const es: T = {
  nav: {
    produtos: "Productos",
    portfolio: "Portafolio",
    sobre: "Nosotros",
    faq: "Preguntas",
    contato: "Contacto",
    cta: "Hablar con Nosotros",
    items: [
      { label: "E-commerce", href: "/ecommerce" },
      { label: "Sitios Institucionales", href: "/landing" },
      { label: "Sistemas Internos", href: "/sistemainterno" },
      { label: "Plataformas de Aprendizaje", href: "/plataformaensino" },
      { label: "Inteligencia Artificial", href: "/ima" },
      { label: "Consultoría", href: "/#contato" },
    ],
  },
  hero: {
    headline1: "Tecnología que conecta empresas a la",
    accent: "innovación real.",
    sub: "Desarrollamos sistemas ERP, sitios web y soluciones digitales con rendimiento, eficiencia y escalabilidad. Transformamos desafíos en crecimiento.",
    stats: [
      { value: "50+", label: "Empresas Atendidas" },
      { value: "200+", label: "Proyectos Entregados" },
      { value: "5 años", label: "En el Mercado" },
      { value: "99,9%", label: "Uptime Promedio" },
    ],
  },
  services: {
    eyebrow: "Verticales de negocio",
    headline1: "Ingeniería aplicada a operaciones que requieren",
    accent: "escala.",
    cta: "Ver servicio",
    items: [
      {
        eyebrow: "Comercio & E-commerce",
        title: "Comercio & E-commerce",
        description:
          "Arquitecturas transaccionales de alto volumen enfocadas en máxima conversión y recurrencia.",
        highlights: ["Alto volumen", "Máxima conversión", "Recurrencia"],
        route: "/ecommerce",
      },
      {
        eyebrow: "Agro & Industria",
        title: "Agro & Industria",
        description:
          "Monitoreo de activos, control de producción e inteligencia embebida para cadenas complejas.",
        highlights: [
          "Activos conectados",
          "Producción en tiempo real",
          "Inteligencia embebida",
        ],
        route: "/estoque",
      },
      {
        eyebrow: "Operaciones Críticas",
        title: "Operaciones Críticas",
        description:
          "Sistemas a medida (ERPs y Dashboards) para gobernanza y toma de decisiones en tiempo real.",
        highlights: [
          "ERPs a medida",
          "Dashboards críticos",
          "Toma de decisiones",
        ],
        route: "/sistemainterno",
      },
    ],
  },
  whyChoose: {
    eyebrow: "Nuestra diferencia",
    headline1: "¿Por qué",
    accent: "ConderTech?",
    benefits: [
      {
        title: "Ingeniería de Squads",
        description:
          "Equipos de élite integrados a tu cultura técnica para acelerar el roadmap sin inercia.",
      },
      {
        title: "Gobernanza & Blindaje",
        description:
          "Arquitecturas resilientes en conformidad con estándares globales de seguridad y auditoría de datos.",
      },
      {
        title: "IA Aplicada al ROI",
        description:
          "Inteligencia Artificial enfocada en eficiencia operacional y generación de beneficios reales.",
      },
    ],
  },
  about: {
    eyebrow: "Nosotros",
    headline1: "La columna vertebral digital para operaciones de",
    accent: "élite",
    body1:
      "ConderTech nació de la necesidad de un socio tecnológico que realmente entiende operaciones empresariales complejas.",
    body2:
      "No externalizamos el pensamiento estratégico — cada proyecto recibe atención total de nuestro equipo senior.",
    pillars: [
      {
        title: "Precisión Quirúrgica",
        description:
          "Cada línea de código está estratégicamente diseñada para resolver problemas reales de negocio.",
      },
      {
        title: "Velocidad Controlada",
        description:
          "Entregamos rápido sin comprometer la calidad. Metodologías ágiles con disciplina de ingeniería.",
      },
      {
        title: "Seguridad como Base",
        description:
          "Arquitecturas resilientes desde el primer commit. El cumplimiento no es opcional.",
      },
    ],
  },
  process: {
    eyebrow: "Metodología",
    headline1: "Cómo",
    accent: "trabajamos",
    sub: "Un proceso estructurado que elimina riesgos y garantiza previsibilidad desde el primer contacto hasta la operación a escala.",
    deliveries: "Entregas:",
    cta_text: "¿Listo para transformar tu operación?",
    cta_button: "Hablar con un experto",
    steps: [
      {
        number: "01",
        title: "Descubrimiento & Estrategia",
        description:
          "Inmersión profunda en tu negocio. Mapeamos dolores, objetivos y diseñamos la solución ideal.",
        deliverables: [
          "Taller estratégico",
          "Análisis de viabilidad",
          "Documentación técnica",
        ],
      },
      {
        number: "02",
        title: "Ingeniería & Desarrollo",
        description:
          "Squads dedicados desarrollan con metodologías ágiles, entregas incrementales y comunicación transparente.",
        deliverables: [
          "Sprints semanales",
          "Revisiones de código",
          "Tests automatizados",
        ],
      },
      {
        number: "03",
        title: "Deploy & Go-Live",
        description:
          "Infraestructura cloud resiliente, monitoreo 24/7 y migración de datos sin interrupción operativa.",
        deliverables: [
          "CI/CD configurado",
          "Capacitación de equipos",
          "Documentación completa",
        ],
      },
      {
        number: "04",
        title: "Evolución Continua",
        description:
          "Soporte técnico especializado, mejoras incrementales y roadmap de evolución alineado al crecimiento.",
        deliverables: [
          "SLA garantizado",
          "Actualizaciones regulares",
          "Nuevas funciones",
        ],
      },
    ],
  },
  industries: {
    eyebrow: "Sectores",
    headline1: "Experiencia",
    accent: "multisectorial",
    items: [
      {
        name: "E-commerce",
        description:
          "Plataformas completas de ventas online con marketplace integrado",
      },
      {
        name: "Educación",
        description:
          "Sistemas de gestión educativa y plataformas de aprendizaje adaptativo",
      },
      {
        name: "Financiero",
        description:
          "Soluciones seguras para fintechs e instituciones financieras",
      },
      {
        name: "Salud",
        description:
          "Sistemas de gestión hospitalaria y clínicas con cumplimiento normativo",
      },
      {
        name: "Comercio",
        description:
          "TPV integrado, gestión de inventario y análisis de ventas",
      },
      {
        name: "Logística",
        description:
          "Seguimiento en tiempo real y optimización de rutas y flotas",
      },
      {
        name: "Industria",
        description:
          "Automatización de procesos productivos e integración con maquinaria",
      },
      {
        name: "Servicios",
        description: "CRM personalizado y plataformas de atención al cliente",
      },
    ],
  },
  faq: {
    eyebrow: "Dudas",
    headline1: "Preguntas",
    accent: "Frecuentes",
    not_found: "¿No encontraste la respuesta que buscabas?",
    cta: "Contáctanos",
    items: [
      {
        question: "¿Cómo funciona el modelo de trabajo de ConderTech?",
        answer:
          "Operamos como un squad recurrente bajo demanda. En lugar de que armes y gestiones un equipo interno, ConderTech entra como estructura técnica continua para sostener, evolucionar y escalar tu producto con seguimiento estratégico.",
      },
      {
        question: "¿También hacen desarrollo personalizado?",
        answer:
          "Sí. Además de los planes recurrentes, también desarrollamos soluciones a medida para necesidades específicas, como sistemas internos, plataformas, automatizaciones, integraciones y e-commerces.",
      },
      {
        question:
          "¿ConderTech crea agentes de IA y automatizaciones inteligentes?",
        answer:
          "Sí. Diseñamos e implementamos agentes de IA, flujos de automatización e integraciones con modelos generativos para atención, productividad y escala operacional.",
      },
      {
        question: "¿Pueden integrarse con sistemas que ya uso?",
        answer:
          "Por supuesto. Tenemos experiencia con integraciones vía API REST, webhooks y conectores nativos con ERPs, CRMs, pasarelas de pago y plataformas de e-commerce.",
      },
      {
        question: "¿Cómo funciona el proceso de cotización?",
        answer:
          "Después del primer contacto, realizamos una reunión de Discovery para entender profundamente tu situación. Con base en esto, entregamos una propuesta técnica detallada con alcance, plazo e inversión.",
      },
      {
        question: "¿Atienden empresas de cualquier lugar?",
        answer:
          "Sí. Operamos de forma remota con empresas de diferentes regiones. Mantenemos comunicación estructurada y cadencia de ejecución para garantizar previsibilidad, calidad y velocidad en las entregas.",
      },
    ],
  },
  contact: {
    eyebrow: "Contacto",
    headline1: "¿Empecemos tu",
    accent: "proyecto?",
    body: "Habla con nuestro equipo. Entendemos tu negocio y presentamos la solución más adecuada para tu crecimiento.",
    name_label: "Nombre",
    name_placeholder: "Tu nombre",
    email_label: "E-mail",
    email_placeholder: "Tu e-mail",
    message_label: "Mensaje",
    message_placeholder: "Describe tu proyecto...",
    submit: "Enviar Mensaje",
    budget_cta: "Simular Presupuesto",
    error_email: "E-mail inválido",
    error_message: "El mensaje debe tener al menos 10 caracteres",
  },
  footer: {
    rights: "© 2025 ConderTech. Todos los derechos reservados.",
    privacy: "Política de Privacidad",
    terms: "Términos de Uso",
  },
};

// ─── Translations map ────────────────────────────────────────────────────────
const translations: Record<Lang, T> = { "pt-BR": ptBR, en, es };

// ─── Context ─────────────────────────────────────────────────────────────────
interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: T;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt-BR");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
