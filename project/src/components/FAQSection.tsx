import { useState } from "react";
import { useGsapReveal } from "@hooks/useGsapReveal";
import { useLanguage } from "@/contexts/LanguageContext";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({
    stagger: true,
    delay: 0.1,
  });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={titleRef} className="mb-14 pb-10">
          <p className="mb-4 font-inter text-xs font-semibold uppercase tracking-[0.3em] text-[#e22d2e]">
            {t.faq.eyebrow}
          </p>
          <h2 className="max-w-[22ch] font-inter text-3xl font-medium leading-tight text-[#383E42] sm:text-4xl lg:text-5xl">
            {t.faq.headline1}{" "}
            <span className="italic text-[#e22d2e]">{t.faq.accent}</span>
          </h2>
        </div>

        {/* FAQ list */}
        <div ref={contentRef} className="">
          {t.faq.items.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-10">
          <p className="mb-5 font-inter text-sm text-slate-600">
            {t.faq.not_found}
          </p>
          <a
            href="/#contato"
            className="inline-flex items-center gap-2 bg-[#090909] rounded-full px-8 py-4 font-inter text-sm font-semibold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-[#e22d2e]"
          >
            {t.faq.cta}
          </a>
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="py-6">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <h3 className="font-inter text-base font-semibold text-[#383E42] sm:text-lg">
          {item.question}
        </h3>
        <span
          className={`flex-shrink-0 font-inter text-xl font-light text-[#e22d2e] transition-transform duration-200 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <div
        id={`faq-answer-${index}`}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 mt-4" : "max-h-0"
        }`}
      >
        <p className="font-inter text-sm leading-7 text-slate-600 sm:text-base">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

export default FAQSection;
