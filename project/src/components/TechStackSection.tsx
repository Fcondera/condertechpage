import { useGsapReveal } from "@hooks/useGsapReveal";

const techCategories = [
  {
    category: "Frontend & Mobile",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "React Native",
      "Flutter",
      "Vue.js",
      "Tailwind CSS",
    ],
  },
  {
    category: "Backend & APIs",
    technologies: [
      "Node.js",
      "Python",
      "Java",
      "Go",
      ".NET Core",
      "GraphQL",
      "REST APIs",
    ],
  },
  {
    category: "Cloud & DevOps",
    technologies: [
      "AWS",
      "Google Cloud",
      "Azure",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Terraform",
    ],
  },
  {
    category: "Dados & IA",
    technologies: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Machine Learning",
      "TensorFlow",
      "Data Analytics",
      "Big Data",
    ],
  },
];

const TechStackSection = () => {
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({
    stagger: true,
    delay: 0.1,
  });

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-6">
        <div ref={titleRef} className="mb-12 text-center sm:mb-16">
          <p className="font-switzer text-xs font-semibold uppercase tracking-[0.3em] text-[#8d6a44]">
            Tecnologia de ponta
          </p>
          <h2 className="mt-4 font-clash text-3xl font-semibold leading-tight tracking-[-0.045em] text-gray-900 sm:text-4xl lg:text-5xl">
            Stack moderno para soluções escaláveis
          </h2>
          <p className="mx-auto mt-5 max-w-3xl font-switzer text-base leading-7 text-gray-700 sm:text-lg sm:leading-8">
            Utilizamos as tecnologias mais robustas e testadas do mercado para
            garantir performance, segurança e escalabilidade em cada projeto.
          </p>
        </div>

        <div
          ref={contentRef}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 sm:gap-8"
        >
          {techCategories.map((category, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg transition-all duration-300 hover:border-spotify-green/40 hover:shadow-xl sm:p-8"
            >
              <h3 className="mb-6 font-clash text-xl font-semibold text-gray-900">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="inline-block rounded-lg border border-gray-200 bg-white px-3 py-1.5 font-switzer text-xs font-medium text-gray-700 transition-all duration-200 hover:border-spotify-green hover:bg-spotify-green/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="font-switzer text-sm text-gray-600">
            E muito mais... Nossa stack evolui constantemente com as melhores
            práticas do mercado.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
