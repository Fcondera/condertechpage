import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="flex items-center bg-white pt-20 pb-10 lg:mt-16 lg:min-h-[calc(100vh-64px)] lg:pt-0 lg:pb-0">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-16 xl:gap-20">
          {/* Left — text */}
          <div className="flex-1">
            <h1 className="max-w-[18ch] font-inter text-[2.2rem] font-medium leading-tight text-[#383E42] sm:text-[3rem] lg:text-[3.4rem] xl:text-[3.9rem]">
              {t.hero.headline1}{" "}
              <span className="italic text-[#e22d2e]">{t.hero.accent}</span>
            </h1>

            <p className="mt-6 max-w-xl font-inter text-base font-medium leading-relaxed text-[#383E42] sm:text-lg">
              {t.hero.question}
            </p>

            <p className="mt-4 max-w-xl font-inter text-base font-light leading-relaxed text-slate-600 sm:text-lg">
              {t.hero.sub}
            </p>

            <p className="mt-4 max-w-xl font-inter text-sm font-light italic leading-relaxed text-slate-500">
              {t.hero.note}
            </p>

            <div className="mt-8">
              <a
                href="https://wa.me/5592982054683"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#e22d2e] rounded-full px-8 py-4 font-inter text-sm font-semibold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-[#601311]"
              >
                {t.hero.cta}
              </a>
            </div>
          </div>

          {/* Right — image */}
          <div className="w-full lg:w-[45%] shrink-0">
            <img
              src="/image/hero01-lpgeral.jpeg"
              alt="Plataforma ConderTech"
              className="w-full h-auto max-h-[70vh] object-contain"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
