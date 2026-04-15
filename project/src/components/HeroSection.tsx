import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(SplitText, ScrollTrigger, ScrollToPlugin);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const section = sectionRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const orb = orbRef.current;
    if (!title || !section) return;

    // --- Entrada: SplitText por chars ---
    const split = new SplitText(title, { type: "words,chars" });

    const entryTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    entryTl.from(split.chars, {
      y: 80,
      opacity: 0,
      duration: 0.7,
      stagger: 0.022,
    });

    if (subtitle) {
      entryTl.from(subtitle, { y: 30, opacity: 0, duration: 0.6 }, "-=0.3");
    }
    if (cta) {
      entryTl.from(cta, { y: 20, opacity: 0, duration: 0.5 }, "-=0.25");
    }
    if (orb) {
      entryTl.from(
        orb,
        { x: 48, scale: 0.92, opacity: 0, duration: 0.7 },
        "-=0.4",
      );
    }
    if (scrollIndicator) {
      entryTl.from(scrollIndicator, { opacity: 0, duration: 0.4 }, "-=0.1");
    }

    // --- Scroll: cada char some individualmente ao rolar ---
    gsap.fromTo(
      split.chars,
      { opacity: 1, y: 0 },
      {
        y: -60,
        opacity: 0,
        ease: "none",
        stagger: {
          each: 0.018,
          from: "start",
        },
        scrollTrigger: {
          trigger: section,
          start: "2% top",
          end: "50% top",
          scrub: 1,
        },
      },
    );

    // --- Scroll: subtítulo e CTA somem junto ---
    if (subtitle) {
      gsap.fromTo(
        subtitle,
        { opacity: 1, y: 0 },
        {
          y: -30,
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
          y: -20,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "12% top",
            end: "45% top",
            scrub: 1,
          },
        },
      );
    }

    // --- Scroll: DotPattern parallax inverso (desce mais devagar) ---
    // --- Scroll: esconde indicador de scroll ---
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-2 sm:px-4"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(360px,620px)] gap-8 lg:gap-4 items-center">
          {/* Coluna esquerda: Texto */}
          <div className="flex flex-col justify-center lg:pr-10">
            <div className="overflow-hidden">
              <h1
                ref={titleRef}
                className="font-cabinet text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-black mb-4 sm:mb-6 leading-tight text-left"
              >
                Da ideia ao código: Transformamos sua visão em sistemas de alta
                performance.{" "}
              </h1>
            </div>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start"
            ></div>
          </div>

          {/* Coluna direita: Frase */}
          <div
            ref={orbRef}
            className="relative flex justify-center lg:justify-end lg:-mr-4 xl:-mr-8"
          >
            <p
              ref={subtitleRef}
              className="font-clash max-w-[18ch] text-center text-2xl font-semibold leading-[1.08] tracking-tight text-black sm:text-4xl lg:text-[3.2rem]"
            >
              Desenvolvimento sob medida e planos estrategicos para escalar sua
              operacao com tecnologia de ponta.
            </p>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <span className="text-xs text-gray-400 tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-gray-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
