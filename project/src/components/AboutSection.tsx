import { useGsapReveal } from "@hooks/useGsapReveal";

const AboutSection = () => {
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({ delay: 0.15 });

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
        <div className="w-full max-w-4xl mx-auto">
          <div ref={titleRef}>
            <h2 className="font-cabinet text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
              Quem <span className="text-spotify-green">Somos</span>
            </h2>
          </div>
          <div
            ref={contentRef}
            className="space-y-6 sm:space-y-8 text-gray-900 leading-relaxed text-center"
          >
            <p className="text-sm sm:text-base md:text-lg">
              Somos uma empresa especializada em{" "}
              <span className="font-semibold text-spotify-green">
                desenvolvimento de software
              </span>{" "}
              com foco em criar soluções digitais inovadoras e de alta
              performance. Atuamos no mercado transformando ideias em produtos
              tecnológicos que geram valor real para nossos clientes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 my-6 sm:my-8">
              <div>
                <h3 className="text-base sm:text-xl font-bold text-spotify-green mb-2">
                  Nossa Missão
                </h3>
                <p className="text-xs sm:text-base text-gray-800">
                  Transformar ideias em experiências digitais excepcionais,
                  entregando software de qualidade que impulsiona o crescimento
                  dos nossos clientes.
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-bold text-spotify-green mb-2">
                  Nossa Visão
                </h3>
                <p className="text-xs sm:text-base text-gray-800">
                  Ser referência em desenvolvimento de software no Brasil,
                  conhecido pela excelência técnica e inovação contínua em
                  nossas soluções.
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-bold text-spotify-green mb-2">
                  Nossos Valores
                </h3>
                <p className="text-xs sm:text-base text-gray-800">
                  Qualidade, inovação, transparência e compromisso com o sucesso
                  dos nossos clientes são os pilares que guiam todas as nossas
                  ações.
                </p>
              </div>
            </div>
            <p className="text-sm sm:text-base md:text-lg">
              Com uma equipe multidisciplinar de desenvolvedores, designers e
              especialistas em tecnologia, criamos soluções customizadas que
              atendem às necessidades específicas de cada projeto. Desde
              aplicações web modernas até sistemas complexos, trabalhamos com as
              tecnologias mais atuais e as melhores práticas do mercado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
