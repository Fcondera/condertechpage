import { useGsapReveal } from "@hooks/useGsapReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const reliabilityIcons = [
  // Security / lock
  <svg
    key="security"
    width="28"
    height="28"
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
  // Privacy / eye-off
  <svg
    key="privacy"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <path d="M14.12 14.12A3 3 0 1 1 9.88 9.88" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>,
  // Stability / balance
  <svg
    key="stability"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="3" x2="12" y2="21" />
    <path d="M5 8l-3 6a4 4 0 0 0 6 0z" />
    <path d="M19 8l-3 6a4 4 0 0 0 6 0z" />
    <path d="M6 21h12" />
    <path d="M12 3l7 5-7-1-7 1z" />
  </svg>,
  // Architecture / layers
  <svg
    key="architecture"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 22 8.5 12 15 2 8.5 12 2" />
    <polyline points="2 15.5 12 22 22 15.5" />
    <polyline points="2 12 12 18.5 22 12" />
  </svg>,
  // Availability / activity
  <svg
    key="availability"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>,
];

const ReliabilitySection = () => {
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
        <div ref={titleRef} className="mb-14 max-w-2xl">
          <span className="mb-4 block font-inter text-xs font-semibold uppercase tracking-widest text-[#e22d2e]">
            {t.reliability.eyebrow}
          </span>
          <h2 className="font-inter text-3xl font-medium leading-tight text-[#383E42] sm:text-4xl lg:text-5xl">
            {t.reliability.headline1}{" "}
            <span className="italic text-[#e22d2e]">
              {t.reliability.accent}
            </span>
          </h2>
          <p className="mt-5 font-inter text-base font-light leading-relaxed text-slate-600 sm:text-lg">
            {t.reliability.intro}
          </p>
        </div>

        {/* Items */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5"
        >
          {t.reliability.items.map((item, i) => (
            <div key={item} className="flex flex-col items-start gap-4">
              {reliabilityIcons[i]}
              <p className="font-inter text-sm font-medium leading-relaxed text-[#383E42]">
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* Closing */}
        <p className="mt-16 max-w-3xl border-t border-slate-100 pt-10 font-inter text-lg font-medium leading-relaxed text-[#383E42]">
          {t.reliability.closing}
        </p>
      </div>
    </section>
  );
};

export default ReliabilitySection;
