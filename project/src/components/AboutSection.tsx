import { useGsapReveal } from "@hooks/useGsapReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const pillarIcons = [
  // Target / precision
  <svg
    key="target"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>,
  // Lightning / speed
  <svg
    key="lightning"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>,
  // Lock / security
  <svg
    key="lock"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>,
];

const AboutSection = () => {
  const { t } = useLanguage();
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({ delay: 0.15 });
  const pillarsRef = useGsapReveal<HTMLDivElement>({
    delay: 0.25,
    stagger: true,
  });

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={titleRef} className="mb-14">
          <p className="mb-4 font-inter text-xs font-semibold uppercase tracking-[0.3em] text-[#e22d2e]">
            {t.about.eyebrow}
          </p>
          <h2 className="max-w-[22ch] font-inter text-3xl font-medium leading-tight text-[#383E42] sm:text-4xl lg:text-5xl">
            {t.about.headline1}{" "}
            <span className="italic text-[#e22d2e]">{t.about.accent}</span>
          </h2>
        </div>

        {/* Body text */}
        <div ref={contentRef} className="mb-16 max-w-3xl space-y-6">
          <p className="font-inter text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
            {t.about.body1}
          </p>
          <p className="font-inter text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
            {t.about.body2}
          </p>
        </div>

        {/* Pilares */}
        <div ref={pillarsRef} className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {t.about.pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="py-10 sm:px-10 sm:py-0 first:pl-0 last:pr-0"
            >
              <div className="mb-6">{pillarIcons[i]}</div>
              <h3 className="mb-3 font-inter text-lg font-medium text-[#383E42]">
                {pillar.title}
              </h3>
              <p className="font-inter text-sm font-light leading-relaxed text-slate-600">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
