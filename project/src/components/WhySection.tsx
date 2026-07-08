import { useGsapReveal } from "@hooks/useGsapReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mt-0.5 shrink-0"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const WhySection = () => {
  const { t } = useLanguage();
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({ delay: 0.15 });
  const benefitsRef = useGsapReveal<HTMLUListElement>({
    delay: 0.25,
    stagger: true,
  });

  return (
    <section id="solucoes" className="bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={titleRef} className="mb-12">
          <span className="mb-4 block font-inter text-xs font-semibold uppercase tracking-widest text-[#e22d2e]">
            {t.why.eyebrow}
          </span>
          <h2 className="max-w-[22ch] font-inter text-3xl font-medium leading-tight text-[#383E42] sm:text-4xl lg:text-5xl">
            {t.why.headline1}{" "}
            <span className="italic text-[#e22d2e]">{t.why.accent}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — body text */}
          <div ref={contentRef} className="space-y-6">
            <p className="font-inter text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
              {t.why.body1}
            </p>
            <p className="font-inter text-base font-medium leading-8 text-[#383E42] sm:text-lg sm:leading-9">
              {t.why.body2}
            </p>
          </div>

          {/* Right — checklist */}
          <div>
            <ul ref={benefitsRef} className="space-y-5">
              {t.why.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="font-inter text-base text-slate-600">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing */}
        <p className="mt-16 max-w-3xl border-t border-slate-100 pt-10 font-inter text-lg font-medium leading-relaxed text-[#383E42]">
          {t.why.closing}
        </p>
      </div>
    </section>
  );
};

export default WhySection;
