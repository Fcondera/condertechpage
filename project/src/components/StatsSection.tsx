import { useGsapReveal } from "@hooks/useGsapReveal";
import { TrendingUp, Building2, Code2, Award } from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "50+",
    label: "Empresas Atendidas",
    description: "De startups a corporações consolidadas",
  },
  {
    icon: Code2,
    value: "200+",
    label: "Projetos Entregues",
    description: "Sistemas críticos em produção",
  },
  {
    icon: TrendingUp,
    value: "99.9%",
    label: "Uptime Médio",
    description: "Infraestrutura resiliente e monitorada",
  },
  {
    icon: Award,
    value: "5 anos",
    label: "No Mercado",
    description: "Experiência comprovada em soluções enterprise",
  },
];

const StatsSection = () => {
  const contentRef = useGsapReveal<HTMLDivElement>({ stagger: true });

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <p className="font-switzer text-xs font-semibold uppercase tracking-[0.3em] text-[#d6b183]">
            Números que falam
          </p>
          <h2 className="mt-4 font-clash text-3xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
            Resultados que transformam operações
          </h2>
        </div>

        <div
          ref={contentRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#d6b183]/40 hover:bg-black/60 sm:p-8"
            >
              <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-[#d6b183]/10 to-transparent blur-2xl" />
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#d6b183]/10">
                  <stat.icon className="h-6 w-6 text-[#d6b183]" />
                </div>
                <div className="mb-2 font-clash text-4xl font-bold text-white sm:text-5xl">
                  {stat.value}
                </div>
                <div className="mb-2 font-switzer text-sm font-semibold uppercase tracking-wider text-white/90">
                  {stat.label}
                </div>
                <p className="font-switzer text-xs leading-relaxed text-white/60 sm:text-sm">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
