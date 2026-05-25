import Link from "next/link";
import { useGsapReveal } from "@hooks/useGsapReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const ServicesSection = () => {
  const { t } = useLanguage();
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({
    delay: 0.15,
    stagger: true,
  });

  return (
    <section id="servicos" className="bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={titleRef} className="mb-16 pb-10">
          <h2 className="max-w-[20ch] font-inter text-3xl font-medium leading-tight text-[#383E42] sm:text-4xl lg:text-5xl">
            {t.services.headline1}{" "}
            <span className="italic text-[#e22d2e]">{t.services.accent}</span>
          </h2>
        </div>

        {/* Services list */}
        <div ref={contentRef}>
          {t.services.items.map((service, index) => (
            <div
              key={service.title}
              className="group grid grid-cols-1 gap-6 py-10 transition-colors duration-200 hover:bg-[#fafafa] lg:grid-cols-[80px_1fr_auto] lg:items-center lg:gap-12 lg:px-4"
            >
              {/* Number */}
              <span className="font-inter text-sm font-bold text-[#e22d2e] lg:text-base">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <div>
                <p className="mb-1 font-inter text-xs font-semibold uppercase tracking-widest text-slate-600">
                  {service.eyebrow}
                </p>
                <h3 className="mb-3 font-inter text-xl font-medium text-[#383E42] sm:text-2xl">
                  {service.title}
                </h3>
                <p className="max-w-2xl font-inter text-sm font-light leading-relaxed text-slate-600 sm:text-base">
                  {service.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.highlights.map((item) => (
                    <span
                      key={item}
                      className="border border-[#e5e5e5] px-3 py-1 font-inter text-xs uppercase tracking-widest text-slate-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href={service.route}
                className="inline-flex items-center gap-2 border border-[#090909] rounded-full px-6 py-3 font-inter text-xs font-semibold uppercase tracking-widest text-[#383E42] transition-colors duration-200 hover:bg-[#090909] hover:text-white lg:whitespace-nowrap"
              >
                {t.services.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
