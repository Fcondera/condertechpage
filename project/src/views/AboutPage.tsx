"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white pt-16 sm:pt-20">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-8 sm:py-20">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="font-cabinet text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
            {t.about.heading1}
            <span className="text-spotify-green">{t.about.accent}</span>
          </h1>

          <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl">
              {t.about.intro}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 my-8 sm:my-12">
              {t.about.cards.map((card, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-6 md:p-8 bg-gray-50 rounded-lg border border-gray-200 h-full flex flex-col justify-between"
                >
                  <h3 className="text-lg sm:text-2xl font-bold text-spotify-green mb-3 sm:mb-4">
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-base">{card.description}</p>
                </div>
              ))}
            </div>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl">
              {t.about.body1}
            </p>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl">
              {t.about.body2}
            </p>

            <div className="border-t border-b border-gray-200 py-8 sm:py-12 my-8 sm:my-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                {t.about.whyHeading}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {t.about.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 sm:gap-4">
                    <span className="text-spotify-green font-bold text-xl sm:text-2xl flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-xs sm:text-sm md:text-base lg:text-lg">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-spotify-green to-spotify-light-green p-4 sm:p-6 md:p-8 rounded-lg text-white">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                {t.about.ctaHeading}
              </h2>
              <p className="mb-4 sm:mb-6 text-xs sm:text-sm md:text-base">
                {t.about.ctaBody}
              </p>
              <a
                href="#contato"
                className="inline-block w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-white text-spotify-green font-semibold text-xs sm:text-sm md:text-base rounded-lg hover:bg-gray-100 transition-colors text-center"
              >
                {t.about.ctaButton}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
