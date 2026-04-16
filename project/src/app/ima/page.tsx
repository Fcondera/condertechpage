"use client";

import { Anton, Inter } from "next/font/google";
import LeadForm from "@components/ima/LeadForm";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });
const inter = Inter({ subsets: ["latin"], display: "swap" });

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

const checks = [
  "Validação de ideia sem queima de caixa",
  "Stack ideal para escalabilidade",
  "Cronograma de desenvolvimento acelerado",
];

export default function ImaPage() {
  return (
    <main
      className={`${inter.className} min-h-screen bg-white text-neutral-900`}
    >
      {/* Header */}
      <header className="flex items-center px-6 py-5 sm:px-10">
        <span
          className={`${anton.className} text-xl tracking-wide uppercase text-neutral-900`}
        >
          CONDERTECH
        </span>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pb-10 pt-12 text-center sm:pt-20">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className={`${anton.className} text-[2.2rem] uppercase leading-[1.05] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl`}
        >
          Transforme sua ideia em um{" "}
          <span className="text-[#FF0000]">MVP de alta performance</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg"
        >
          Do papel ao código funcional em tempo recorde. Construímos a
          tecnologia que atrai clientes e escala o seu negócio.
        </motion.p>
      </section>

      {/* Card do Material + Formulário */}
      <section className="mx-auto max-w-xl px-6 pb-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] sm:p-10"
        >
          <h2
            className={`${anton.className} mb-6 text-center text-xl uppercase tracking-tight sm:text-2xl`}
          >
            Baixe o guia: do papel ao MVP
          </h2>

          <ul className="mb-8 space-y-3">
            {checks.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-50">
                  <Check className="h-3.5 w-3.5 text-[#FF0000]" />
                </span>
                <span className="text-sm text-neutral-700 sm:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <LeadForm antonClass={anton.className} />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-100 py-6 text-center">
        <p className="text-xs text-neutral-400 sm:text-sm">
          Condertech — Sistemas personalizados para empresas do futuro.
        </p>
      </footer>
    </main>
  );
}
