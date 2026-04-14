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

          {/* Coluna direita: Esfera */}
          <div
            ref={orbRef}
            className="relative flex justify-center lg:justify-end lg:-mr-10 xl:-mr-16"
          >
            <div className="relative h-[250px] w-[250px] sm:h-[330px] sm:w-[330px] lg:h-[420px] lg:w-[420px] xl:h-[470px] xl:w-[470px] overflow-hidden rounded-full bg-[radial-gradient(circle_at_32%_26%,rgba(34,34,34,0.72)_0%,rgba(24,24,24,0.96)_22%,rgba(10,10,10,0.99)_54%,#000_78%,#000_100%)] shadow-[0_35px_80px_rgba(0,0,0,0.38),0_12px_24px_rgba(0,0,0,0.16),inset_-45px_-55px_90px_rgba(0,0,0,0.92)]">
              <div className="absolute right-[12%] top-[18%] h-[28%] w-[28%] rounded-full bg-black/55 blur-2xl" />
              <div className="absolute bottom-[10%] left-[14%] h-[22%] w-[50%] rounded-full bg-black/60 blur-3xl" />
              <div className="absolute inset-[11%] opacity-30 mix-blend-screen">
                <svg
                  viewBox="0 0 1000 1000"
                  className="h-full w-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <g
                    stroke="rgba(255,255,255,0.44)"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M126 298C167 274 224 250 274 255C321 260 349 283 359 310C367 332 391 336 421 328C451 320 474 298 505 293C545 287 584 299 609 320C639 346 672 355 712 350C752 345 788 332 837 343C880 353 915 378 934 405" />
                    <path d="M184 365C200 341 233 327 269 333C304 339 327 356 337 386C348 418 331 449 300 469C270 489 243 514 236 548C228 587 249 612 285 625" />
                    <path d="M425 372C448 357 483 351 514 358C544 365 572 382 587 404C601 425 626 432 656 427C691 421 724 406 757 411C793 417 821 441 836 476C849 508 846 542 831 574C816 606 795 623 788 647" />
                    <path d="M517 425C498 445 491 472 499 497C507 522 529 539 554 545C577 551 590 566 592 590C595 618 586 646 572 672C557 700 549 726 561 748" />
                    <path d="M696 646C723 632 757 632 785 646C811 659 825 683 827 711C829 740 815 760 789 773C761 786 727 790 699 778C670 766 652 742 650 715C648 690 662 665 696 646Z" />
                    <path d="M335 575C367 562 403 565 428 582C452 598 464 623 461 651C457 684 437 706 407 721C379 735 357 754 352 782C347 808 353 828 370 851" />
                    <path d="M476 278C493 258 523 244 554 244C585 244 614 256 629 276" />
                    <path d="M590 310C610 292 640 281 671 282C706 283 736 297 756 321" />
                  </g>
                </svg>
              </div>

              <div className="relative z-10 flex h-full items-center justify-center px-10 sm:px-14 lg:px-16 text-center">
                <p
                  ref={subtitleRef}
                  className="font-general-sans text-lg leading-[1.2] text-white sm:text-2xl lg:text-[2.15rem] lg:leading-[1.18]"
                >
                  Desenvolvimento sob medida e planos estrategicos para escalar
                  sua operacao com tecnologia de ponta.
                </p>
              </div>
            </div>
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
