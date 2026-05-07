const AboutPage = () => {
  const team = [
    {
      name: "Felipe Condera",
      role: "Founder & CEO",
      photo:
        "https://media.licdn.com/dms/image/v2/D4D03AQFnWryHOESv2w/profile-displayphoto-scale_200_200/B4DZe7W2nAGgAg-/0/1751195022222?e=1766016000&v=beta&t=t5OC-onEIm6F7kAVKXyDrtfXrzxbyseZUqcKw99HKig",
      bio: "Especialista em React, Next.js e apaixonado por criar interfaces incríveis.",
      linkedin: "https://br.linkedin.com/in/felipecondera",
    },
    {
      name: "Matheus Martins",
      role: "Desenvolvedor",
      photo:
        "https://media.licdn.com/dms/image/v2/D4E35AQF_Sl4k7ErRZQ/profile-framedphoto-shrink_200_200/B4EZpXnulPGoAY-/0/1762406623861?e=1764892800&v=beta&t=YiGSX79pYY29s2W-uyXzUG1HFi3N47c7G6DPlkFiZbM",
      bio: "Focado em Java, Node.js, APIs e soluções escaláveis para negócios digitais.",
      linkedin: "https://www.linkedin.com/in/matheusmartnsdev/",
    },
    {
      name: "Vitor Luna",
      role: "Desenvolvedor",
      photo:
        "https://media.licdn.com/dms/image/v2/D4D03AQECJH5dUxvvSw/profile-displayphoto-scale_200_200/B4DZoqVhRPKUAY-/0/1761646877989?e=1766016000&v=beta&t=GDndkzL7eIK-jfPfxJxoAQ0L-co9EAlF6ejBr-NR-Zs",
      bio: "Estudante de Análise e Desenvolvimento de Sistemas, focado em desenvolvimento web.",
      linkedin: "https://www.linkedin.com/in/vitor-luna-a938a6273/",
    },
  ];

  return (
    <>
      {/* About Section */}
      <div className="min-h-screen bg-white pt-16 sm:pt-20">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-8 sm:py-20">
          <div className="w-full max-w-4xl mx-auto">
            <h1 className="font-cabinet text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
              A espinha dorsal digital para{" "}
              <span className="text-spotify-green">empresas de elite</span>
            </h1>

            <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                Nascida no coração do polo tecnológico de Blumenau, a ConderTech
                projeta a espinha dorsal digital de empresas de elite.
                Combinamos o rigor da engenharia com a agilidade da inovação
                global para criar sistemas que são, simultaneamente, potentes e
                resilientes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 my-8 sm:my-12">
                <div className="p-4 sm:p-6 md:p-8 bg-gray-50 rounded-lg border border-gray-200 h-full flex flex-col justify-between">
                  <h3 className="text-lg sm:text-2xl font-bold text-spotify-green mb-3 sm:mb-4">
                    Engenharia de Squads
                  </h3>
                  <p className="text-sm sm:text-base">
                    Times de elite integrados à sua cultura técnica para
                    acelerar o roadmap sem inércia.
                  </p>
                </div>

                <div className="p-4 sm:p-8 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg sm:text-2xl font-bold text-spotify-green mb-3 sm:mb-4">
                    Governança & Blindagem
                  </h3>
                  <p className="text-sm sm:text-base">
                    Arquiteturas resilientes em conformidade com padrões globais
                    de segurança e auditoria de dados.
                  </p>
                </div>

                <div className="p-4 sm:p-8 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg sm:text-2xl font-bold text-spotify-green mb-3 sm:mb-4">
                    IA Aplicada ao ROI
                  </h3>
                  <p className="text-sm sm:text-base">
                    Inteligência Artificial focada em eficiência operacional e
                    geração de lucro real, não apenas inovação visual.
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                Não entregamos apenas código; entregamos o controle do futuro do
                seu negócio, com sistemas desenhados para escala,
                previsibilidade e segurança operacional.
              </p>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                Atuamos lado a lado com líderes que precisam transformar
                operação em vantagem competitiva, conectando software,
                governança e inteligência aplicada em ativos digitais críticos.
              </p>

              <div className="border-t border-b border-gray-200 py-8 sm:py-12 my-8 sm:my-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                  Por que nos escolher?
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="text-spotify-green font-bold text-xl sm:text-2xl flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-xs sm:text-sm md:text-base lg:text-lg">
                      Squads de elite acoplados ao seu contexto técnico
                    </span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="text-spotify-green font-bold text-xl sm:text-2xl flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-sm sm:text-base md:text-lg">
                      Arquiteturas resilientes para operações críticas
                    </span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="text-spotify-green font-bold text-xl sm:text-2xl flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-sm sm:text-base md:text-lg">
                      Inteligência aplicada com foco em eficiência e lucro
                    </span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="text-spotify-green font-bold text-xl sm:text-2xl flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-sm sm:text-base md:text-lg">
                      Governança e auditoria de dados desde a fundação
                    </span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="text-spotify-green font-bold text-xl sm:text-2xl flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-sm sm:text-base md:text-lg">
                      Decisão em tempo real orientada por dados confiáveis
                    </span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="text-spotify-green font-bold text-xl sm:text-2xl flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-sm sm:text-base md:text-lg">
                      Software sob medida para contextos de alta exigência
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-spotify-green to-spotify-light-green p-4 sm:p-6 md:p-8 rounded-lg text-white">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                  Pronto para começar seu projeto?
                </h2>
                <p className="mb-4 sm:mb-6 text-xs sm:text-sm md:text-base">
                  Converse com a ConderTech para estruturar sua próxima fase de
                  escala com engenharia de software e IA aplicada ao negócio.
                </p>
                <a
                  href="#contato"
                  className="inline-block w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-white text-spotify-green font-semibold text-xs sm:text-sm md:text-base rounded-lg hover:bg-gray-100 transition-colors text-center"
                >
                  Solicitar Proposta
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div id="time" className="bg-gray-50 py-12 sm:py-20">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-2 sm:mb-4">
            Nosso <span className="text-spotify-green">Time</span>
          </h2>
          <p className="text-center text-xs sm:text-sm md:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
            Conheça os profissionais talentosos que fazem a ConderTech funcionar
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 flex flex-col items-center border border-gray-200 shadow-lg hover:shadow-xl hover:border-spotify-green/40 transition text-center w-full max-w-xs sm:w-72"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-3 sm:mb-4 border-4 border-spotify-green object-cover max-w-full"
                />
                <h3 className="text-sm sm:text-lg font-bold mb-1 text-gray-900">
                  {member.name}
                </h3>
                <span className="text-spotify-green text-xs sm:text-sm mb-2">
                  {member.role}
                </span>
                <p className="text-gray-600 text-center text-xs sm:text-sm mb-3">
                  {member.bio}
                </p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0077b5] hover:bg-[#005983] transition"
                  title="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2 3.6 4.59v5.606z" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
