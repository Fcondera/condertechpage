/**
 * Etapa 6: Descrição do projeto
 */

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
  const minLength = 10;
  const maxLength = 1000;
  const currentLength = description.length;
  const canProceed = currentLength >= minLength;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Descreva seu projeto
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Conte-nos mais sobre sua visão e objetivos
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Descrição do projeto
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => onChangeDescription(e.target.value)}
            placeholder="Ex: Preciso de um site institucional para minha empresa de consultoria. O objetivo é apresentar nossos serviços, publicar cases de sucesso e captar novos clientes..."
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
                ? `Mínimo ${minLength} caracteres (faltam ${minLength - currentLength})`
                : "Descrição válida"}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {currentLength} / {maxLength}
            </span>
          </div>
        </div>

        {/* Dicas */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
            Dicas para uma boa descrição:
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1 list-disc list-inside">
            <li>Qual é o objetivo principal do projeto?</li>
            <li>Quem é seu público-alvo?</li>
            <li>Tem alguma referência ou inspiração?</li>
            <li>Há algum prazo específico?</li>
            <li>Alguma funcionalidade específica não listada?</li>
          </ul>
        </div>
      </div>

      <StepNavigation
        onNext={onNext}
        onPrevious={onPrevious}
        canProceed={canProceed}
        nextLabel="Ver Orçamento"
      />
    </div>
  );
}
