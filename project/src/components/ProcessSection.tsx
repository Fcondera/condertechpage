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
          <h2 className="max-w-[22ch] font-inter text-3xl font-medium leading-tight text-[#383E42] sm:text-4xl lg:text-5xl">
            {t.process.headline1}{" "}
            <span className="italic text-[#e22d2e]">{t.process.accent}</span>
          </h2>
          <p className="mt-5 max-w-2xl font-inter text-base font-light leading-relaxed text-slate-600 sm:text-lg">
            {t.process.sub}
          </p>
        </div>

        {/* Steps list */}
        <div ref={contentRef} className="">
          {t.process.steps.map((step) => (
            <div
              key={step.number}
              className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-[80px_1fr_260px] lg:gap-12 lg:items-start"
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
                <p className="font-inter text-sm font-light leading-relaxed text-slate-600 sm:text-base">
                  {step.description}
                </p>
              </div>

              {/* Deliverables */}
              <div>
                <p className="mb-3 font-inter text-xs font-semibold uppercase tracking-widest text-slate-600">
                  {t.process.deliveries}
                </p>
                <ul className="space-y-2">
                  {step.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 font-inter text-sm text-slate-600"
                    >
                      <span className="h-1.5 w-1.5 flex-shrink-0 bg-[#e22d2e]" />
                      {item}
                    </li>
                  ))}
                </ul>
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
