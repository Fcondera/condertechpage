import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="flex items-center bg-white pt-20 pb-10 lg:mt-16 lg:min-h-[calc(100vh-64px)] lg:pt-0 lg:pb-0">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-16 xl:gap-20">
          {/* Left — text */}
          <div className="flex-1">
            <h1 className="max-w-[16ch] font-inter text-[2.4rem] font-medium leading-tight text-[#383E42] sm:text-[3.2rem] lg:text-[3.8rem] xl:text-[4.4rem]">
              {t.hero.headline1}{" "}
              <span className="italic text-[#e22d2e]">{t.hero.accent}</span>
            </h1>

            <p className="mt-5 max-w-xl font-inter text-base font-light leading-relaxed text-slate-600 sm:text-lg">
              {t.hero.sub}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-8">
              {t.hero.stats.map((stat) => (
                <div key={stat.label}>
                  <span className="block font-inter text-2xl font-bold text-[#383E42]">
                    {stat.value}
                  </span>
                  <span className="font-inter text-xs uppercase tracking-widest text-slate-600">
                    {stat.label}
                  </span>
                </div>
              ))}
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
