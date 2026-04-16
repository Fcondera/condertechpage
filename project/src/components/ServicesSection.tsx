import Link from "next/link";
import { SERVICES } from "@constants/services";
import { useGsapReveal } from "@hooks/useGsapReveal";

const ServicesSection = () => {
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({
    delay: 0.15,
    stagger: true,
  });

  return (
    <section
      id="servicos"
      className="relative overflow-hidden bg-white py-24 sm:py-28"
    >
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-65" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div ref={titleRef} className="mb-14 max-w-5xl sm:mb-20">
          <p className="font-switzer text-xs font-semibold uppercase tracking-[0.3em] text-[#8d6a44]">
            Servicos por industria
          </p>
          <h2 className="mt-4 max-w-[14ch] font-clash text-4xl font-semibold leading-[0.92] tracking-[-0.045em] text-black sm:text-5xl lg:text-[4.2rem]">
            Solucoes para todo ecossistema de negocio.
          </h2>
          <p className="mt-5 max-w-3xl font-switzer text-base leading-7 text-black sm:text-lg sm:leading-8">
            Conectamos estrategia, interface e software para operar com
            excelencia em agro, industria, varejo, logistica, servicos e
            plataformas digitais.
          </p>
        </div>
      </div>

      <div ref={contentRef} className="space-y-10 sm:space-y-12">
        {SERVICES.map((service, index) => {
          const reverse = index % 2 === 1;

          return (
            <div
              key={service.title}
              className={
                reverse
                  ? "mr-auto w-[calc(100%-0.75rem)] sm:w-[calc(100%-2.5rem)] lg:w-[calc(100%-9rem)]"
                  : "ml-auto w-[calc(100%-0.75rem)] sm:w-[calc(100%-2.5rem)] lg:w-[calc(100%-9rem)]"
              }
            >
              <article className="group relative isolate overflow-hidden border-y border-white/15 bg-[#11100d]">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 grayscale transition duration-700 group-hover:scale-[1.03]"
                  style={{ backgroundImage: `url('${service.image}')` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,8,8,0.93)_0%,rgba(8,8,8,0.83)_36%,rgba(8,8,8,0.64)_62%,rgba(8,8,8,0.84)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,177,131,0.24)_0%,rgba(214,177,131,0)_35%),radial-gradient(circle_at_bottom_right,rgba(156,192,219,0.18)_0%,rgba(156,192,219,0)_32%)]" />
                <div className="grain-overlay absolute inset-0 opacity-80" />

                <div
                  className={`relative z-10 grid min-h-[420px] items-center px-5 py-8 sm:px-8 sm:py-10 lg:min-h-[520px] lg:px-12 lg:py-12 ${reverse ? "lg:grid-cols-[minmax(220px,0.82fr)_minmax(0,1.18fr)]" : "lg:grid-cols-[minmax(0,1.18fr)_minmax(220px,0.82fr)]"}`}
                >
                  <div
                    className={
                      reverse
                        ? "lg:col-start-2 lg:flex lg:justify-end"
                        : "lg:col-start-1"
                    }
                  >
                    <div className="max-w-2xl p-4 text-left text-white sm:p-6">
                      <h3 className="max-w-[12ch] font-clash text-4xl font-semibold leading-[0.93] tracking-[-0.045em] text-white sm:text-5xl lg:text-[4.25rem]">
                        {service.title}
                      </h3>

                      <p className="mt-5 max-w-xl font-switzer text-base leading-7 text-white sm:text-lg sm:leading-8">
                        {service.description}
                      </p>

                      <p className="mt-4 max-w-xl font-switzer text-sm leading-7 text-white sm:text-base">
                        {service.details}
                      </p>

                      <p className="mt-5 font-switzer text-xs uppercase tracking-[0.2em] text-[#d6b183]">
                        {service.eyebrow}
                      </p>

                      <div className="mt-8 flex flex-wrap justify-start gap-3">
                        {service.highlights.map((item) => (
                          <span
                            key={item}
                            className="border border-white/18 bg-black/25 px-4 py-2 font-switzer text-xs uppercase tracking-[0.22em] text-white backdrop-blur-sm"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={service.route}
                        className="mt-9 inline-flex items-center gap-3 border-b border-[#d6b183] pb-2 font-switzer text-sm font-medium uppercase tracking-[0.22em] text-[#f3efe7] transition hover:text-[#d6b183]"
                      >
                        Ver servico
                        <span aria-hidden="true">/</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
