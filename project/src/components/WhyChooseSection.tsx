import { BrainCircuit, ShieldCheck, Users } from "lucide-react";
import { useGsapReveal } from "@hooks/useGsapReveal";

const benefits = [
  {
    icon: Users,
    title: "Engenharia de Squads",
    description:
      "Times de elite integrados à sua cultura técnica para acelerar o roadmap sem inércia.",
  },
  {
    icon: ShieldCheck,
    title: "Governança & Blindagem",
    description:
      "Arquiteturas resilientes em conformidade com padrões globais de segurança e auditoria de dados.",
  },
  {
    icon: BrainCircuit,
    title: "IA Aplicada ao ROI",
    description:
      "Inteligência Artificial focada em eficiência operacional e geração de lucro real, não apenas inovação visual.",
  },
];

const WhyChooseSection = () => {
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({
    stagger: true,
    delay: 0.1,
  });

  return (
    <section className="bg-transparent py-14 sm:py-24">
      <div className="mx-auto w-full max-w-5xl px-3 sm:px-6">
        <div ref={titleRef} className="mb-10 text-center sm:mb-20">
          <p className="font-switzer text-xs font-semibold uppercase tracking-[0.3em] text-[#8d6a44]">
            Diferenciais
          </p>
          <h2 className="font-cabinet text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Por que a <span className="text-spotify-green">ConderTech?</span>
          </h2>
        </div>

        <div
          ref={contentRef}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8"
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-lg transition-all duration-300 hover:border-spotify-green/40 hover:shadow-xl sm:gap-6 sm:rounded-2xl sm:p-7"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-spotify-green sm:h-14 sm:w-14 sm:rounded-xl">
                <benefit.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-base text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
