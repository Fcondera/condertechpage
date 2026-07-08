"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

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
    note: "Cada negócio possui processos, desafios e objetivos diferentes. Por isso, acreditamos que a tecnologia deve se adaptar à sua empresa — e não o contrário.",
    cta: "Falar com um Especialista",
  },
  why: {
    eyebrow: "Sistemas sob medida",
    headline1: "Por que um sistema",
    accent: "personalizado?",
    body1:
      "Sistemas genéricos costumam obrigar a empresa a adaptar seus processos, contratar funcionalidades que nunca serão utilizadas e conviver com limitações que surgem conforme o negócio cresce.",
    body2: "Um sistema personalizado é construído em torno da sua operação. Ele permite:",
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
  reliability: {
    eyebrow: "Confiabilidade",
    headline1: "Sistemas preparados para operações que",
    accent: "não podem parar",
    intro: "Desenvolvemos soluções priorizando:",
    items: [
      "Segurança e proteção das informações",
      "Privacidade e tratamento responsável dos dados",
      "Estabilidade operacional",
      "Arquiteturas preparadas para crescimento",
      "Disponibilidade para operações críticas e complexas",
    ],
    closing:
      "Acreditamos que um sistema deve transmitir confiança e se tornar uma base sólida para o crescimento do negócio.",
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
    note: "Every business has different processes, challenges, and goals. That's why we believe technology should adapt to your company — not the other way around.",
    cta: "Talk to a Specialist",
  },
  why: {
    eyebrow: "Custom systems",
    headline1: "Why a custom",
    accent: "system?",
    body1:
      "Generic systems tend to force companies to adapt their processes, pay for features they'll never use, and live with limitations that emerge as the business grows.",
    body2: "A custom system is built around your operation. It enables:",
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
  reliability: {
    eyebrow: "Reliability",
    headline1: "Systems built for operations that",
    accent: "can't stop",
    intro: "We develop solutions prioritizing:",
    items: [
      "Security and protection of information",
      "Privacy and responsible data handling",
      "Operational stability",
      "Architectures ready for growth",
      "Availability for critical, complex operations",
    ],
    closing:
      "We believe a system should convey trust and become a solid foundation for business growth.",
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
    rights: "© 2025 ConderTech. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
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
    body2: "Un sistema personalizado se construye alrededor de tu operación. Permite:",
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
  reliability: {
    eyebrow: "Confiabilidad",
    headline1: "Sistemas preparados para operaciones que",
    accent: "no pueden detenerse",
    intro: "Desarrollamos soluciones priorizando:",
    items: [
      "Seguridad y protección de la información",
      "Privacidad y tratamiento responsable de los datos",
      "Estabilidad operativa",
      "Arquitecturas preparadas para crecer",
      "Disponibilidad para operaciones críticas y complejas",
    ],
    closing:
      "Creemos que un sistema debe transmitir confianza y convertirse en una base sólida para el crecimiento del negocio.",
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
          "Por supuesto. Tenemos experiencia con integraciones vía API REST, webhooks y conectores nativos con ERPs, CRMs, pasarelas de pago y plataformas de e-commerce.",
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
