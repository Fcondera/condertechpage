import { Check, ArrowRight } from "lucide-react";
import { useGsapReveal } from "@hooks/useGsapReveal";
import { CONTACT_PHONE } from "@constants/navigation";

const plans = [
  {
    name: "PRIME",
    title: "Sustentação e Blindagem Digital",
    description:
      "Blindagem operacional, suporte estratégico e continuidade total do seu ativo digital.",
    price: "8.500",
    hours: "Até 40 horas mensais",
    features: [
      "Monitoramento 24/7",
      "SLA crítico em até 30 min",
      "Patching, segurança e prevenção",
      "Correções e otimizações contínuas",
      "Consultoria mensal de performance",
    ],
    cta: "Solicitar Acesso Prime",
    tier: "bronze",
  },
  {
    name: "ELITE",
    title: "Evolução e Tração de Mercado",
    description:
      "Seu roadmap em produção com velocidade, consistência e foco em resultado.",
    price: "18.000",
    hours: "Até 80 horas mensais",
    features: [
      "Squad com Dev Fullstack + UI/UX",
      "Novas funcionalidades contínuas",
      "Sprints quinzenais",
      "Otimização de conversão e UX",
      "Integrações e APIs",
      "Gerente de Sucesso do Cliente",
    ],
    cta: "Ascender para Elite",
    tier: "silver",
    badge: "Plano mais escolhido",
  },
  {
    name: "APEX",
    title: "Parceria Estratégica e Full Scale",
    description:
      "A Condertech como seu departamento de tecnologia para inovação e escala global.",
    price: "40.000",
    hours: "Até 160 horas mensais",
    features: [
      "CTO as a Service",
      "Squad full-time com Product Manager",
      "Cloud architecture em AWS, Azure ou GCP",
      "Segurança bancária e code audit",
      "Roadmap estratégico e inovação contínua",
      "Prioridade total no desenvolvimento",
    ],
    cta: "Agendar Consultoria Apex",
    tier: "gold",
  },
];

const PlansSection = () => {
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({ delay: 0.15 });

  const handlePlanClick = (planName: string) => {
    const message = encodeURIComponent(
      `Olá! Gostaria de saber mais sobre o plano ${planName} do ConderTech Squad.`,
    );
    window.open(`https://wa.me/${CONTACT_PHONE}?text=${message}`, "_blank");
  };

  const getTierStyles = (tier: string) => {
    switch (tier) {
      case "bronze":
        return {
          card: "before:bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.18),transparent_58%)]",
          badge: "bg-gradient-to-r from-orange-600 to-amber-700 text-white",
          title: "text-orange-700",
          subtitle: "text-gray-900",
          text: "text-gray-700",
          hours: "text-gray-800",
          checkBg: "bg-orange-100/85",
          checkIcon: "text-orange-700",
          button:
            "bg-gradient-to-r from-orange-600 to-amber-700 text-white hover:from-orange-700 hover:to-amber-800",
        };
      case "silver":
        return {
          card: "before:bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.18),transparent_58%)] md:-translate-y-2",
          badge: "bg-gradient-to-r from-gray-600 to-gray-700 text-white",
          title: "text-gray-700",
          subtitle: "text-gray-900",
          text: "text-gray-700",
          hours: "text-gray-800",
          checkBg: "bg-gray-200",
          checkIcon: "text-gray-700",
          button:
            "bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-800 hover:to-gray-900",
        };
      case "gold":
        return {
          card: "before:bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_58%)]",
          badge:
            "bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-bold shadow-lg",
          title: "text-yellow-800 font-bold",
          subtitle: "text-gray-900",
          text: "text-gray-800",
          hours: "text-gray-900 font-semibold",
          checkBg: "bg-gradient-to-br from-yellow-200 to-amber-200",
          checkIcon: "text-yellow-800",
          button:
            "bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-500 text-black hover:from-yellow-700 hover:via-yellow-600 hover:to-amber-600 font-bold shadow-lg shadow-yellow-500/50 hover:shadow-xl hover:shadow-yellow-500/60",
        };
      default:
        return {
          card: "bg-white border border-gray-200",
          badge: "bg-gray-600 text-white",
          title: "text-gray-500",
          subtitle: "text-gray-900",
          text: "text-gray-600",
          hours: "text-gray-700",
          checkBg: "bg-gray-100",
          checkIcon: "text-gray-700",
          button: "bg-black text-white hover:bg-gray-800",
        };
    }
  };

  return (
    <section id="planos" className="py-12 sm:py-20 bg-transparent">
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 md:px-8">
        <div ref={titleRef} className="text-center mb-8 sm:mb-12">
          <h2 className="font-cabinet text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-6">
            Escalabilidade Magnética:{" "}
            <span className="text-spotify-green">
              A Engenharia de Software que o seu ROI exige.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Vença a inércia das contratações lentas. Conecte-se instantaneamente
            a um Squad de Elite pronto para transformar visão em código de alta
            performance.
          </p>
        </div>

        <div
          ref={contentRef}
          className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3 md:items-stretch mb-8 sm:mb-12"
        >
          {plans.map((plan, index) => {
            const styles = getTierStyles(plan.tier);
            return (
              <div
                key={index}
                className={`relative flex h-full min-h-[660px] flex-col overflow-hidden rounded-[28px] bg-white/55 p-6 pt-8 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 before:absolute before:inset-0 before:content-[''] hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(15,23,42,0.12)] sm:min-h-[700px] sm:p-8 sm:pt-10 ${styles.card}`}
              >
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-white/70" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.08)_38%,rgba(255,255,255,0.02)_100%)]" />

                <div className="relative z-10 mb-5 min-h-[150px] pt-3 sm:min-h-[175px]">
                  {plan.badge && (
                    <div className="mb-4 flex justify-center">
                      <div
                        className={`${styles.badge} rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em]`}
                      >
                        {plan.badge}
                      </div>
                    </div>
                  )}
                  <h3
                    className={`text-sm font-semibold tracking-wide uppercase mb-2 ${styles.title}`}
                  >
                    {plan.name}
                  </h3>
                  <h4
                    className={`font-cabinet text-xl sm:text-2xl font-bold mb-3 ${styles.subtitle}`}
                  >
                    {plan.title}
                  </h4>
                  <p className={`text-sm leading-relaxed ${styles.text}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="relative z-10 mb-5 min-h-[110px] border-b border-white/45 pb-5 sm:min-h-[120px]">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                    Proposta
                  </p>
                  <p className={`font-medium leading-relaxed ${styles.hours}`}>
                    {plan.description}
                  </p>
                </div>

                <ul className="relative z-10 mb-5 flex-1 space-y-2.5">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${styles.checkBg}`}
                      >
                        <Check className={`w-3 h-3 ${styles.checkIcon}`} />
                      </div>
                      <span className={`text-[13px] sm:text-sm ${styles.text}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="relative z-10 mt-auto">
                  <div className="mb-5 border-b border-white/45 pb-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                      Carga horária
                    </p>
                    <p className={`font-medium ${styles.hours}`}>
                      {plan.hours}
                    </p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-gray-500">A partir de</span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className={`text-3xl font-bold ${styles.subtitle}`}>
                      R$ {plan.price}
                    </span>
                    <span className="text-sm text-gray-600">/mês</span>
                  </div>
                </div>

                <button
                  onClick={() => handlePlanClick(plan.name)}
                  className={`relative z-10 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold shadow-lg transition-all duration-300 sm:py-4 ${styles.button}`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
