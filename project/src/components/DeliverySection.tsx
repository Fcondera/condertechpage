import { useGsapReveal } from "@hooks/useGsapReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const DeliverySection = () => {
  const { t } = useLanguage();
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({ delay: 0.15 });

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Header */}
          <div ref={titleRef}>
            <span className="mb-4 block font-inter text-xs font-semibold uppercase tracking-widest text-[#e22d2e]">
              {t.delivery.eyebrow}
            </span>
            <h2 className="max-w-[16ch] font-inter text-3xl font-medium leading-tight text-[#383E42] sm:text-4xl lg:text-5xl">
              {t.delivery.headline1}{" "}
              <span className="italic text-[#e22d2e]">
                {t.delivery.accent}
              </span>
            </h2>
          </div>

          {/* Body text */}
          <div ref={contentRef} className="space-y-6">
            <p className="font-inter text-base font-medium leading-8 text-[#383E42] sm:text-lg sm:leading-9">
              {t.delivery.body1}
            </p>
            <p className="font-inter text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
              {t.delivery.body2}
            </p>
            <p className="font-inter text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
              {t.delivery.body3}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
