import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { PORTFOLIO_PROJECTS } from "@constants/navigation";
import { useGsapReveal } from "@hooks/useGsapReveal";

const PortfolioSection = () => {
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({
    stagger: true,
    delay: 0.1,
    staggerAmount: 0.1,
  });

  return (
    <section id="portfolio" className="py-12 sm:py-20 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6">
        <div ref={titleRef} className="text-center mb-8 sm:mb-16">
          <h2 className="font-cabinet text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Nosso <span className="text-spotify-green">Portfólio</span>
          </h2>
        </div>

        <div
          ref={contentRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {PORTFOLIO_PROJECTS.map((project, index) => (
            <PortfolioCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PortfolioCard = ({
  project,
  index,
}: {
  project: (typeof PORTFOLIO_PROJECTS)[number];
  index: number;
}) => {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl transition-all duration-300 w-full"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative h-40 sm:h-48 overflow-hidden cursor-pointer group/image">
        <a
          href={project.image}
          target="_blank"
          rel="noopener noreferrer"
          title="Abrir imagem em nova aba"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover/image:scale-110 max-w-full"
          />
        </a>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <Link
            href={project.route}
            className="p-3 bg-spotify-green/80 rounded-full text-white hover:bg-spotify-green transition-colors hover:scale-110"
            aria-label={`Visualizar projeto ${project.title}`}
          >
            <ExternalLink className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="inline-block px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-spotify-green text-white mb-2 sm:mb-3">
          {project.category}
        </div>
        <h3 className="text-base sm:text-xl text-gray-600 mb-2">
          {project.title}
        </h3>
      </div>
    </div>
  );
};

export default PortfolioSection;
