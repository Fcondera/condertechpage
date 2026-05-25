import { useGsapReveal } from "@hooks/useGsapReveal";

const stats = [
  {
    value: "50+",
    label: "Empresas Atendidas",
    description: "De startups a corporações consolidadas",
  },
  {
    value: "200+",
    label: "Projetos Entregues",
    description: "Sistemas críticos em produção",
  },
  {
    value: "99,9%",
    label: "Uptime Médio",
    description: "Infraestrutura resiliente e monitorada",
  },
  {
    value: "5 anos",
    label: "No Mercado",
    description: "Experiência comprovada em soluções enterprise",
  },
];

const StatsSection = () => {
  const contentRef = useGsapReveal<HTMLDivElement>({ stagger: true });

  return (
    <section className="bg-[#090909] py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div
          ref={contentRef}
          className="grid grid-cols-1 gap-0 divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="px-0 py-10 sm:px-8 sm:py-0 first:pl-0 last:pr-0"
            >
              <div className="mb-1 font-inter text-4xl font-bold text-white sm:text-5xl">
                {stat.value}
              </div>
              <div className="mb-2 font-inter text-xs font-semibold uppercase tracking-widest text-[#e22d2e]">
                {stat.label}
              </div>
              <p className="font-inter text-sm leading-relaxed text-white/50">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
