import { useGsapReveal } from "@hooks/useGsapReveal";
import {
  ShoppingCart,
  GraduationCap,
  Building,
  Warehouse,
  Stethoscope,
  Factory,
  Briefcase,
  Store,
} from "lucide-react";

const industries = [
  {
    icon: ShoppingCart,
    name: "E-commerce",
    description:
      "Plataformas completas de vendas online com marketplace regional integrado",
  },
  {
    icon: GraduationCap,
    name: "Educação",
    description:
      "Sistemas de gestão educacional e plataformas de ensino adaptativo",
  },
  {
    icon: Building,
    name: "Financeiro",
    description: "Soluções seguras para fintechs e instituições financeiras",
  },
  {
    icon: Warehouse,
    name: "Logística",
    description: "Sistemas de controle de estoque e gestão de supply chain",
  },
  {
    icon: Stethoscope,
    name: "Saúde",
    description: "Plataformas de gestão hospitalar e telemedicina",
  },
  {
    icon: Factory,
    name: "Indústria",
    description: "Automação industrial e sistemas MES/ERP customizados",
  },
  {
    icon: Briefcase,
    name: "Corporativo",
    description: "Sistemas internos, CRM e ferramentas de gestão empresarial",
  },
  {
    icon: Store,
    name: "Varejo",
    description: "PDV, gestão de vendas e integração omnichannel",
  },
];

const IndustriesSection = () => {
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({
    stagger: true,
    delay: 0.1,
  });

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-6">
        <div ref={titleRef} className="mb-12 text-center sm:mb-16">
          <p className="font-switzer text-xs font-semibold uppercase tracking-[0.3em] text-[#8d6a44]">
            Setores atendidos
          </p>
          <h2 className="mt-4 font-clash text-3xl font-semibold leading-tight tracking-[-0.045em] text-gray-900 sm:text-4xl lg:text-5xl">
            Experiência multissetorial
          </h2>
          <p className="mx-auto mt-5 max-w-3xl font-switzer text-base leading-7 text-gray-700 sm:text-lg sm:leading-8">
            Desenvolvemos soluções customizadas para diversos segmentos, sempre
            adaptando nossa expertise às necessidades específicas de cada
            operação.
          </p>
        </div>

        <div
          ref={contentRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8"
        >
          {industries.map((industry, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-[#d6b183]/40 hover:shadow-xl"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#d6b183]/5 transition-all duration-300 group-hover:scale-150" />
              <div className="relative">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#d6b183]/10 transition-all duration-300 group-hover:bg-[#d6b183] group-hover:scale-110">
                  <industry.icon className="h-7 w-7 text-[#d6b183] transition-all duration-300 group-hover:text-white" />
                </div>
                <h3 className="mb-3 font-clash text-xl font-semibold text-gray-900">
                  {industry.name}
                </h3>
                <p className="font-switzer text-sm leading-relaxed text-gray-600">
                  {industry.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="font-switzer text-base text-gray-700">
            Seu setor não está listado?
            <a
              href="https://wa.me/5592982054683"
              className="ml-2 font-semibold text-[#d6b183] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fale conosco →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
