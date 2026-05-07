import { useGsapReveal } from "@hooks/useGsapReveal";

const AboutSection = () => {
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({ delay: 0.15 });

  return (
    <section className="bg-white py-16 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 md:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <div ref={titleRef}>
            <p className="text-center font-switzer text-xs font-semibold uppercase tracking-[0.3em] text-[#8d6a44]">
              Sobre
            </p>
            <h2 className="mt-4 text-center font-cabinet text-2xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              A espinha dorsal digital para operações de elite.
            </h2>
          </div>
          <div
            ref={contentRef}
            className="mx-auto mt-10 max-w-3xl space-y-8 text-center text-gray-900"
          >
            <p className="text-base leading-8 text-gray-700 sm:text-lg sm:leading-9">
              Nascida no coração do polo tecnológico de Blumenau, a ConderTech
              projeta a espinha dorsal digital de empresas de elite. Combinamos
              o rigor da engenharia com a agilidade da inovação global para
              criar sistemas que são, simultaneamente, potentes e resilientes.
              Não entregamos apenas código; entregamos o controle do futuro do
              seu negócio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
