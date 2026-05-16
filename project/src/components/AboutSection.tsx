import { useGsapReveal } from "@hooks/useGsapReveal";
import { Target, Rocket, Shield } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Precisão Cirúrgica",
    description:
      "Cada linha de código é estrategicamente projetada para resolver problemas reais de negócio, não apenas funcionar.",
  },
  {
    icon: Rocket,
    title: "Velocidade Controlada",
    description:
      "Entregamos rápido sem comprometer qualidade. Metodologias ágeis aplicadas com disciplina de engenharia.",
  },
  {
    icon: Shield,
    title: "Segurança como Base",
    description:
      "Arquiteturas resilientes desde o primeiro commit. Compliance e governança não são opcionais.",
  },
];

const AboutSection = () => {
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({ delay: 0.15 });
  const pillarsRef = useGsapReveal<HTMLDivElement>({
    delay: 0.25,
    stagger: true,
  });

  return (
    <section className="bg-white py-16 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 md:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <div ref={titleRef}>
            <p className="text-center font-switzer text-xs font-semibold uppercase tracking-[0.3em] text-[#8d6a44]">
              Sobre
            </p>
            <h2 className="mt-4 text-center font-clash text-3xl font-semibold leading-tight tracking-[-0.045em] text-gray-900 sm:text-4xl lg:text-5xl">
              A espinha dorsal digital para operações de elite
            </h2>
          </div>

          <div
            ref={contentRef}
            className="mx-auto mt-10 max-w-3xl space-y-6 text-center"
          >
            <p className="text-base leading-8 text-gray-700 sm:text-lg sm:leading-9">
              Nascida no coração do polo tecnológico de Blumenau, a{" "}
              <span className="font-semibold text-gray-900">ConderTech</span>{" "}
              projeta a espinha dorsal digital de empresas de elite. Combinamos
              o rigor da engenharia com a agilidade da inovação global para
              criar sistemas que são, simultaneamente, potentes e resilientes.
            </p>

            <p className="text-base leading-8 text-gray-700 sm:text-lg sm:leading-9">
              Não entregamos apenas código;{" "}
              <span className="font-semibold text-gray-900">
                entregamos o controle do futuro do seu negócio
              </span>
              . Nossa missão é transformar desafios complexos em soluções
              elegantes que escalam com sua operação.
            </p>

            <p className="text-base leading-8 text-gray-700 sm:text-lg sm:leading-9">
              Trabalhamos com empresas que entendem que tecnologia não é custo,
              é investimento estratégico. Que velocidade sem direção é
              desperdício. E que{" "}
              <span className="font-semibold text-gray-900">
                escala sem governança é risco
              </span>
              .
            </p>
          </div>

          {/* Pilares */}
          <div
            ref={pillarsRef}
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {pillars.map((pillar, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d6b183]/10">
                  <pillar.icon className="h-8 w-8 text-[#d6b183]" />
                </div>
                <h3 className="mb-3 font-clash text-xl font-semibold text-gray-900">
                  {pillar.title}
                </h3>
                <p className="font-switzer text-sm leading-relaxed text-gray-600">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
