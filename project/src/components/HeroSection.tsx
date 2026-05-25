import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="flex items-center bg-white mt-16 min-h-[calc(100vh-64px)] py-10 lg:py-0">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-16">
          {/* Left — text */}
          <div className="flex-1">
            <h1 className="max-w-[16ch] font-inter text-[2.2rem] font-medium leading-tight text-[#383E42] sm:text-[3rem] lg:text-[3.4rem] xl:text-[4rem]">
              {t.hero.headline1}{" "}
              <span className="italic text-[#e22d2e]">{t.hero.accent}</span>
            </h1>

            <p className="mt-5 max-w-xl font-inter text-base font-light leading-relaxed text-slate-600">
              {t.hero.sub}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-x-10 gap-y-5 sm:flex sm:flex-wrap sm:gap-10">
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
              src="/image/herolpg-01.png"
              alt="Plataforma ConderTech"
              className="w-full h-auto max-h-[65vh] object-contain"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
