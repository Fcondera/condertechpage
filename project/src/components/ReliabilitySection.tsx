import { useGsapReveal } from "@hooks/useGsapReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const ReliabilitySection = () => {
  const { t } = useLanguage();
  const contentRef = useGsapReveal<HTMLDivElement>();

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div ref={contentRef} className="max-w-4xl">
          <h2 className="font-inter text-3xl font-medium leading-tight text-[#383E42] sm:text-4xl lg:text-5xl">
            {t.reliability.heading}
          </h2>

          <div className="mt-8 space-y-6 font-inter text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
            <p>{t.reliability.body1}</p>

            <p className="font-medium text-[#383E42]">
              {t.reliability.body2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReliabilitySection;
