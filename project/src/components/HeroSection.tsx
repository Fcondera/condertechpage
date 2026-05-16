import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const section = sectionRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    if (!title || !section) return;

    const split = new SplitText(title, { type: "words,chars" });
    const entryTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    entryTl.from(split.chars, {
      y: 70,
      opacity: 0,
      duration: 0.65,
      stagger: 0.02,
    });

    if (subtitle) {
      entryTl.from(subtitle, { y: 24, opacity: 0, duration: 0.55 }, "-=0.3");
    }
    if (cta) {
      entryTl.from(cta, { y: 24, opacity: 0, duration: 0.45 }, "-=0.2");
    }
    if (scrollIndicator) {
      entryTl.from(scrollIndicator, { opacity: 0, duration: 0.35 }, "-=0.1");
    }

    gsap.fromTo(
      split.chars,
      { opacity: 1, y: 0 },
      {
        y: -60,
        opacity: 0,
        ease: "none",
        stagger: { each: 0.018, from: "start" },
        scrollTrigger: {
          trigger: section,
          start: "2% top",
          end: "50% top",
          scrub: 1,
        },
      },
    );

    if (subtitle) {
      gsap.fromTo(
        subtitle,
        { opacity: 1, y: 0 },
        {
          y: -28,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "8% top",
            end: "45% top",
            scrub: 1,
          },
        },
      );
    }

    if (cta) {
      gsap.fromTo(
        cta,
        { opacity: 1, y: 0 },
        {
          y: -24,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "10% top",
            end: "42% top",
            scrub: 1,
          },
        },
      );
    }

    if (scrollIndicator) {
      gsap.to(scrollIndicator, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "15% top",
          scrub: true,
        },
      });
    }

    return () => {
      split.revert();
      entryTl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-3 pb-10 pt-24 sm:px-5 sm:pt-20 lg:pb-14"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/image/hero.01ctch.png')",
          }}
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.84)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-3 sm:px-6">
        <div className="py-8 lg:py-14">
          <div className="flex flex-col justify-center">
            <div className="overflow-hidden">
              <h1
                ref={titleRef}
                className="max-w-[11.5ch] font-clash text-[2.45rem] font-semibold leading-[0.9] tracking-[-0.045em] text-white sm:text-[3.8rem] md:text-[4.6rem] lg:text-[5.45rem]"
              >
                O Eixo Magnético da
                <span className="text-[#d6b183]"> Evolução Digital.</span>
              </h1>
            </div>

            <p
              ref={subtitleRef}
              className="mt-8 max-w-3xl font-switzer text-sm leading-7 text-white sm:text-lg sm:leading-8"
            >
              Engenharia de Software e Inteligência Artificial para líderes que
              demandam escala, previsibilidade e segurança absoluta em suas
              operações críticas.
            </p>

            <div
              ref={ctaRef}
              className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <a
                  href="https://wa.me/5592982054683"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#d6b183] px-8 py-4 font-switzer text-sm font-semibold uppercase tracking-wider text-gray-900 transition-all duration-300 hover:bg-[#c4a06e] hover:shadow-2xl sm:text-base"
                >
                  Falar com Especialista
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <a
                  href="#servicos"
                  className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-white/30 bg-transparent px-8 py-4 font-switzer text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10 sm:text-base"
                >
                  Ver Soluções
                </a>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap items-center gap-6 sm:gap-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#d6b183]" />
                <span className="font-switzer text-xs text-white/80 sm:text-sm">
                  50+ Empresas Atendidas
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#d6b183]" />
                <span className="font-switzer text-xs text-white/80 sm:text-sm">
                  200+ Projetos Entregues
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#d6b183]" />
                <span className="font-switzer text-xs text-white/80 sm:text-sm">
                  99.9% Uptime
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 sm:bottom-8"
      >
        <span className="text-[0.62rem] uppercase tracking-[0.28em] text-white/58 sm:text-xs sm:tracking-[0.3em]">
          Scroll
        </span>
        <div className="h-8 w-px animate-pulse bg-gradient-to-b from-white/50 to-transparent sm:h-10" />
      </div>
    </section>
  );
};

export default HeroSection;
