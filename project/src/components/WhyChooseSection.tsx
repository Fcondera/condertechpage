import { Zap, Shield, Smartphone, Headphones } from "lucide-react";
import { useGsapReveal } from "@hooks/useGsapReveal";

const benefits = [
  {
    icon: Zap,
    title: "Performance",
    description:
      "Sites ultra-rápidos com otimização avançada e carregamento instantâneo.",
  },
  {
    icon: Shield,
    title: "Segurança",
    description:
      "Proteção máxima com certificados SSL e práticas de segurança rigorosas.",
  },
  {
    icon: Smartphone,
    title: "Design Responsivo",
    description:
      "Experiência perfeita em todos os dispositivos, do mobile ao desktop.",
  },
  {
    icon: Headphones,
    title: "Suporte Técnico",
    description:
      "Atendimento especializado e suporte contínuo para seu projeto.",
  },
];

const WhyChooseSection = () => {
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({
    stagger: true,
    delay: 0.1,
  });

  return (
    <section className="py-10 sm:py-20 bg-transparent">
      <div className="w-full max-w-5xl mx-auto px-2 sm:px-6">
        <div ref={titleRef} className="text-center mb-8 sm:mb-16">
          <h2 className="font-cabinet text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Por que empresas inteligentes escolhem a{" "}
            <span className="text-spotify-green">ConderTech?</span>
          </h2>
        </div>

        <div
          ref={contentRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-3xl mx-auto"
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-3 sm:gap-6 p-3 sm:p-6 rounded-lg sm:rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:border-spotify-green/40 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-spotify-green rounded-lg sm:rounded-xl flex items-center justify-center">
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
