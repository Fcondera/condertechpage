/**
 * Componente de barra de progresso
 */

import { useLanguage } from "../../contexts/LanguageContext";

interface ProgressBarProps {
  progress: number;
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({
  progress,
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  const { t } = useLanguage();

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t.budget.progress.step} {currentStep} {t.budget.progress.of}{" "}
          {totalSteps - 1}
        </span>
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
