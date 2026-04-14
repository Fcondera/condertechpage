import { useGsapReveal } from "@hooks/useGsapReveal";

const team = [
  {
    name: "Felipe Condera",
    role: "Founder & CEO",
    photo:
      "https://media.licdn.com/dms/image/v2/D4D03AQFnWryHOESv2w/profile-displayphoto-scale_200_200/B4DZe7W2nAGgAg-/0/1751195022222?e=1766016000&v=beta&t=t5OC-onEIm6F7kAVKXyDrtfXrzxbyseZUqcKw99HKig",
    bio: "Especialista em React, Next.js e apaixonado por criar interfaces incriveis.",
    linkedin: "https://br.linkedin.com/in/felipecondera",
  },
  {
    name: "Matheus Martins",
    role: "Desenvolvedor",
    photo:
      "https://media.licdn.com/dms/image/v2/D4E35AQF_Sl4k7ErRZQ/profile-framedphoto-shrink_200_200/B4EZpXnulPGoAY-/0/1762406623861?e=1764892800&v=beta&t=YiGSX79pYY29s2W-uyXzUG1HFi3N47c7G6DPlkFiZbM",
    bio: "Focado em Java, Node.js, APIs e solucoes escalaveis para negocios digitais.",
    linkedin: "https://www.linkedin.com/in/matheusmartnsdev/",
  },
  {
    name: "Vitor Luna",
    role: "Desenvolvedor",
    photo:
      "https://media.licdn.com/dms/image/v2/D4D03AQECJH5dUxvvSw/profile-displayphoto-scale_200_200/B4DZoqVhRPKUAY-/0/1761646877989?e=1766016000&v=beta&t=GDndkzL7eIK-jfPfxJxoAQ0L-co9EAlF6ejBr-NR-Zs",
    bio: "Estudante de Analise e Desenvolvimento de Sistemas, focado em desenvolvimento web.",
    linkedin: "https://www.linkedin.com/in/vitor-luna-a938a6273/",
  },
];

const TeamSection = () => {
  const titleRef = useGsapReveal<HTMLHeadingElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({
    stagger: true,
    delay: 0.1,
    staggerAmount: 0.12,
  });

  return (
    <section className="bg-white py-12 text-black sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2
          ref={titleRef}
          className="mb-8 text-center font-cabinet text-2xl font-bold sm:mb-10 sm:text-3xl md:mb-12 md:text-4xl"
        >
          Nosso <span className="text-spotify-green">Time</span>
        </h2>

        <div
          ref={contentRef}
          className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8"
        >
          {team.map((member, idx) => (
            <div
              key={idx}
              className="flex w-full flex-col items-center rounded-2xl bg-white p-4 text-center shadow-md transition hover:shadow-lg sm:w-80 sm:p-6 md:w-72 lg:w-80"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="mb-3 h-20 w-20 rounded-full border-4 border-spotify-green object-cover sm:mb-4 sm:h-24 sm:w-24"
              />

              <h3 className="mb-1 font-cabinet text-base font-semibold sm:text-lg">
                {member.name}
              </h3>
              <span className="mb-2 text-xs text-spotify-green sm:text-sm">
                {member.role}
              </span>

              <p className="mb-3 text-xs text-gray-600 sm:mb-4 sm:text-sm">
                {member.bio}
              </p>

              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0077b5] transition hover:bg-[#005983]"
                title="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-white"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2 3.6 4.59v5.606z" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
