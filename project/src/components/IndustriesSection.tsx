import { useGsapReveal } from "@hooks/useGsapReveal";
import { useLanguage } from "@/contexts/LanguageContext";

// Fixed SVG icons (order matches translation items)
const industryIcons = [
  <svg
    key="0"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>,
  <svg
    key="1"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>,
  <svg
    key="2"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>,
  <svg
    key="3"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>,
  <svg
    key="4"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>,
  <svg
    key="5"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="3" width="15" height="13" />
    <path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>,
  <svg
    key="6"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93l-1.41 1.41M21 12h-2M19.07 19.07l-1.41-1.41M12 21v-2M4.93 19.07l1.41-1.41M3 12h2M4.93 4.93l1.41 1.41M12 3V1" />
  </svg>,
  <svg
    key="7"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>,
];

const IndustriesSection = () => {
  const { t } = useLanguage();
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({
    stagger: true,
    delay: 0.1,
  });

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={titleRef} className="mb-14 pb-10">
          <p className="mb-4 font-inter text-xs font-semibold uppercase tracking-[0.3em] text-[#e22d2e]">
            {t.industries.eyebrow}
          </p>
          <h2 className="max-w-[22ch] font-inter text-3xl font-medium leading-tight text-[#383E42] sm:text-4xl lg:text-5xl">
            {t.industries.headline1}{" "}
            <span className="italic text-[#e22d2e]">{t.industries.accent}</span>
          </h2>
        </div>

        {/* Grid */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {t.industries.items.map((industry, index) => (
            <div
              key={index}
              className="p-8 hover:bg-white transition-colors duration-200"
            >
              <div className="mb-5">{industryIcons[index]}</div>
              <h3 className="mb-3 font-inter text-base font-medium text-[#383E42]">
                {industry.name}
              </h3>
              <p className="font-inter text-sm font-light leading-relaxed text-slate-600">
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
