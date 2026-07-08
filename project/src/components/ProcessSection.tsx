import { useGsapReveal } from "@hooks/useGsapReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const ProcessSection = () => {
  const { t } = useLanguage();
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({
    stagger: true,
    delay: 0.15,
  });

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={titleRef} className="mb-16 pb-10">
          <span className="mb-4 block font-inter text-xs font-semibold uppercase tracking-widest text-[#e22d2e]">
            {t.process.eyebrow}
          </span>
          <h2 className="max-w-[22ch] font-inter text-3xl font-medium leading-tight text-[#383E42] sm:text-4xl lg:text-5xl">
            {t.process.headline1}{" "}
            <span className="italic text-[#e22d2e]">{t.process.accent}</span>
          </h2>
        </div>

        {/* Steps list */}
        <div ref={contentRef} className="">
          {t.process.steps.map((step) => (
            <div
              key={step.number}
              className="grid grid-cols-1 gap-4 border-t border-slate-100 py-10 lg:grid-cols-[80px_1fr] lg:gap-12 lg:items-start"
            >
              {/* Number */}
              <span className="font-inter text-sm font-bold text-[#e22d2e] tracking-widest">
                {step.number}
              </span>

              {/* Content */}
              <div>
                <h3 className="mb-3 font-inter text-xl font-medium text-[#383E42] sm:text-2xl">
                  {step.title}
                </h3>
                <p className="max-w-2xl font-inter text-sm font-light leading-relaxed text-slate-600 sm:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 pt-12">
          <p className="mb-6 font-inter text-lg font-medium text-[#383E42]">
            {t.process.cta_text}
          </p>
          <a
            href="https://wa.me/5592982054683"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#e22d2e] rounded-full px-8 py-4 font-inter text-sm font-semibold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-[#601311]"
          >
            {t.process.cta_button}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
