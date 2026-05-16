import { useGsapReveal } from "@hooks/useGsapReveal";
import { Lightbulb, Code, Rocket, HeadphonesIcon } from "lucide-react";

const processSteps = [
  {
    icon: Lightbulb,
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
    icon: Code,
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
    icon: Rocket,
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
    icon: HeadphonesIcon,
    number: "04",
    title: "Evolução Contínua",
    description:
      "Suporte técnico especializado, melhorias incrementais e roadmap de evolução alinhado ao crescimento.",
    deliverables: ["SLA garantido", "Updates regulares", "Novas features"],
  },
];

const ProcessSection = () => {
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({
    stagger: true,
    delay: 0.15,
  });

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-6">
        <div ref={titleRef} className="mb-12 text-center sm:mb-16">
          <p className="font-switzer text-xs font-semibold uppercase tracking-[0.3em] text-[#8d6a44]">
            Metodologia
          </p>
          <h2 className="mt-4 font-clash text-3xl font-semibold leading-tight tracking-[-0.045em] text-gray-900 sm:text-4xl lg:text-5xl">
            Como trabalhamos
          </h2>
          <p className="mx-auto mt-5 max-w-3xl font-switzer text-base leading-7 text-gray-700 sm:text-lg sm:leading-8">
            Um processo estruturado que elimina riscos e garante previsibilidade
            do primeiro contato até a operação em escala.
          </p>
        </div>

        <div ref={contentRef} className="relative">
          {/* Timeline line - desktop only */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 lg:block" />

          <div className="space-y-12 lg:space-y-20">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 ${!isEven ? "lg:text-right" : ""}`}
                >
                  {/* Content */}
                  <div
                    className={`${!isEven ? "lg:col-start-1" : "lg:col-start-2"}`}
                  >
                    <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg transition-all duration-300 hover:border-[#d6b183]/40 hover:shadow-xl">
                      <div
                        className={`flex items-start gap-4 ${!isEven ? "lg:flex-row-reverse lg:justify-end" : ""}`}
                      >
                        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-[#d6b183]/10">
                          <step.icon className="h-7 w-7 text-[#d6b183]" />
                        </div>
                        <div className="flex-1">
                          <div className="mb-2 font-clash text-sm font-bold text-gray-400">
                            {step.number}
                          </div>
                          <h3 className="mb-3 font-clash text-2xl font-semibold text-gray-900">
                            {step.title}
                          </h3>
                          <p className="mb-5 font-switzer text-base leading-relaxed text-gray-700">
                            {step.description}
                          </p>
                          <div
                            className={`space-y-2 ${!isEven ? "lg:flex lg:flex-col lg:items-end" : ""}`}
                          >
                            <p className="font-switzer text-xs font-semibold uppercase tracking-wider text-gray-500">
                              Entregas:
                            </p>
                            {step.deliverables.map((item, idx) => (
                              <div
                                key={idx}
                                className="inline-block rounded-lg border border-gray-200 bg-white px-3 py-1.5 font-switzer text-xs text-gray-600"
                              >
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Number indicator - desktop only */}
                  <div className="absolute left-1/2 top-8 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-[#d6b183] font-clash text-xl font-bold text-white shadow-lg lg:flex">
                    {index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="mb-6 font-switzer text-lg text-gray-700">
            Pronto para transformar sua operação?
          </p>
          <a
            href="https://wa.me/5592982054683"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-[#d6b183] px-8 py-4 font-switzer text-base font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#c4a06e] hover:shadow-xl"
          >
            Agendar Consultoria Gratuita
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
