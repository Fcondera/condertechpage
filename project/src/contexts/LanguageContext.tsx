"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { getLocalizedPath, stripLocalePrefix } from "@/utils/locale";

export type Lang = "pt-BR" | "en" | "es";

// ─── PT-BR (base) ────────────────────────────────────────────────────────────
const ptBR = {
  nav: {
    sobre: "Sobre",
    faq: "FAQ",
    contato: "Contato",
    cta: "Falar Conosco",
  },
  hero: {
    headline1: "Tecnologia sob medida para empresas que",
    accent: "precisam crescer com controle",
    question:
      "Sua empresa evoluiu, mas os processos continuam lentos, manuais ou espalhados em vários sistemas?",
    sub: "Desenvolvemos sistemas personalizados, automações e plataformas digitais que organizam operações, reduzem erros e ajudam empresas a crescer com mais eficiência, segurança e previsibilidade.",
    note: "Cada negócio possui processos, desafios e objetivos diferentes. Por isso, acreditamos que a tecnologia deve se adaptar à sua empresa, e não o contrário.",
    cta: "Falar com um Especialista",
  },
  why: {
    eyebrow: "Sistemas sob medida",
    headline1: "Por que um sistema",
    accent: "personalizado?",
    body1:
      "Sistemas genéricos costumam obrigar a empresa a adaptar seus processos, contratar funcionalidades que nunca serão utilizadas e conviver com limitações que surgem conforme o negócio cresce.",
    body2: "Um sistema personalizado é construído em torno da sua operação.",
    benefits: [
      "Processos alinhados à realidade da sua empresa",
      "Menos atividades manuais e menos retrabalho",
      "Informações centralizadas e confiáveis",
      "Maior controle sobre dados e indicadores",
      "Evolução contínua conforme as necessidades do negócio mudam",
    ],
    closing:
      "A tecnologia deixa de ser um obstáculo e passa a ser uma ferramenta para acelerar decisões e aumentar a eficiência operacional.",
  },
  value: {
    eyebrow: "Valor gerado",
    headline1: "Como a tecnologia gera valor para o",
    accent: "seu negócio",
    items: [
      {
        title: "Mais velocidade operacional",
        description:
          "Processos que antes dependiam de planilhas, e-mails ou controles paralelos passam a acontecer de forma integrada e automatizada.",
      },
      {
        title: "Menos erros e mais confiabilidade",
        description:
          "Regras de validação e automações reduzem inconsistências, retrabalho e falhas operacionais.",
      },
      {
        title: "Dados organizados e seguros",
        description:
          "Informações centralizadas permitem que a empresa trabalhe com mais confiança e preserve o conhecimento do negócio.",
      },
      {
        title: "Visibilidade do que realmente importa",
        description:
          "Transformamos dados operacionais em indicadores e métricas que apoiam decisões mais rápidas e estratégicas.",
      },
      {
        title: "Crescimento sustentável",
        description:
          "Criamos sistemas preparados para acompanhar a evolução da operação sem gerar complexidade desnecessária.",
      },
    ],
  },
  visual: {
    headline1: "Tecnologia de alto nível para operações que",
    accent: "não podem parar.",
    showcases: [
      {
        title: "Proteção total da sua empresa",
        description:
          "Blindamos os dados do seu negócio, controlamos quem acessa o quê e garantimos que informações confidenciais fiquem trancadas a sete chaves.",
      },
      {
        title: "Decisões rápidas e automáticas",
        description:
          "Transformamos seus dados de vendas e custos em relatórios automáticos. Chega de perder tempo preenchendo planilhas manualmente.",
      },
      {
        title: "Sua equipe em total sintonia",
        description:
          "Criamos ferramentas sob medida que conectam seus departamentos, eliminando erros de comunicação e os gargalos do dia a dia.",
      },
      {
        title: "Acesso seguro de qualquer lugar",
        description:
          "Seus funcionários acessam o que precisam com segurança e permissões controladas, sem expor a empresa a riscos ou vazamentos.",
      },
      {
        title: "Seu sistema sempre funcionando",
        description:
          "Cuidamos da estrutura para que o seu sistema nunca caia, antecipando falhas antes que elas atrapalhem as suas vendas ou sua operação.",
      },
      {
        title: "Tecnologia pronta para o crescimento",
        description:
          "Construímos sistemas que acompanham o ritmo do seu negócio. Sua empresa pode dobrar de tamanho e a tecnologia vai aguentar o tranco.",
      },
    ],
  },
  reliability: {
    heading: "Sistemas feitos para o seu negócio nunca parar",
    body1:
      "Nós não criamos apenas linhas de código; nós construímos a base que dá segurança para você tomar decisões e focar no crescimento da sua empresa. Desenvolvemos cada solução priorizando a estabilidade do seu negócio, o sigilo absoluto dos seus dados e uma estrutura forte que não deixa você na mão quando mais precisar.",
    body2:
      "A ConderTech é o parceiro tecnológico que traz tranquilidade para a sua rotina comercial.",
  },
  segments: {
    headline1: "Soluções especializadas para o seu",
    accent: "segmento",
    items: [
      {
        title: "Segurança",
        description:
          "Toda solução nasce com segurança como ponto de partida, protegendo seus dados e sistemas.",
      },
      {
        title: "E-commerce",
        description: "Tenha sua loja escalável com a ConderTech.",
      },
      {
        title: "Sistemas Personalizados",
        description: "Desenvolvimento personalizado para sua empresa.",
      },
      {
        title: "Infraestrutura",
        description:
          "Migração, estrutura segura, escalável e preparada para crescimento.",
      },
      {
        title: "Governo",
        description:
          "Conte com a ConderTech para gerenciar desafios da administração pública.",
      },
    ],
    prev: "Anterior",
    next: "Próximo",
    goTo: (title: string) => `Ir para ${title}`,
  },
  process: {
    eyebrow: "Metodologia",
    headline1: "Como",
    accent: "trabalhamos",
    cta_text: "Pronto para transformar sua operação?",
    cta_button: "Falar com especialista",
    steps: [
      {
        number: "01",
        title: "Descoberta e entendimento do negócio",
        description:
          "Começamos entendendo a realidade da sua empresa, seus processos, dificuldades e objetivos. Nosso primeiro compromisso é compreender o problema antes de propor qualquer solução.",
      },
      {
        number: "02",
        title: "Planejamento da solução",
        description:
          "Mapeamos processos, definimos prioridades e construímos uma visão clara do sistema que será desenvolvido. Você participa das decisões e possui visibilidade sobre o caminho que será seguido.",
      },
      {
        number: "03",
        title: "Desenvolvimento incremental",
        description:
          "Construímos o sistema em etapas curtas e evolutivas. Ao final de cada ciclo, apresentamos o que foi construído, coletamos feedback e validamos os próximos passos junto à sua equipe.",
      },
      {
        number: "04",
        title: "Evolução orientada por resultados",
        description:
          "Acompanhamos a utilização do sistema e direcionamos a evolução com base nos resultados obtidos. Funcionalidades que geram valor são aprimoradas; as demais são reavaliadas.",
      },
    ],
  },
  delivery: {
    eyebrow: "Pós-entrega",
    headline1: "A entrega é apenas o",
    accent: "começo",
    body1: "Não acreditamos em projetos que terminam quando o sistema entra em produção.",
    body2:
      "Acompanhamos nossos clientes após a entrega, oferecendo suporte, identificando oportunidades de melhoria e planejando novas evoluções conforme o negócio cresce.",
    body3:
      "Entendemos que empresas mudam, processos amadurecem e novos desafios surgem constantemente. Por isso, construímos sistemas preparados para evoluir.",
  },
  philosophy: {
    eyebrow: "Nossa filosofia",
    quote:
      "A tecnologia só faz sentido quando gera resultados concretos para as pessoas e para as empresas.",
    body1:
      "Trabalhamos lado a lado com nossos clientes porque acreditamos em relações de longo prazo, evolução contínua e construção conjunta.",
    body2:
      "O crescimento dos nossos clientes representa o crescimento da ConderTech. Esse é um dos princípios que orienta cada projeto que desenvolvemos.",
  },
  faq: {
    eyebrow: "FAQ",
    headline1: "Perguntas",
    accent: "Frequentes",
    not_found: "Não encontrou a resposta que procurava?",
    cta: "Entre em Contato",
    items: [
      {
        question:
          "Como funciona o processo de desenvolvimento de um sistema personalizado?",
        answer:
          "Seguimos um processo estruturado: primeiro entendemos a fundo o seu negócio, depois planejamos a solução com você, desenvolvemos em ciclos curtos e incrementais com entregas parciais, e evoluímos o sistema com base em resultados reais de uso.",
      },
      {
        question: "O suporte termina quando o sistema é entregue?",
        answer:
          "Não. Acompanhamos nossos clientes após a entrega, oferecendo suporte, identificando oportunidades de melhoria e planejando novas evoluções conforme o negócio cresce.",
      },
      {
        question: "A ConderTech cria agentes de IA e automações inteligentes?",
        answer:
          "Sim. Projetamos e implementamos agentes de IA, fluxos de automação, integrações com modelos generativos e soluções operacionais com inteligência artificial para atendimento, produtividade, suporte interno e ganho de escala.",
      },
      {
        question: "É possível integrar com sistemas que já uso?",
        answer:
          "Sim. Desenvolvemos integrações sob medida para conectar o seu sistema principal com outras ferramentas, sem que seja necessário substituí-lo por um sistema novo.",
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
    body: "Fale com nossa equipe. Vamos entender a realidade da sua empresa e apresentar a solução mais adequada para o seu crescimento.",
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
    tagline: "Onde a física do software alinha o seu sucesso.",
    contactHeading: "Contato",
    emailAriaLabel: (email: string) => `Enviar e-mail para ${email}`,
    phoneAriaLabel: (phone: string) => `Ligar para ${phone}`,
    instagramAriaLabel: "Seguir ConderTech no Instagram",
    instagramLabel: "Instagram",
    linksHeading: "Links",
    links: {
      solutions: "Soluções",
      terms: "Termos de Uso",
      governance: "Governança de Dados (LGPD)",
    },
    rights: (company: string) => `© 2020 ${company}. Todos os direitos reservados.`,
  },
  about: {
    heading1: "Tecnologia que ajuda o seu negócio a ",
    accent: "crescer com previsibilidade",
    intro:
      "Nascida em Blumenau, a ConderTech desenvolve sistemas, automações e plataformas digitais sob medida para empresas que precisam de mais controle sobre seus processos. Unimos rigor técnico e acompanhamento próximo para entregar soluções que funcionam no dia a dia da operação.",
    cards: [
      {
        title: "Sistemas sob medida",
        description:
          "Desenvolvemos sistemas pensados para a realidade do seu negócio, sem pacotes prontos que exigem adaptar sua operação.",
      },
      {
        title: "Segurança e governança de dados",
        description:
          "Priorizamos a proteção das suas informações e a conformidade com a LGPD em cada projeto que desenvolvemos.",
      },
      {
        title: "Automação e IA aplicada",
        description:
          "Desenvolvemos automações e soluções com inteligência artificial focadas em eficiência operacional, não em modismo.",
      },
    ],
    body1:
      "Não entregamos apenas um sistema pronto: acompanhamos a sua empresa para que a tecnologia continue funcionando conforme o negócio cresce e os processos mudam.",
    body2:
      "Trabalhamos lado a lado com quem toma as decisões na sua empresa, entendendo os processos antes de propor qualquer solução.",
    whyHeading: "Por que nos escolher?",
    checklist: [
      "Equipe acessível, que entende o seu negócio antes de propor soluções",
      "Arquiteturas preparadas para operações críticas, sem downtime",
      "Automação e IA aplicadas com foco em eficiência real",
      "Segurança e governança de dados desde o primeiro dia do projeto",
      "Decisões orientadas por dados confiáveis e atualizados",
      "Sistemas sob medida, sem funcionalidades que você nunca vai usar",
    ],
    ctaHeading: "Pronto para começar seu projeto?",
    ctaBody:
      "Fale com a nossa equipe e entenda como podemos ajudar a sua empresa a crescer com mais controle e eficiência.",
    ctaButton: "Falar com a Equipe",
  },
  terms: {
    eyebrow: "Termos de Uso",
    heading: "Condições gerais para utilização dos canais digitais da ConderTech.",
    paragraphs: [
      "Ao navegar pelos ambientes digitais da ConderTech, você concorda em utilizar os conteúdos, formulários e materiais disponibilizados de forma lícita, responsável e compatível com a finalidade institucional e comercial da plataforma.",
      "As informações apresentadas neste site possuem caráter informativo-comercial e podem ser atualizadas a qualquer momento, sem aviso prévio, para refletir mudanças de posicionamento, portfólio, processos internos ou exigências regulatórias.",
      "É vedado reproduzir, distribuir ou explorar indevidamente os materiais proprietários da ConderTech sem autorização expressa. O envio de dados por formulários deve ocorrer apenas por pessoas autorizadas a representar a organização interessada.",
      "Dúvidas sobre uso da plataforma, propostas comerciais ou condições específicas podem ser tratadas diretamente pelos canais oficiais de contato indicados no site.",
    ],
  },
  governance: {
    eyebrow: "Governança de Dados",
    heading: "Diretrizes de tratamento de dados alinhadas à LGPD.",
    paragraphs: [
      "A ConderTech trata dados pessoais com base em princípios de necessidade, finalidade, segurança e transparência, adotando controles técnicos e organizacionais compatíveis com a criticidade das informações processadas.",
      "Dados enviados por formulários, canais de contato e fluxos de atendimento podem ser utilizados para retorno comercial, qualificação de demanda, elaboração de propostas e manutenção do relacionamento institucional, sempre dentro de bases legais adequadas.",
      "Mantemos práticas voltadas à integridade, rastreabilidade e acesso controlado, com revisão periódica de processos para reforçar conformidade com a LGPD e padrões de governança aplicáveis às operações digitais que suportamos.",
      "Solicitações relacionadas a direitos do titular, atualização de dados ou esclarecimentos adicionais podem ser encaminhadas pelos canais oficiais informados no rodapé do site.",
    ],
  },
  budget: {
    header: { title: "Simulador de Orçamento", subtitle: "ConderTech - Soluções Digitais" },
    footer: {
      rights: "© 2020 ConderTech - Todos os direitos reservados",
      note: "Os valores apresentados são estimativas e podem variar",
    },
    progress: { step: "Etapa", of: "de" },
    nav: { back: "Voltar", next: "Próximo" },
    themeToggle: "Alternar tema",
    step1: {
      heading: "Qual tipo de projeto você precisa?",
      subtext: "Selecione a opção que melhor descreve seu projeto",
      types: {
        institutional: {
          title: "Site Institucional",
          description: "Site profissional para apresentar sua empresa e serviços",
        },
        "landing-page": {
          title: "Landing Page",
          description: "Página focada em conversão para produtos ou serviços",
        },
        ecommerce: {
          title: "Loja Virtual",
          description: "E-commerce completo para vender online",
        },
        "custom-system": {
          title: "Sistema Personalizado",
          description: "Sistema web customizado para sua necessidade",
        },
        "mobile-app": {
          title: "Aplicativo Mobile",
          description: "App nativo para iOS e Android",
        },
      },
    },
    step2: {
      heading: "Sobre o design do projeto",
      subtext: "Responda as perguntas abaixo",
      logoQuestion: "Sua empresa já possui logotipo?",
      logoYes: { title: "Sim, já tenho", description: "Usaremos seu logo existente" },
      logoNo: {
        title: "Não, preciso criar",
        description: "Criaremos um logo profissional (+R$ 500)",
      },
      premiumQuestion: "Deseja um design premium diferenciado?",
      designStandard: { title: "Design Padrão", description: "Design profissional e clean" },
      designPremium: {
        title: "Design Premium",
        description: "Design exclusivo e diferenciado (+R$ 2.000)",
      },
    },
    step3: {
      heading: "Conteúdo e estrutura",
      subtext: "Defina a quantidade de páginas e recursos de SEO",
      pagesQuestion: "Quantas páginas seu site terá?",
      pageSingular: "página",
      pagePlural: "páginas",
      includedInBase: "Incluído no preço base",
      extraPages: (cost: number) => `Páginas extras: +R$ ${cost}`,
      seoQuestion: "Precisa de otimização SEO inicial?",
      seoNo: { title: "Não precisa", description: "Podemos fazer depois se necessário" },
      seoYes: {
        title: "Sim, preciso de SEO",
        description: "Otimização completa para buscadores (+R$ 1.500)",
      },
    },
    step4: {
      heading: "Funcionalidades extras",
      subtext: "Selecione as funcionalidades que deseja adicionar (opcional)",
      features: {
        whatsapp: {
          title: "Integração WhatsApp",
          description: "Botão flutuante com link direto para seu WhatsApp Business",
        },
        blog: {
          title: "Sistema de Blog",
          description: "Blog completo com gerenciador de posts e categorias",
        },
        membersArea: {
          title: "Área de Membros",
          description: "Sistema de login e área restrita para usuários",
        },
        onlinePayment: {
          title: "Pagamento Online",
          description: "Integração com gateways de pagamento (Stripe, PayPal, etc)",
        },
      },
      tipLabel: "Dica:",
      tip: "Você pode adicionar ou remover funcionalidades depois do orçamento inicial",
    },
    step5: {
      heading: "Qual o segmento da sua empresa?",
      subtext: "Isso nos ajuda a personalizar melhor sua proposta",
      selectLabel: "Selecione o segmento",
      placeholder: "Selecione uma opção...",
      segments: [
        "Tecnologia",
        "Saúde e Bem-estar",
        "Educação",
        "E-commerce / Varejo",
        "Alimentação / Restaurantes",
        "Serviços Profissionais",
        "Construção / Engenharia",
        "Moda / Beleza",
        "Turismo / Hotelaria",
        "Finanças / Consultoria",
        "Indústria",
        "Agronegócio",
        "Entretenimento",
        "Imobiliário",
        "Automotivo",
        "ONGs / Instituições",
        "Outro",
      ],
      selectedLabel: "Segmento selecionado",
    },
    step6: {
      heading: "Descreva seu projeto",
      subtext: "Conte-nos mais sobre sua visão e objetivos",
      label: "Descrição do projeto",
      placeholder:
        "Ex: Preciso de um site institucional para minha empresa de consultoria. O objetivo é apresentar nossos serviços, publicar cases de sucesso e captar novos clientes...",
      minChars: (min: number, remaining: number) =>
        `Mínimo ${min} caracteres (faltam ${remaining})`,
      validDescription: "Descrição válida",
      tipsHeading: "Dicas para uma boa descrição:",
      tips: [
        "Qual é o objetivo principal do projeto?",
        "Quem é seu público-alvo?",
        "Tem alguma referência ou inspiração?",
        "Há algum prazo específico?",
        "Alguma funcionalidade específica não listada?",
      ],
      nextLabel: "Ver Orçamento",
    },
    step7: {
      heading: "Seu orçamento está pronto!",
      subtext: "Confira os detalhes e escolha como prosseguir",
      discountBadge: "Oferta exclusiva para primeira contratação: 50% de desconto",
      closeNowTitle: "Feche agora por apenas",
      from: "De",
      fixedPriceNote: "Valor fixo para fechar agora. Aproveite!",
      estimatedInvestment: "Investimento estimado",
      startingFrom: "A partir de",
      upTo: "Até",
      estimatedDeadline: (days: number) => `Prazo estimado: ${days} dias úteis`,
      includedHeading: "O que está incluso",
      formHeading: "Para enviar o orçamento, informe:",
      personTypePF: "Pessoa Física",
      personTypePJ: "Pessoa Jurídica",
      namePlaceholderPJ: "Nome da empresa",
      namePlaceholderPF: "Seu nome completo",
      nameError: "Por favor, informe seu nome ou o nome da empresa.",
      closeNow: "Fechar Agora",
      requestWhatsapp: "Solicitar pelo WhatsApp",
      newBudget: "Fazer novo orçamento",
    },
    included: {
      projectDescriptions: {
        institutional: "Site institucional profissional",
        "landing-page": "Landing page de alta conversão",
        ecommerce: "Loja virtual completa",
        "custom-system": "Sistema personalizado",
        "mobile-app": "Aplicativo mobile nativo",
      },
      logoCreation: "Criação de logotipo profissional",
      premiumDesign: "Design premium diferenciado",
      customPages: (n: number) => `${n} páginas customizadas`,
      includedPages: (n: number) => `${n} páginas incluídas`,
      seo: "Otimização SEO inicial completa",
      whatsappIntegration: "Integração com WhatsApp Business",
      blogSystem: "Sistema de blog completo",
      membersArea: "Área de membros com login",
      onlinePayment: "Integração com pagamento online",
      hosting: "Hospedagem por 12 meses",
      support: "Suporte técnico por 3 meses",
      ssl: "Certificado SSL grátis",
      responsive: "Design responsivo",
    },
    whatsapp: {
      greeting: "Olá! Gostaria de solicitar um orçamento.",
      companyLabel: "Empresa",
      nameLabel: "Nome",
      projectTypeLabel: "Tipo de projeto",
      pagesLabel: "Páginas",
      hasLogoLabel: "Possui logo",
      premiumLabel: "Design premium",
      seoLabel: "SEO",
      yes: "Sim",
      no: "Não",
      featuresLabel: "Funcionalidades",
      featureWhatsapp: "WhatsApp Business",
      featureBlog: "Blog",
      featureMembersArea: "Área de membros",
      featureOnlinePayment: "Pagamento online",
      noExtraFeatures: "Nenhuma funcionalidade extra",
      descriptionLabel: "Descrição",
      investmentLabel: "Investimento estimado",
      deadlineLabel: "Prazo estimado",
      daysUnit: "dias úteis",
    },
  },
};

// ─── Type alias ─────────────────────────────────────────────────────────────
export type Translations = typeof ptBR;
type T = Translations;

// ─── EN ──────────────────────────────────────────────────────────────────────
const en: T = {
  nav: {
    sobre: "About",
    faq: "FAQ",
    contato: "Contact",
    cta: "Talk to Us",
  },
  hero: {
    headline1: "Tailor-made technology for companies that",
    accent: "need to grow with control",
    question:
      "Has your company grown, but your processes are still slow, manual, or scattered across multiple systems?",
    sub: "We develop custom systems, automations, and digital platforms that organize operations, reduce errors, and help companies grow with more efficiency, security, and predictability.",
    note: "Every business has different processes, challenges, and goals. That's why we believe technology should adapt to your company, not the other way around.",
    cta: "Talk to a Specialist",
  },
  why: {
    eyebrow: "Custom systems",
    headline1: "Why a custom",
    accent: "system?",
    body1:
      "Generic systems tend to force companies to adapt their processes, pay for features they'll never use, and live with limitations that emerge as the business grows.",
    body2: "A custom system is built around your operation.",
    benefits: [
      "Processes aligned with your company's reality",
      "Fewer manual tasks and less rework",
      "Centralized, reliable information",
      "Greater control over data and indicators",
      "Continuous evolution as business needs change",
    ],
    closing:
      "Technology stops being an obstacle and becomes a tool to speed up decisions and increase operational efficiency.",
  },
  value: {
    eyebrow: "Value generated",
    headline1: "How technology generates value for",
    accent: "your business",
    items: [
      {
        title: "More operational speed",
        description:
          "Processes that used to depend on spreadsheets, e-mails, or parallel controls now happen in an integrated, automated way.",
      },
      {
        title: "Fewer errors, more reliability",
        description:
          "Validation rules and automations reduce inconsistencies, rework, and operational failures.",
      },
      {
        title: "Organized, secure data",
        description:
          "Centralized information lets the company operate with more confidence and preserve business knowledge.",
      },
      {
        title: "Visibility into what really matters",
        description:
          "We turn operational data into indicators and metrics that support faster, more strategic decisions.",
      },
      {
        title: "Sustainable growth",
        description:
          "We build systems prepared to keep up with the operation's growth without generating unnecessary complexity.",
      },
    ],
  },
  visual: {
    headline1: "High-level technology for operations that",
    accent: "can't stop.",
    showcases: [
      {
        title: "Total protection for your business",
        description:
          "We shield your business data, control who accesses what, and make sure confidential information stays locked down tight.",
      },
      {
        title: "Fast, automatic decisions",
        description:
          "We turn your sales and cost data into automatic reports. No more wasting time filling out spreadsheets by hand.",
      },
      {
        title: "Your team in total sync",
        description:
          "We build tailor-made tools that connect your departments, eliminating communication errors and everyday bottlenecks.",
      },
      {
        title: "Secure access from anywhere",
        description:
          "Your employees access what they need securely, with controlled permissions, without exposing the company to risks or leaks.",
      },
      {
        title: "Your system always running",
        description:
          "We take care of the infrastructure so your system never goes down, catching failures before they disrupt your sales or operations.",
      },
      {
        title: "Technology ready to grow",
        description:
          "We build systems that keep pace with your business. Your company can double in size, and the technology will keep up.",
      },
    ],
  },
  reliability: {
    heading: "Systems built so your business never stops",
    body1:
      "We don't just write lines of code; we build the foundation that gives you the confidence to make decisions and focus on growing your business. We develop every solution prioritizing your business's stability, the absolute confidentiality of your data, and a strong structure that won't leave you stranded when you need it most.",
    body2:
      "ConderTech is the technology partner that brings peace of mind to your day-to-day business.",
  },
  segments: {
    headline1: "Specialized solutions for your",
    accent: "segment",
    items: [
      {
        title: "Security",
        description:
          "Every solution is built with security as a starting point, protecting your data and systems.",
      },
      {
        title: "E-commerce",
        description: "Get a scalable online store with ConderTech.",
      },
      {
        title: "Custom Systems",
        description: "Custom development for your business.",
      },
      {
        title: "Infrastructure",
        description:
          "Migration, secure structure, scalable and ready for growth.",
      },
      {
        title: "Government",
        description:
          "Count on ConderTech to manage public administration challenges.",
      },
    ],
    prev: "Previous",
    next: "Next",
    goTo: (title: string) => `Go to ${title}`,
  },
  process: {
    eyebrow: "Methodology",
    headline1: "How we",
    accent: "work",
    cta_text: "Ready to transform your operations?",
    cta_button: "Talk to a specialist",
    steps: [
      {
        number: "01",
        title: "Discovery & understanding your business",
        description:
          "We start by understanding your company's reality, processes, challenges, and goals. Our first commitment is to understand the problem before proposing any solution.",
      },
      {
        number: "02",
        title: "Solution planning",
        description:
          "We map processes, define priorities, and build a clear vision of the system to be developed. You take part in decisions and have visibility into the path ahead.",
      },
      {
        number: "03",
        title: "Incremental development",
        description:
          "We build the system in short, evolving cycles. At the end of each cycle, we present what was built, gather feedback, and validate next steps with your team.",
      },
      {
        number: "04",
        title: "Results-driven evolution",
        description:
          "We track system usage and steer evolution based on real results. Features that deliver value are refined; those that don't are reassessed.",
      },
    ],
  },
  delivery: {
    eyebrow: "Post-delivery",
    headline1: "Delivery is just the",
    accent: "beginning",
    body1: "We don't believe in projects that end when the system goes live.",
    body2:
      "We stay with our clients after delivery, offering support, identifying improvement opportunities, and planning new developments as the business grows.",
    body3:
      "We understand that companies change, processes mature, and new challenges constantly arise. That's why we build systems prepared to evolve.",
  },
  philosophy: {
    eyebrow: "Our philosophy",
    quote:
      "Technology only makes sense when it generates real results for people and for companies.",
    body1:
      "We work side by side with our clients because we believe in long-term relationships, continuous evolution, and building together.",
    body2:
      "Our clients' growth represents ConderTech's growth. That is one of the principles guiding every project we develop.",
  },
  faq: {
    eyebrow: "Questions",
    headline1: "Frequently Asked",
    accent: "Questions",
    not_found: "Didn't find the answer you were looking for?",
    cta: "Contact Us",
    items: [
      {
        question: "How does the process of building a custom system work?",
        answer:
          "We follow a structured process: first we deeply understand your business, then plan the solution together with you, develop in short incremental cycles with partial deliveries, and evolve the system based on real usage results.",
      },
      {
        question: "Does support end once the system is delivered?",
        answer:
          "No. We stay with our clients after delivery, offering support, identifying improvement opportunities, and planning new developments as the business grows.",
      },
      {
        question: "Does ConderTech build AI agents and intelligent automations?",
        answer:
          "Yes. We design and implement AI agents, automation workflows, integrations with generative models, and AI-powered operational solutions for customer service, productivity, internal support, and scale.",
      },
      {
        question: "Can you integrate with systems I already use?",
        answer:
          "Yes. We build custom integrations that connect your main system to other tools, so you don't need to replace it with a brand-new system.",
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
    body: "Talk to our team. We'll understand your company's reality and present the solution best suited to your growth.",
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
    tagline: "Where the physics of software aligns with your success.",
    contactHeading: "Contact",
    emailAriaLabel: (email: string) => `Send email to ${email}`,
    phoneAriaLabel: (phone: string) => `Call ${phone}`,
    instagramAriaLabel: "Follow ConderTech on Instagram",
    instagramLabel: "Instagram",
    linksHeading: "Links",
    links: {
      solutions: "Solutions",
      terms: "Terms of Use",
      governance: "Data Governance (LGPD)",
    },
    rights: (company: string) => `© 2020 ${company}. All rights reserved.`,
  },
  about: {
    heading1: "Technology that helps your business ",
    accent: "grow with predictability",
    intro:
      "Born in Blumenau, ConderTech builds custom systems, automations, and digital platforms for companies that need more control over their processes. We combine technical rigor with close, hands-on support to deliver solutions that work in the day-to-day of the operation.",
    cards: [
      {
        title: "Custom-built systems",
        description:
          "We build systems designed around your business's reality, not off-the-shelf packages that force you to adapt your operation.",
      },
      {
        title: "Security and data governance",
        description:
          "We prioritize protecting your information and complying with data-protection regulations on every project we build.",
      },
      {
        title: "Automation and applied AI",
        description:
          "We build automations and AI-powered solutions focused on real operational efficiency, not trends.",
      },
    ],
    body1:
      "We don't just deliver a finished system: we stay with your company so the technology keeps working as the business grows and processes change.",
    body2:
      "We work side by side with the people making decisions at your company, understanding the processes before proposing any solution.",
    whyHeading: "Why choose us?",
    checklist: [
      "An accessible team that understands your business before proposing solutions",
      "Architectures built for critical operations, with no downtime",
      "Automation and AI applied with a focus on real efficiency",
      "Security and data governance from day one of the project",
      "Decisions guided by reliable, up-to-date data",
      "Custom-built systems, with no features you'll never use",
    ],
    ctaHeading: "Ready to start your project?",
    ctaBody:
      "Talk to our team and find out how we can help your business grow with more control and efficiency.",
    ctaButton: "Talk to Our Team",
  },
  terms: {
    eyebrow: "Terms of Use",
    heading: "General terms for using ConderTech's digital channels.",
    paragraphs: [
      "By browsing ConderTech's digital environments, you agree to use the content, forms, and materials provided in a lawful, responsible manner consistent with the platform's institutional and commercial purpose.",
      "The information presented on this site is informational and commercial in nature and may be updated at any time, without prior notice, to reflect changes in positioning, portfolio, internal processes, or regulatory requirements.",
      "Reproducing, distributing, or improperly exploiting ConderTech's proprietary materials without express authorization is prohibited. Data submitted through forms must be sent only by people authorized to represent the interested organization.",
      "Questions about using the platform, business proposals, or specific conditions can be addressed directly through the official contact channels listed on the site.",
    ],
  },
  governance: {
    eyebrow: "Data Governance",
    heading: "Data handling guidelines aligned with Brazil's LGPD.",
    paragraphs: [
      "ConderTech handles personal data based on principles of necessity, purpose, security, and transparency, adopting technical and organizational controls compatible with the sensitivity of the information processed.",
      "Data submitted through forms, contact channels, and service flows may be used for business follow-up, lead qualification, proposal drafting, and maintaining the institutional relationship, always within appropriate legal bases.",
      "We maintain practices focused on integrity, traceability, and controlled access, with periodic process reviews to reinforce compliance with the LGPD and governance standards applicable to the digital operations we support.",
      "Requests related to data subject rights, data updates, or further clarification can be sent through the official channels listed in the site's footer.",
    ],
  },
  budget: {
    header: { title: "Budget Simulator", subtitle: "ConderTech - Digital Solutions" },
    footer: {
      rights: "© 2020 ConderTech - All rights reserved",
      note: "The values shown are estimates and may vary",
    },
    progress: { step: "Step", of: "of" },
    nav: { back: "Back", next: "Next" },
    themeToggle: "Toggle theme",
    step1: {
      heading: "What type of project do you need?",
      subtext: "Select the option that best describes your project",
      types: {
        institutional: {
          title: "Institutional Website",
          description: "Professional website to showcase your company and services",
        },
        "landing-page": {
          title: "Landing Page",
          description: "Conversion-focused page for products or services",
        },
        ecommerce: {
          title: "Online Store",
          description: "Complete e-commerce to sell online",
        },
        "custom-system": {
          title: "Custom System",
          description: "Custom web system for your needs",
        },
        "mobile-app": {
          title: "Mobile App",
          description: "Native app for iOS and Android",
        },
      },
    },
    step2: {
      heading: "About the project design",
      subtext: "Answer the questions below",
      logoQuestion: "Does your company already have a logo?",
      logoYes: { title: "Yes, I have one", description: "We'll use your existing logo" },
      logoNo: {
        title: "No, I need one",
        description: "We'll create a professional logo (+R$ 500)",
      },
      premiumQuestion: "Would you like a premium, differentiated design?",
      designStandard: { title: "Standard Design", description: "Professional, clean design" },
      designPremium: {
        title: "Premium Design",
        description: "Exclusive, differentiated design (+R$ 2,000)",
      },
    },
    step3: {
      heading: "Content and structure",
      subtext: "Set the number of pages and SEO features",
      pagesQuestion: "How many pages will your site have?",
      pageSingular: "page",
      pagePlural: "pages",
      includedInBase: "Included in the base price",
      extraPages: (cost: number) => `Extra pages: +R$ ${cost}`,
      seoQuestion: "Do you need initial SEO optimization?",
      seoNo: { title: "Not needed", description: "We can do it later if needed" },
      seoYes: {
        title: "Yes, I need SEO",
        description: "Full search engine optimization (+R$ 1,500)",
      },
    },
    step4: {
      heading: "Extra features",
      subtext: "Select the features you'd like to add (optional)",
      features: {
        whatsapp: {
          title: "WhatsApp Integration",
          description: "Floating button linking directly to your WhatsApp Business",
        },
        blog: {
          title: "Blog System",
          description: "Full blog with post and category management",
        },
        membersArea: {
          title: "Members Area",
          description: "Login system and restricted area for users",
        },
        onlinePayment: {
          title: "Online Payment",
          description: "Integration with payment gateways (Stripe, PayPal, etc.)",
        },
      },
      tipLabel: "Tip:",
      tip: "You can add or remove features after the initial quote",
    },
    step5: {
      heading: "What's your company's segment?",
      subtext: "This helps us better tailor your proposal",
      selectLabel: "Select the segment",
      placeholder: "Select an option...",
      segments: [
        "Technology",
        "Health & Wellness",
        "Education",
        "E-commerce / Retail",
        "Food / Restaurants",
        "Professional Services",
        "Construction / Engineering",
        "Fashion / Beauty",
        "Tourism / Hospitality",
        "Finance / Consulting",
        "Industry",
        "Agribusiness",
        "Entertainment",
        "Real Estate",
        "Automotive",
        "NGOs / Institutions",
        "Other",
      ],
      selectedLabel: "Selected segment",
    },
    step6: {
      heading: "Describe your project",
      subtext: "Tell us more about your vision and goals",
      label: "Project description",
      placeholder:
        "E.g.: I need an institutional website for my consulting firm. The goal is to showcase our services, publish case studies, and attract new clients...",
      minChars: (min: number, remaining: number) =>
        `Minimum ${min} characters (${remaining} more needed)`,
      validDescription: "Valid description",
      tipsHeading: "Tips for a good description:",
      tips: [
        "What is the project's main goal?",
        "Who is your target audience?",
        "Do you have any references or inspiration?",
        "Is there a specific deadline?",
        "Any specific feature not listed?",
      ],
      nextLabel: "See Budget",
    },
    step7: {
      heading: "Your budget is ready!",
      subtext: "Review the details and choose how to proceed",
      discountBadge: "Exclusive offer for first-time clients: 50% off",
      closeNowTitle: "Close now for just",
      from: "From",
      fixedPriceNote: "Fixed price to close now. Take advantage!",
      estimatedInvestment: "Estimated investment",
      startingFrom: "Starting at",
      upTo: "Up to",
      estimatedDeadline: (days: number) => `Estimated timeline: ${days} business days`,
      includedHeading: "What's included",
      formHeading: "To send the quote, please provide:",
      personTypePF: "Individual",
      personTypePJ: "Company",
      namePlaceholderPJ: "Company name",
      namePlaceholderPF: "Your full name",
      nameError: "Please provide your name or your company name.",
      closeNow: "Close Now",
      requestWhatsapp: "Request via WhatsApp",
      newBudget: "Start a new quote",
    },
    included: {
      projectDescriptions: {
        institutional: "Professional institutional website",
        "landing-page": "High-conversion landing page",
        ecommerce: "Complete online store",
        "custom-system": "Custom system",
        "mobile-app": "Native mobile app",
      },
      logoCreation: "Professional logo creation",
      premiumDesign: "Premium differentiated design",
      customPages: (n: number) => `${n} custom pages`,
      includedPages: (n: number) => `${n} pages included`,
      seo: "Full initial SEO optimization",
      whatsappIntegration: "WhatsApp Business integration",
      blogSystem: "Full blog system",
      membersArea: "Members area with login",
      onlinePayment: "Online payment integration",
      hosting: "12 months of hosting",
      support: "3 months of technical support",
      ssl: "Free SSL certificate",
      responsive: "Responsive design",
    },
    whatsapp: {
      greeting: "Hello! I'd like to request a quote.",
      companyLabel: "Company",
      nameLabel: "Name",
      projectTypeLabel: "Project type",
      pagesLabel: "Pages",
      hasLogoLabel: "Has a logo",
      premiumLabel: "Premium design",
      seoLabel: "SEO",
      yes: "Yes",
      no: "No",
      featuresLabel: "Features",
      featureWhatsapp: "WhatsApp Business",
      featureBlog: "Blog",
      featureMembersArea: "Members area",
      featureOnlinePayment: "Online payment",
      noExtraFeatures: "No extra features",
      descriptionLabel: "Description",
      investmentLabel: "Estimated investment",
      deadlineLabel: "Estimated timeline",
      daysUnit: "business days",
    },
  },
};

// ─── ES ──────────────────────────────────────────────────────────────────────
const es: T = {
  nav: {
    sobre: "Nosotros",
    faq: "Preguntas",
    contato: "Contacto",
    cta: "Hablar con Nosotros",
  },
  hero: {
    headline1: "Tecnología a medida para empresas que",
    accent: "necesitan crecer con control",
    question:
      "¿Tu empresa creció, pero los procesos siguen siendo lentos, manuales o dispersos en varios sistemas?",
    sub: "Desarrollamos sistemas personalizados, automatizaciones y plataformas digitales que organizan operaciones, reducen errores y ayudan a las empresas a crecer con más eficiencia, seguridad y previsibilidad.",
    note: "Cada negocio tiene procesos, desafíos y objetivos diferentes. Por eso creemos que la tecnología debe adaptarse a tu empresa, y no al revés.",
    cta: "Hablar con un Especialista",
  },
  why: {
    eyebrow: "Sistemas a medida",
    headline1: "¿Por qué un sistema",
    accent: "personalizado?",
    body1:
      "Los sistemas genéricos suelen obligar a la empresa a adaptar sus procesos, pagar por funciones que nunca usará y convivir con limitaciones que surgen a medida que el negocio crece.",
    body2: "Un sistema personalizado se construye alrededor de tu operación.",
    benefits: [
      "Procesos alineados con la realidad de tu empresa",
      "Menos tareas manuales y menos retrabajo",
      "Información centralizada y confiable",
      "Mayor control sobre datos e indicadores",
      "Evolución continua conforme cambian las necesidades del negocio",
    ],
    closing:
      "La tecnología deja de ser un obstáculo y se convierte en una herramienta para acelerar decisiones y aumentar la eficiencia operativa.",
  },
  value: {
    eyebrow: "Valor generado",
    headline1: "Cómo la tecnología genera valor para",
    accent: "tu negocio",
    items: [
      {
        title: "Más velocidad operativa",
        description:
          "Procesos que antes dependían de hojas de cálculo, correos o controles paralelos ahora ocurren de forma integrada y automatizada.",
      },
      {
        title: "Menos errores y más confiabilidad",
        description:
          "Reglas de validación y automatizaciones reducen inconsistencias, retrabajo y fallas operativas.",
      },
      {
        title: "Datos organizados y seguros",
        description:
          "La información centralizada permite que la empresa trabaje con más confianza y preserve el conocimiento del negocio.",
      },
      {
        title: "Visibilidad de lo que realmente importa",
        description:
          "Transformamos datos operativos en indicadores y métricas que apoyan decisiones más rápidas y estratégicas.",
      },
      {
        title: "Crecimiento sostenible",
        description:
          "Creamos sistemas preparados para acompañar la evolución de la operación sin generar complejidad innecesaria.",
      },
    ],
  },
  visual: {
    headline1: "Tecnología de alto nivel para operaciones que",
    accent: "no pueden detenerse.",
    showcases: [
      {
        title: "Protección total para tu empresa",
        description:
          "Blindamos los datos de tu negocio, controlamos quién accede a qué y garantizamos que la información confidencial quede bajo llave.",
      },
      {
        title: "Decisiones rápidas y automáticas",
        description:
          "Transformamos tus datos de ventas y costos en informes automáticos. Basta de perder tiempo llenando hojas de cálculo manualmente.",
      },
      {
        title: "Tu equipo en total sintonía",
        description:
          "Creamos herramientas a medida que conectan tus departamentos, eliminando errores de comunicación y los cuellos de botella del día a día.",
      },
      {
        title: "Acceso seguro desde cualquier lugar",
        description:
          "Tus empleados acceden a lo que necesitan con seguridad y permisos controlados, sin exponer a la empresa a riesgos o filtraciones.",
      },
      {
        title: "Tu sistema siempre funcionando",
        description:
          "Cuidamos la infraestructura para que tu sistema nunca se caiga, anticipando fallas antes de que afecten tus ventas u operación.",
      },
      {
        title: "Tecnología lista para crecer",
        description:
          "Construimos sistemas que acompañan el ritmo de tu negocio. Tu empresa puede duplicar su tamaño y la tecnología aguantará el ritmo.",
      },
    ],
  },
  reliability: {
    heading: "Sistemas hechos para que tu negocio nunca se detenga",
    body1:
      "No solo creamos líneas de código; construimos la base que te da la seguridad para tomar decisiones y enfocarte en el crecimiento de tu empresa. Desarrollamos cada solución priorizando la estabilidad de tu negocio, la confidencialidad absoluta de tus datos y una estructura sólida que no te deja a la deriva cuando más lo necesitas.",
    body2:
      "ConderTech es el socio tecnológico que aporta tranquilidad a tu rutina comercial.",
  },
  segments: {
    headline1: "Soluciones especializadas para tu",
    accent: "segmento",
    items: [
      {
        title: "Seguridad",
        description:
          "Toda solución nace con la seguridad como punto de partida, protegiendo tus datos y sistemas.",
      },
      {
        title: "E-commerce",
        description: "Ten tu tienda escalable con ConderTech.",
      },
      {
        title: "Sistemas Personalizados",
        description: "Desarrollo personalizado para tu empresa.",
      },
      {
        title: "Infraestructura",
        description:
          "Migración, estructura segura, escalable y preparada para el crecimiento.",
      },
      {
        title: "Gobierno",
        description:
          "Cuenta con ConderTech para gestionar los desafíos de la administración pública.",
      },
    ],
    prev: "Anterior",
    next: "Siguiente",
    goTo: (title: string) => `Ir a ${title}`,
  },
  process: {
    eyebrow: "Metodología",
    headline1: "Cómo",
    accent: "trabajamos",
    cta_text: "¿Listo para transformar tu operación?",
    cta_button: "Hablar con un experto",
    steps: [
      {
        number: "01",
        title: "Descubrimiento y comprensión del negocio",
        description:
          "Empezamos entendiendo la realidad de tu empresa, sus procesos, dificultades y objetivos. Nuestro primer compromiso es comprender el problema antes de proponer cualquier solución.",
      },
      {
        number: "02",
        title: "Planificación de la solución",
        description:
          "Mapeamos procesos, definimos prioridades y construimos una visión clara del sistema que se desarrollará. Tú participas en las decisiones y tienes visibilidad del camino a seguir.",
      },
      {
        number: "03",
        title: "Desarrollo incremental",
        description:
          "Construimos el sistema en etapas cortas y evolutivas. Al final de cada ciclo, presentamos lo construido, recogemos feedback y validamos los próximos pasos junto a tu equipo.",
      },
      {
        number: "04",
        title: "Evolución orientada a resultados",
        description:
          "Monitoreamos el uso del sistema y orientamos la evolución según los resultados obtenidos. Las funciones que generan valor se mejoran; las demás se reevalúan.",
      },
    ],
  },
  delivery: {
    eyebrow: "Posentrega",
    headline1: "La entrega es solo el",
    accent: "comienzo",
    body1: "No creemos en proyectos que terminan cuando el sistema entra en producción.",
    body2:
      "Acompañamos a nuestros clientes después de la entrega, ofreciendo soporte, identificando oportunidades de mejora y planificando nuevas evoluciones conforme crece el negocio.",
    body3:
      "Entendemos que las empresas cambian, los procesos maduran y surgen constantemente nuevos desafíos. Por eso construimos sistemas preparados para evolucionar.",
  },
  philosophy: {
    eyebrow: "Nuestra filosofía",
    quote:
      "La tecnología solo tiene sentido cuando genera resultados concretos para las personas y las empresas.",
    body1:
      "Trabajamos codo a codo con nuestros clientes porque creemos en relaciones a largo plazo, evolución continua y construcción conjunta.",
    body2:
      "El crecimiento de nuestros clientes representa el crecimiento de ConderTech. Este es uno de los principios que guía cada proyecto que desarrollamos.",
  },
  faq: {
    eyebrow: "Dudas",
    headline1: "Preguntas",
    accent: "Frecuentes",
    not_found: "¿No encontraste la respuesta que buscabas?",
    cta: "Contáctanos",
    items: [
      {
        question:
          "¿Cómo funciona el proceso de desarrollo de un sistema personalizado?",
        answer:
          "Seguimos un proceso estructurado: primero entendemos a fondo tu negocio, luego planificamos la solución contigo, desarrollamos en ciclos cortos e incrementales con entregas parciales, y evolucionamos el sistema según resultados reales de uso.",
      },
      {
        question: "¿El soporte termina cuando se entrega el sistema?",
        answer:
          "No. Acompañamos a nuestros clientes después de la entrega, ofreciendo soporte, identificando oportunidades de mejora y planificando nuevas evoluciones conforme crece el negocio.",
      },
      {
        question: "¿ConderTech crea agentes de IA y automatizaciones inteligentes?",
        answer:
          "Sí. Diseñamos e implementamos agentes de IA, flujos de automatización e integraciones con modelos generativos para atención, productividad y escala operacional.",
      },
      {
        question: "¿Pueden integrarse con sistemas que ya uso?",
        answer:
          "Sí. Desarrollamos integraciones a medida que conectan tu sistema principal con otras herramientas, sin necesidad de reemplazarlo por uno nuevo.",
      },
      {
        question: "¿Cómo funciona el proceso de cotización?",
        answer:
          "Después del primer contacto, realizamos una reunión de Discovery para entender profundamente tu situación. Con base en esto, entregamos una propuesta técnica detallada con alcance, plazo e inversión.",
      },
      {
        question: "¿Atienden empresas de cualquier lugar de Brasil?",
        answer:
          "Sí. Operamos de forma remota con empresas de diferentes regiones de Brasil. Mantenemos comunicación estructurada, rutina de seguimiento y cadencia de ejecución para garantizar previsibilidad, calidad y velocidad en las entregas.",
      },
    ],
  },
  contact: {
    eyebrow: "Contacto",
    headline1: "¿Empecemos tu",
    accent: "proyecto?",
    body: "Habla con nuestro equipo. Entenderemos la realidad de tu empresa y presentaremos la solución más adecuada para tu crecimiento.",
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
    tagline: "Donde la física del software alinea tu éxito.",
    contactHeading: "Contacto",
    emailAriaLabel: (email: string) => `Enviar correo a ${email}`,
    phoneAriaLabel: (phone: string) => `Llamar a ${phone}`,
    instagramAriaLabel: "Seguir a ConderTech en Instagram",
    instagramLabel: "Instagram",
    linksHeading: "Enlaces",
    links: {
      solutions: "Soluciones",
      terms: "Términos de Uso",
      governance: "Gobernanza de Datos (LGPD)",
    },
    rights: (company: string) => `© 2020 ${company}. Todos los derechos reservados.`,
  },
  about: {
    heading1: "Tecnología que ayuda a tu negocio a ",
    accent: "crecer con previsibilidad",
    intro:
      "Nacida en Blumenau, ConderTech desarrolla sistemas, automatizaciones y plataformas digitales a medida para empresas que necesitan más control sobre sus procesos. Combinamos rigor técnico con acompañamiento cercano para entregar soluciones que funcionan en el día a día de la operación.",
    cards: [
      {
        title: "Sistemas a medida",
        description:
          "Desarrollamos sistemas pensados para la realidad de tu negocio, sin paquetes prediseñados que te obliguen a adaptar tu operación.",
      },
      {
        title: "Seguridad y gobernanza de datos",
        description:
          "Priorizamos la protección de tu información y el cumplimiento normativo en cada proyecto que desarrollamos.",
      },
      {
        title: "Automatización e IA aplicada",
        description:
          "Desarrollamos automatizaciones y soluciones con inteligencia artificial enfocadas en la eficiencia operativa real, no en modas.",
      },
    ],
    body1:
      "No entregamos solo un sistema terminado: acompañamos a tu empresa para que la tecnología siga funcionando a medida que el negocio crece y los procesos cambian.",
    body2:
      "Trabajamos codo a codo con quienes toman las decisiones en tu empresa, entendiendo los procesos antes de proponer cualquier solución.",
    whyHeading: "¿Por qué elegirnos?",
    checklist: [
      "Un equipo accesible, que entiende tu negocio antes de proponer soluciones",
      "Arquitecturas preparadas para operaciones críticas, sin tiempo de inactividad",
      "Automatización e IA aplicadas con foco en la eficiencia real",
      "Seguridad y gobernanza de datos desde el primer día del proyecto",
      "Decisiones guiadas por datos confiables y actualizados",
      "Sistemas a medida, sin funciones que nunca vas a usar",
    ],
    ctaHeading: "¿Listo para comenzar tu proyecto?",
    ctaBody:
      "Habla con nuestro equipo y descubre cómo podemos ayudar a tu empresa a crecer con más control y eficiencia.",
    ctaButton: "Hablar con el Equipo",
  },
  terms: {
    eyebrow: "Términos de Uso",
    heading: "Condiciones generales para el uso de los canales digitales de ConderTech.",
    paragraphs: [
      "Al navegar por los entornos digitales de ConderTech, aceptas utilizar los contenidos, formularios y materiales disponibles de forma lícita, responsable y compatible con la finalidad institucional y comercial de la plataforma.",
      "La información presentada en este sitio tiene carácter informativo-comercial y puede actualizarse en cualquier momento, sin previo aviso, para reflejar cambios de posicionamiento, portafolio, procesos internos o exigencias regulatorias.",
      "Queda prohibido reproducir, distribuir o explotar indebidamente los materiales propietarios de ConderTech sin autorización expresa. El envío de datos mediante formularios debe realizarse únicamente por personas autorizadas para representar a la organización interesada.",
      "Las dudas sobre el uso de la plataforma, propuestas comerciales o condiciones específicas pueden tratarse directamente por los canales oficiales de contacto indicados en el sitio.",
    ],
  },
  governance: {
    eyebrow: "Gobernanza de Datos",
    heading: "Directrices de tratamiento de datos alineadas con la LGPD.",
    paragraphs: [
      "ConderTech trata los datos personales con base en principios de necesidad, finalidad, seguridad y transparencia, adoptando controles técnicos y organizacionales acordes con la criticidad de la información procesada.",
      "Los datos enviados por formularios, canales de contacto y flujos de atención pueden utilizarse para seguimiento comercial, calificación de la demanda, elaboración de propuestas y mantenimiento de la relación institucional, siempre dentro de bases legales adecuadas.",
      "Mantenemos prácticas orientadas a la integridad, la trazabilidad y el acceso controlado, con revisión periódica de procesos para reforzar el cumplimiento de la LGPD y los estándares de gobernanza aplicables a las operaciones digitales que respaldamos.",
      "Las solicitudes relacionadas con los derechos del titular, actualización de datos o aclaraciones adicionales pueden enviarse a través de los canales oficiales indicados en el pie de página del sitio.",
    ],
  },
  budget: {
    header: { title: "Simulador de Presupuesto", subtitle: "ConderTech - Soluciones Digitales" },
    footer: {
      rights: "© 2020 ConderTech - Todos los derechos reservados",
      note: "Los valores presentados son estimaciones y pueden variar",
    },
    progress: { step: "Etapa", of: "de" },
    nav: { back: "Atrás", next: "Siguiente" },
    themeToggle: "Cambiar tema",
    step1: {
      heading: "¿Qué tipo de proyecto necesitas?",
      subtext: "Selecciona la opción que mejor describe tu proyecto",
      types: {
        institutional: {
          title: "Sitio Institucional",
          description: "Sitio profesional para presentar tu empresa y servicios",
        },
        "landing-page": {
          title: "Landing Page",
          description: "Página enfocada en conversión para productos o servicios",
        },
        ecommerce: {
          title: "Tienda Virtual",
          description: "E-commerce completo para vender en línea",
        },
        "custom-system": {
          title: "Sistema Personalizado",
          description: "Sistema web a medida para tu necesidad",
        },
        "mobile-app": {
          title: "Aplicación Móvil",
          description: "App nativa para iOS y Android",
        },
      },
    },
    step2: {
      heading: "Sobre el diseño del proyecto",
      subtext: "Responde las preguntas a continuación",
      logoQuestion: "¿Tu empresa ya tiene logotipo?",
      logoYes: { title: "Sí, ya tengo", description: "Usaremos tu logo existente" },
      logoNo: {
        title: "No, necesito crear uno",
        description: "Crearemos un logo profesional (+R$ 500)",
      },
      premiumQuestion: "¿Deseas un diseño premium diferenciado?",
      designStandard: { title: "Diseño Estándar", description: "Diseño profesional y limpio" },
      designPremium: {
        title: "Diseño Premium",
        description: "Diseño exclusivo y diferenciado (+R$ 2.000)",
      },
    },
    step3: {
      heading: "Contenido y estructura",
      subtext: "Define la cantidad de páginas y recursos de SEO",
      pagesQuestion: "¿Cuántas páginas tendrá tu sitio?",
      pageSingular: "página",
      pagePlural: "páginas",
      includedInBase: "Incluido en el precio base",
      extraPages: (cost: number) => `Páginas extra: +R$ ${cost}`,
      seoQuestion: "¿Necesitas optimización SEO inicial?",
      seoNo: { title: "No es necesario", description: "Podemos hacerlo después si es necesario" },
      seoYes: {
        title: "Sí, necesito SEO",
        description: "Optimización completa para buscadores (+R$ 1.500)",
      },
    },
    step4: {
      heading: "Funcionalidades extra",
      subtext: "Selecciona las funcionalidades que deseas agregar (opcional)",
      features: {
        whatsapp: {
          title: "Integración WhatsApp",
          description: "Botón flotante con enlace directo a tu WhatsApp Business",
        },
        blog: {
          title: "Sistema de Blog",
          description: "Blog completo con gestor de publicaciones y categorías",
        },
        membersArea: {
          title: "Área de Miembros",
          description: "Sistema de inicio de sesión y área restringida para usuarios",
        },
        onlinePayment: {
          title: "Pago en Línea",
          description: "Integración con pasarelas de pago (Stripe, PayPal, etc.)",
        },
      },
      tipLabel: "Consejo:",
      tip: "Puedes agregar o quitar funcionalidades después del presupuesto inicial",
    },
    step5: {
      heading: "¿Cuál es el segmento de tu empresa?",
      subtext: "Esto nos ayuda a personalizar mejor tu propuesta",
      selectLabel: "Selecciona el segmento",
      placeholder: "Selecciona una opción...",
      segments: [
        "Tecnología",
        "Salud y Bienestar",
        "Educación",
        "E-commerce / Retail",
        "Alimentación / Restaurantes",
        "Servicios Profesionales",
        "Construcción / Ingeniería",
        "Moda / Belleza",
        "Turismo / Hotelería",
        "Finanzas / Consultoría",
        "Industria",
        "Agronegocio",
        "Entretenimiento",
        "Inmobiliario",
        "Automotriz",
        "ONGs / Instituciones",
        "Otro",
      ],
      selectedLabel: "Segmento seleccionado",
    },
    step6: {
      heading: "Describe tu proyecto",
      subtext: "Cuéntanos más sobre tu visión y objetivos",
      label: "Descripción del proyecto",
      placeholder:
        "Ej: Necesito un sitio institucional para mi empresa de consultoría. El objetivo es presentar nuestros servicios, publicar casos de éxito y captar nuevos clientes...",
      minChars: (min: number, remaining: number) =>
        `Mínimo ${min} caracteres (faltan ${remaining})`,
      validDescription: "Descripción válida",
      tipsHeading: "Consejos para una buena descripción:",
      tips: [
        "¿Cuál es el objetivo principal del proyecto?",
        "¿Quién es tu público objetivo?",
        "¿Tienes alguna referencia o inspiración?",
        "¿Hay algún plazo específico?",
        "¿Alguna funcionalidad específica no listada?",
      ],
      nextLabel: "Ver Presupuesto",
    },
    step7: {
      heading: "¡Tu presupuesto está listo!",
      subtext: "Revisa los detalles y elige cómo continuar",
      discountBadge: "Oferta exclusiva para primera contratación: 50% de descuento",
      closeNowTitle: "Cierra ahora por solo",
      from: "De",
      fixedPriceNote: "Valor fijo para cerrar ahora. ¡Aprovecha!",
      estimatedInvestment: "Inversión estimada",
      startingFrom: "Desde",
      upTo: "Hasta",
      estimatedDeadline: (days: number) => `Plazo estimado: ${days} días hábiles`,
      includedHeading: "Qué está incluido",
      formHeading: "Para enviar el presupuesto, indica:",
      personTypePF: "Persona Física",
      personTypePJ: "Persona Jurídica",
      namePlaceholderPJ: "Nombre de la empresa",
      namePlaceholderPF: "Tu nombre completo",
      nameError: "Por favor, indica tu nombre o el nombre de la empresa.",
      closeNow: "Cerrar Ahora",
      requestWhatsapp: "Solicitar por WhatsApp",
      newBudget: "Hacer nuevo presupuesto",
    },
    included: {
      projectDescriptions: {
        institutional: "Sitio institucional profesional",
        "landing-page": "Landing page de alta conversión",
        ecommerce: "Tienda virtual completa",
        "custom-system": "Sistema personalizado",
        "mobile-app": "Aplicación móvil nativa",
      },
      logoCreation: "Creación de logotipo profesional",
      premiumDesign: "Diseño premium diferenciado",
      customPages: (n: number) => `${n} páginas personalizadas`,
      includedPages: (n: number) => `${n} páginas incluidas`,
      seo: "Optimización SEO inicial completa",
      whatsappIntegration: "Integración con WhatsApp Business",
      blogSystem: "Sistema de blog completo",
      membersArea: "Área de miembros con inicio de sesión",
      onlinePayment: "Integración con pago en línea",
      hosting: "Hosting por 12 meses",
      support: "Soporte técnico por 3 meses",
      ssl: "Certificado SSL gratis",
      responsive: "Diseño responsivo",
    },
    whatsapp: {
      greeting: "¡Hola! Me gustaría solicitar un presupuesto.",
      companyLabel: "Empresa",
      nameLabel: "Nombre",
      projectTypeLabel: "Tipo de proyecto",
      pagesLabel: "Páginas",
      hasLogoLabel: "Tiene logo",
      premiumLabel: "Diseño premium",
      seoLabel: "SEO",
      yes: "Sí",
      no: "No",
      featuresLabel: "Funcionalidades",
      featureWhatsapp: "WhatsApp Business",
      featureBlog: "Blog",
      featureMembersArea: "Área de miembros",
      featureOnlinePayment: "Pago en línea",
      noExtraFeatures: "Ninguna funcionalidad extra",
      descriptionLabel: "Descripción",
      investmentLabel: "Inversión estimada",
      deadlineLabel: "Plazo estimado",
      daysUnit: "días hábiles",
    },
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
  const router = useRouter();
  const pathname = usePathname();
  const { locale: urlLang, bare } = stripLocalePrefix(pathname ?? "/");

  const [lang, setLangState] = useState<Lang>(urlLang);

  // Keep state in sync with the URL (direct link clicks, back/forward nav).
  useEffect(() => {
    setLangState(urlLang);
  }, [urlLang]);

  // Reflect the active language on <html lang="...">.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback(
    (newLang: Lang) => {
      const targetPath = getLocalizedPath(newLang, bare);
      if (targetPath !== pathname) {
        router.push(targetPath);
      } else {
        setLangState(newLang);
      }
    },
    [bare, pathname, router],
  );

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
