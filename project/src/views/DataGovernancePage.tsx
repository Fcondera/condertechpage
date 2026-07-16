"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const DataGovernancePage = () => {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white px-4 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-28">
      <div className="mx-auto max-w-4xl">
        <p className="font-switzer text-xs font-semibold uppercase tracking-[0.3em] text-[#8d6a44]">
          {t.governance.eyebrow}
        </p>
        <h1 className="mt-4 font-cabinet text-3xl font-bold tracking-[-0.03em] text-gray-900 sm:text-5xl">
          {t.governance.heading}
        </h1>
        <div className="mt-10 space-y-6 text-sm leading-7 text-gray-700 sm:text-base sm:leading-8">
          {t.governance.paragraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>
    </main>
  );
};

export default DataGovernancePage;
