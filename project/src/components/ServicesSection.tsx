import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { SERVICES } from "@constants/services";
import { useGsapReveal } from "@hooks/useGsapReveal";

const ServicesSection = () => {
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({ delay: 0.15 });

  return (
    <section id="servicos" className="py-12 sm:py-20 bg-transparent">
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 md:px-8">
        <div ref={titleRef} className="text-center mb-6 sm:mb-12">
          <h2 className="font-cabinet text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-6">
            Nossos <span className="text-spotify-green">Serviços</span>
          </h2>
        </div>
        <div ref={contentRef}>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={12}
            slidesPerView={1}
            breakpoints={{
              480: { slidesPerView: 1 },
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            speed={600}
          >
            {SERVICES.map((service, index) => (
              <SwiperSlide key={index} className="h-auto">
                <Link
                  href={service.route}
                  className="group flex h-full min-h-[260px] sm:min-h-[320px] flex-col items-center rounded-2xl border border-gray-200/80 bg-white/80 p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl sm:p-7"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-spotify-green sm:mb-6 sm:h-14 sm:w-14">
                    <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="mb-3 font-cabinet text-base font-bold text-gray-900 transition-colors group-hover:text-spotify-green sm:mb-4 sm:text-xl">
                    {service.title}
                  </h3>
                  <p className="flex-1 text-xs leading-relaxed text-gray-700 sm:text-base">
                    {service.description}
                  </p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
