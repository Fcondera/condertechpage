import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GsapRevealOptions {
  /** Anima filhos em stagger em vez do próprio elemento */
  stagger?: boolean;
  /** Delay antes de iniciar (segundos) */
  delay?: number;
  /** Distância vertical de origem (px) */
  y?: number;
  /** Duração da animação (segundos) */
  duration?: number;
  /** Intervalo entre elementos em stagger (segundos) */
  staggerAmount?: number;
  /** Ponto de início do ScrollTrigger de entrada */
  start?: string;
}

/**
 * Hook que aplica animação de entrada com GSAP + ScrollTrigger.
 * Entrada: sobe de baixo ao entrar na viewport.
 */
export function useGsapReveal<T extends HTMLElement = HTMLElement>(
  options: GsapRevealOptions = {},
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      stagger = false,
      delay = 0,
      y = 50,
      duration = 0.8,
      staggerAmount = 0.12,
      start = "top 88%",
    } = options;

    const targets = stagger ? Array.from(el.children) : [el];

    // --- Entrada ---
    gsap.fromTo(
      targets,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        stagger: stagger ? staggerAmount : 0,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
