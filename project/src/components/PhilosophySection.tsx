import { useGsapReveal } from "@hooks/useGsapReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const PhilosophySection = () => {
  const { t } = useLanguage();
  const contentRef = useGsapReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-[#383E42] py-24 sm:py-32">
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

      <div
        ref={contentRef}
        className="relative mx-auto w-full max-w-4xl px-6 text-center sm:px-8 lg:px-12"
      >
        <span className="mb-6 block font-inter text-xs font-semibold uppercase tracking-widest text-[#e22d2e]">
          {t.philosophy.eyebrow}
        </span>
        <p className="font-inter text-2xl font-medium italic leading-snug text-white sm:text-3xl lg:text-4xl">
          “{t.philosophy.quote}”
        </p>
        <p className="mx-auto mt-10 max-w-2xl font-inter text-base font-light leading-relaxed text-white/60 sm:text-lg">
          {t.philosophy.body1}
        </p>
        <p className="mx-auto mt-4 max-w-2xl font-inter text-base font-light leading-relaxed text-white/60 sm:text-lg">
          {t.philosophy.body2}
        </p>
      </div>
    </section>
  );
};

export default PhilosophySection;
