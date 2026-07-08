import { useGsapReveal } from "@hooks/useGsapReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const benefitIcons = [
  // Team / squads
  <svg
    key="team"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  // Shield / governance
  <svg
    key="shield"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>,
  // Trending up / ROI
  <svg
    key="trending"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>,
];

const WhyChooseSection = () => {
  const { t } = useLanguage();
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({
    stagger: true,
    delay: 0.1,
  });

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div ref={titleRef} className="mb-14 pb-10">
          <h2 className="max-w-[22ch] font-inter text-3xl font-medium leading-tight text-[#383E42] sm:text-4xl lg:text-5xl">
            {t.whyChoose.headline1}{" "}
            <span className="italic text-[#e22d2e]">{t.whyChoose.accent}</span>
          </h2>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {t.whyChoose.benefits.map((benefit, i) => (
            <div
              key={benefit.title}
              className="py-10 sm:px-10 sm:py-0 first:pl-0 last:pr-0"
            >
              <div className="mb-6">{benefitIcons[i]}</div>
              <h3 className="mb-4 font-inter text-lg font-medium text-[#383E42]">
                {benefit.title}
              </h3>
              <p className="font-inter text-sm font-light leading-relaxed text-slate-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
