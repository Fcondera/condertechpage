/**
 * Etapa 2: Questões sobre design
 */

import { useLanguage } from "../../contexts/LanguageContext";
import { OptionCard } from "./OptionCard";
import { StepNavigation } from "./StepNavigation";

interface Step2DesignProps {
  hasLogo: boolean | null;
  premiumDesign: boolean | null;
  onSelectLogo: (hasLogo: boolean) => void;
  onSelectPremium: (premium: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function Step2Design({
  hasLogo,
  premiumDesign,
  onSelectLogo,
  onSelectPremium,
  onNext,
  onPrevious,
}: Step2DesignProps) {
  const { t } = useLanguage();
  const canProceed = hasLogo !== null && premiumDesign !== null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {t.budget.step2.heading}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t.budget.step2.subtext}
        </p>
      </div>

      {/* Pergunta 1: Tem logo? */}
      <div className="mb-8">
        <h3 className="text-base sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
          {t.budget.step2.logoQuestion}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <OptionCard
            title={t.budget.step2.logoYes.title}
            description={t.budget.step2.logoYes.description}
            selected={hasLogo === true}
            onClick={() => onSelectLogo(true)}
          />
          <OptionCard
            title={t.budget.step2.logoNo.title}
            description={t.budget.step2.logoNo.description}
            selected={hasLogo === false}
            onClick={() => onSelectLogo(false)}
          />
        </div>
      </div>

      {/* Pergunta 2: Design premium? */}
      <div className="mb-8">
        <h3 className="text-base sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
          {t.budget.step2.premiumQuestion}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <OptionCard
            title={t.budget.step2.designStandard.title}
            description={t.budget.step2.designStandard.description}
            selected={premiumDesign === false}
            onClick={() => onSelectPremium(false)}
          />
          <OptionCard
            title={t.budget.step2.designPremium.title}
            description={t.budget.step2.designPremium.description}
            selected={premiumDesign === true}
            onClick={() => onSelectPremium(true)}
          />
        </div>
      </div>

      <StepNavigation
        onNext={onNext}
        onPrevious={onPrevious}
        canProceed={canProceed}
      />
    </div>
  );
}
