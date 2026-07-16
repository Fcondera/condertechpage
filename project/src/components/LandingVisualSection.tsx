"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useGsapReveal } from "@hooks/useGsapReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const SLIDE_DURATION = 2000;

const showcaseImages = [
  "/image/lp-02.jpeg",
  "/image/lp-03.jpeg",
  "/image/lp-04.jpeg",
  "/image/lp-05.jpeg",
  "/image/lp-06.jpeg",
  "/image/lp-07.jpeg",
];

const LandingVisualSection = () => {
  const { t } = useLanguage();
  const showcases = t.visual.showcases.map((item, idx) => ({
    ...item,
    image: showcaseImages[idx],
  }));
  const [active, setActive] = useState(0);
  const titleRef = useGsapReveal<HTMLDivElement>();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setActive((current) => (current + 1) % showcases.length);
    }, SLIDE_DURATION);

    return () => window.clearTimeout(timeout);
  }, [active]);

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div
          ref={titleRef}
          className="mb-6 lg:mb-8 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-10"
        >
          <div>
            <h2 className="max-w-[12ch] font-inter text-[28px] font-normal leading-[1.08] text-[#1f2f3d] sm:text-4xl lg:text-5xl">
              {t.visual.headline1}{" "}
              <span className="italic text-[#e22d2e]">{t.visual.accent}</span>
            </h2>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {showcases.map((item, index) => (
              <div key={item.title} className="w-full shrink-0">
                <div className="relative mx-auto mt-1 aspect-[4/3] w-full max-w-[280px] overflow-hidden bg-white sm:max-w-[420px] lg:max-w-[520px] xl:max-w-[560px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1280px) 560px, (min-width: 1024px) 520px, (min-width: 640px) 420px, 100vw"
                    priority={active === index}
                    className="object-contain"
                  />
                </div>
                <div className="mx-auto mt-3 max-w-[300px] text-left sm:max-w-xl lg:max-w-2xl lg:text-center">
                  <h3 className="font-inter text-base font-semibold leading-snug text-[#1f2f3d] sm:text-xl lg:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-inter text-[11px] leading-5 text-slate-500 sm:text-sm sm:leading-6">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-6 h-px w-[190px] overflow-hidden bg-slate-200 sm:w-[260px]">
          <span
            key={`visual-progress-${active}`}
            className="block h-full w-full bg-[#e22d2e] animate-[carouselProgress_2s_linear]"
          />
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {showcases.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Ver ${item.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === index ? "w-6 bg-[#e22d2e]" : "w-1.5 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes carouselProgress {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default LandingVisualSection;
