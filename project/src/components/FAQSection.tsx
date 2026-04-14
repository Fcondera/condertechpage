import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useGsapReveal } from "@hooks/useGsapReveal";
interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "Como funciona o modelo de trabalho da ConderTech?",
    answer:
      "Atuamos como um squad recorrente sob demanda. Em vez de você montar e gerir um time interno, a ConderTech entra como estrutura técnica contínua para sustentar, evoluir e escalar o seu produto com acompanhamento estratégico.",
  },
  {
    question: "Quais são os planos disponíveis hoje?",
    answer:
      "Hoje operamos com três frentes. PRIME para sustentação e blindagem digital, ELITE para evolução contínua e tração de mercado, e APEX para parceria estratégica full scale com atuação mais profunda em arquitetura, gestão tecnológica e crescimento.",
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
    question: "O que está incluso no plano PRIME?",
    answer:
      "O PRIME foi desenhado para empresas que não podem conviver com instabilidade. Ele inclui monitoramento 24/7, SLA crítico de resposta, manutenção preventiva, patching de segurança, correções contínuas e consultoria mensal de performance e tecnologia.",
  },
  {
    question: "Quando o plano ELITE faz mais sentido?",
    answer:
      "O ELITE é ideal para empresas que já validaram seu produto e precisam acelerar roadmap, lançar novas funcionalidades com frequência e melhorar conversão, experiência e integrações sem depender de contratações lentas.",
  },
  {
    question: "O que diferencia o plano APEX dos demais?",
    answer:
      "O APEX é uma parceria de nível executivo. Além da entrega técnica, ele inclui visão estratégica, CTO as a Service, squad full-time, decisões de arquitetura cloud, segurança avançada e prioridade máxima para empresas que querem liderar o mercado.",
  },
  {
    question: "Como saber qual plano é o mais adequado para a minha empresa?",
    answer:
      "Se sua prioridade é estabilidade, o PRIME costuma ser o ponto certo. Se a necessidade é ganhar velocidade de execução e lançar melhorias contínuas, o ELITE tende a ser o melhor encaixe. Para operações complexas ou empresas que precisam de um departamento de tecnologia completo, o APEX é o caminho natural.",
  },
  {
    question: "Existe carga horária mensal em cada plano?",
    answer:
      "Sim. O PRIME opera com até 40 horas mensais, o ELITE com até 80 horas mensais e o APEX com até 160 horas mensais. Essa estrutura dá previsibilidade de execução e clareza sobre o nível de dedicação alocado em cada frente.",
  },
  {
    question: "Posso solicitar novas funcionalidades durante o contrato?",
    answer:
      "Sim. Esse é um dos principais benefícios do modelo recorrente. As demandas entram em priorização contínua e podem envolver melhorias, novas funcionalidades, integrações, ajustes operacionais e evolução da arquitetura, conforme o plano contratado.",
  },
  {
    question: "Preciso ter conhecimento técnico para contratar a ConderTech?",
    answer:
      "Não. Você não precisa dominar tecnologia para contratar. Nosso papel é traduzir necessidades de negócio em execução técnica, trazendo clareza sobre prioridades, impacto e retorno esperado de cada iniciativa.",
  },
  {
    question: "Qual é o investimento dos planos?",
    answer:
      "Hoje o PRIME parte de R$ 8.500 por mês, o ELITE parte de R$ 18.000 por mês e o APEX parte de R$ 40.000 por mês. O investimento final pode variar conforme a profundidade técnica, criticidade da operação e escopo estratégico envolvido.",
  },
  {
    question: "Vocês atendem empresas de qualquer lugar do Brasil?",
    answer:
      "Sim. Operamos de forma remota com empresas de diferentes regiões do Brasil. Mantemos comunicação estruturada, rotina de acompanhamento e cadência de execução para garantir previsibilidade, qualidade e velocidade nas entregas.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({
    stagger: true,
    delay: 0.1,
    staggerAmount: 0.08,
  });
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-transparent"
    >
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div ref={titleRef} className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="font-cabinet text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Perguntas Frequentes
          </h2>
        </div>

        <div ref={contentRef} className="space-y-3 sm:space-y-4">
          {FAQ_DATA.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}

          <div className="mt-8 sm:mt-10 md:mt-12 text-center">
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Não encontrou a resposta que procurava?
            </p>
            <a
              href="/#contato"
              className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-black text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Entre em Contato
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 pr-4">
          {item.question}
        </h3>
        <ChevronDown
          className={`w-5 h-5 sm:w-6 sm:h-6 text-black flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        id={`faq-answer-${index}`}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-0">
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
