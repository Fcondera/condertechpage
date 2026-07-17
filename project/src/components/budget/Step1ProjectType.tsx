/**
 * Etapa 1: Seleção do tipo de projeto
 */

import { ProjectType } from "../../types/budget";
import { useLanguage } from "../../contexts/LanguageContext";
import { OptionCard } from "./OptionCard";
import { StepNavigation } from "./StepNavigation";

interface Step1ProjectTypeProps {
  selectedType: ProjectType | null;
  onSelect: (type: ProjectType) => void;
  onNext: () => void;
}

const projectTypeIds: ProjectType[] = [
  "institutional",
  "landing-page",
  "ecommerce",
  "custom-system",
  "mobile-app",
];

export function Step1ProjectType({
  selectedType,
  onSelect,
  onNext,
}: Step1ProjectTypeProps) {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {t.budget.step1.heading}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t.budget.step1.subtext}
        </p>
      </div>

      <div className="space-y-4">
        {projectTypeIds.map((id) => (
          <OptionCard
            key={id}
            title={t.budget.step1.types[id].title}
            description={t.budget.step1.types[id].description}
            selected={selectedType === id}
            onClick={() => onSelect(id)}
          />
        ))}
      </div>

      <StepNavigation
        onNext={onNext}
        canProceed={selectedType !== null}
        showPrevious={false}
      />
    </div>
  );
}
