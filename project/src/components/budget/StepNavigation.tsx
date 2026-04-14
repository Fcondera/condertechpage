/**
 * Componente de navegação entre etapas
 */

interface StepNavigationProps {
  onNext: () => void;
  onPrevious?: () => void;
  canProceed?: boolean;
  nextLabel?: string;
  showPrevious?: boolean;
}

export function StepNavigation({
  onNext,
  onPrevious,
  canProceed = true,
  nextLabel = "Próximo",
  showPrevious = true,
}: StepNavigationProps) {
  return (
    <div className="flex justify-between items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
      {showPrevious && onPrevious ? (
        <button
          onClick={onPrevious}
          className="px-6 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          ← Voltar
        </button>
      ) : (
        <div />
      )}

      <button
        onClick={onNext}
        disabled={!canProceed}
        className={`
          px-8 py-3 rounded-lg font-medium transition-all
          ${
            canProceed
              ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
              : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
          }
        `}
      >
        {nextLabel} →
      </button>
    </div>
  );
}
