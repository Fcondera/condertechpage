import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
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
                Produtos digitais que dominam
                <span className="text-[#d6b183]"> todo o ecossistema</span>
                do agro ao varejo.
              </h1>
            </div>

            <p
              ref={subtitleRef}
              className="mt-6 max-w-2xl font-switzer text-sm leading-7 text-white sm:text-lg sm:leading-8"
            >
              Da estrategia ao deploy, desenhamos interfaces, e-commerces e
              sistemas internos sob medida para vender mais, operar com
              previsibilidade e escalar com clareza.
            </p>
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
