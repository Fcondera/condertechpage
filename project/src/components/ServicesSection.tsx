"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useGsapReveal } from "@hooks/useGsapReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const SERVICE_IMAGES = [
  "/image/lp-02.jpeg",
  "/image/lp-03.jpeg",
  "/image/lp-04.jpeg",
];

const ServicesSection = () => {
  const { t } = useLanguage();
  const titleRef = useGsapReveal<HTMLDivElement>();
  const progressFillRef = useRef<HTMLDivElement>(null);

  return (
    <section id="servicos" className="overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={titleRef} className="mb-16 pb-10">
          <h2 className="max-w-[20ch] font-inter text-3xl font-medium leading-tight text-[#383E42] sm:text-4xl lg:text-5xl">
            {t.services.headline1}{" "}
            <span className="italic text-[#e22d2e]">{t.services.accent}</span>
          </h2>
        </div>

        {/* Carrossel — apenas mobile */}
        <div className="md:hidden">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            spaceBetween={0}
            centeredSlides={false}
            loop={true}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            onAutoplayTimeLeft={(_, __, progress) => {
              if (progressFillRef.current) {
                progressFillRef.current.style.transform = `scaleX(${1 - progress})`;
              }
            }}
            className="w-full"
          >
            {t.services.items.map((service, index) => (
              <SwiperSlide key={service.title}>
                <div className="w-full px-2">
                  <div className="mx-auto w-full max-w-[340px]">
                    <img
                      src={SERVICE_IMAGES[index]}
                      alt={service.title}
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                    <p className="mt-4 font-inter text-sm font-light leading-relaxed text-slate-600 line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Barra de progresso */}
          <div className="mt-6 h-[3px] w-full max-w-[220px] mx-auto rounded-full overflow-hidden bg-slate-200">
            <div
              ref={progressFillRef}
              className="h-full w-full rounded-full bg-[#e22d2e] origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>

        {/* Grid estático — tablet e desktop */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-10 lg:gap-14">
          {t.services.items.map((service, index) => (
            <div key={service.title}>
              <img
                src={SERVICE_IMAGES[index]}
                alt={service.title}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
              <p className="mt-4 font-inter text-sm font-light leading-relaxed text-slate-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
