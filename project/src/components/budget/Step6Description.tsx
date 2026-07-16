/**
 * Etapa 6: Descrição do projeto
 */

import { useLanguage } from "../../contexts/LanguageContext";
import { StepNavigation } from "./StepNavigation";

interface Step6DescriptionProps {
  description: string;
  onChangeDescription: (description: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function Step6Description({
  description,
  onChangeDescription,
  onNext,
  onPrevious,
}: Step6DescriptionProps) {
  const { t } = useLanguage();
  const minLength = 10;
  const maxLength = 1000;
  const currentLength = description.length;
  const canProceed = currentLength >= minLength;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {t.budget.step6.heading}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t.budget.step6.subtext}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t.budget.step6.label}
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => onChangeDescription(e.target.value)}
            placeholder={t.budget.step6.placeholder}
            rows={8}
            maxLength={maxLength}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors resize-none"
          />

          <div className="flex justify-between items-center mt-2 text-sm">
            <span
              className={`
              ${
                currentLength < minLength
                  ? "text-red-600 dark:text-red-400"
                  : "text-green-600 dark:text-green-400"
              }
            `}
            >
              {currentLength < minLength
                ? t.budget.step6.minChars(minLength, minLength - currentLength)
                : t.budget.step6.validDescription}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {currentLength} / {maxLength}
            </span>
          </div>
        </div>

        {/* Dicas */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
            {t.budget.step6.tipsHeading}
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1 list-disc list-inside">
            {t.budget.step6.tips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>

      <StepNavigation
        onNext={onNext}
        onPrevious={onPrevious}
        canProceed={canProceed}
        nextLabel={t.budget.step6.nextLabel}
      />
    </div>
  );
}
