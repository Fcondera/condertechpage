/**
 * Etapa 3: Informações sobre conteúdo
 */

import { OptionCard } from "./OptionCard";
import { StepNavigation } from "./StepNavigation";

interface Step3ContentProps {
  numberOfPages: number;
  needsSEO: boolean | null;
  onChangePages: (pages: number) => void;
  onSelectSEO: (needsSEO: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function Step3Content({
  numberOfPages,
  needsSEO,
  onChangePages,
  onSelectSEO,
  onNext,
  onPrevious,
}: Step3ContentProps) {
  const canProceed = numberOfPages > 0 && needsSEO !== null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Conteúdo e estrutura
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Defina a quantidade de páginas e recursos de SEO
        </p>
      </div>

      {/* Pergunta 1: Número de páginas */}
      <div className="mb-8">
        <h3 className="text-base sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
          Quantas páginas seu site terá?
        </h3>
        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => onChangePages(Math.max(1, numberOfPages - 1))}
              className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold text-xl transition-colors"
            >
              -
            </button>

            <div className="flex-1 text-center">
              <div className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {numberOfPages}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {numberOfPages === 1 ? "página" : "páginas"}
              </div>
            </div>

            <button
              onClick={() => onChangePages(numberOfPages + 1)}
              className="w-12 h-12 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl transition-colors"
            >
              +
            </button>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
            {numberOfPages <= 3
              ? "Incluído no preço base"
              : `Páginas extras: +R$ ${(numberOfPages - 3) * 300}`}
          </div>
        </div>
      </div>

      {/* Pergunta 2: SEO */}
      <div className="mb-8">
        <h3 className="text-base sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
          Precisa de otimização SEO inicial?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <OptionCard
            title="Não precisa"
            description="Podemos fazer depois se necessário"
            selected={needsSEO === false}
            onClick={() => onSelectSEO(false)}
          />
          <OptionCard
            title="Sim, preciso de SEO"
            description="Otimização completa para buscadores (+R$ 1.500)"
            selected={needsSEO === true}
            onClick={() => onSelectSEO(true)}
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
