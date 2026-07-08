import { useGsapReveal } from "@hooks/useGsapReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const valueIcons = [
  // Speed / zap
  <svg
    key="speed"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>,
  // Reliability / shield-check
  <svg
    key="reliability"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>,
  // Organized data / database
  <svg
    key="data"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
  </svg>,
  // Visibility / eye
  <svg
    key="visibility"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#e22d2e"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
  // Growth / trending up
  <svg
    key="growth"
    width="32"
    height="32"
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

const ValueSection = () => {
  const { t } = useLanguage();
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({
    stagger: true,
    delay: 0.15,
  });

  return (
    <section className="relative overflow-hidden bg-[#383E42] py-20 sm:py-28">
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(255,255,255,0.05),transparent)]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={titleRef} className="mb-16 max-w-2xl">
          <span className="mb-4 block font-inter text-xs font-semibold uppercase tracking-widest text-[#e22d2e]">
            {t.value.eyebrow}
          </span>
          <h2 className="font-inter text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-5xl">
            {t.value.headline1}{" "}
            <span className="italic text-[#e22d2e]">{t.value.accent}</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {t.value.items.map((item, i) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-8"
            >
              <div className="mb-6">{valueIcons[i]}</div>
              <h3 className="mb-3 font-inter text-lg font-medium text-white">
                {item.title}
              </h3>
              <p className="font-inter text-sm font-light leading-relaxed text-white/60">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
