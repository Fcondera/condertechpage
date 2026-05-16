import { useGsapReveal } from "@hooks/useGsapReveal";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "A ConderTech não apenas entregou um sistema. Eles redefiniram como operamos. A escalabilidade e performance superaram todas as expectativas.",
    author: "Carlos Mendes",
    role: "CTO",
    company: "TechCorp Brasil",
    avatar: "CM",
  },
  {
    quote:
      "Precisávamos de um parceiro que entendesse nossos desafios de segurança e compliance. A equipe demonstrou expertise técnica excepcional.",
    author: "Ana Paula Santos",
    role: "Diretora de TI",
    company: "FinSecure",
    avatar: "AS",
  },
  {
    quote:
      "O que mais impressionou foi a capacidade de traduzir requisitos complexos em soluções elegantes. ROI positivo em menos de 6 meses.",
    author: "Roberto Almeida",
    role: "CEO",
    company: "LogistiMax",
    avatar: "RA",
  },
];

const TestimonialsSection = () => {
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({
    stagger: true,
    delay: 0.15,
  });

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-6">
        <div ref={titleRef} className="mb-12 text-center sm:mb-16">
          <p className="font-switzer text-xs font-semibold uppercase tracking-[0.3em] text-[#8d6a44]">
            Depoimentos
          </p>
          <h2 className="mt-4 font-clash text-3xl font-semibold leading-tight tracking-[-0.045em] text-gray-900 sm:text-4xl lg:text-5xl">
            O que nossos clientes dizem
          </h2>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:border-spotify-green/40 hover:shadow-2xl"
            >
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-spotify-green/5 transition-all duration-300 group-hover:scale-150" />

              <Quote className="mb-6 h-10 w-10 text-spotify-green/30" />

              <p className="relative mb-6 font-switzer text-base leading-relaxed text-gray-700">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-spotify-green font-clash text-lg font-bold text-white">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-switzer text-sm font-semibold text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="font-switzer text-xs text-gray-600">
                    {testimonial.role} • {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
