/**
 * Etapa 4: Seleção de funcionalidades extras
 */

import { Features } from "../../types/budget";
import { StepNavigation } from "./StepNavigation";

interface Step4FeaturesProps {
  features: Features;
  onToggleFeature: (feature: keyof Features) => void;
  onNext: () => void;
  onPrevious: () => void;
}

// Lista de funcionalidades disponíveis
const availableFeatures = [
  {
    id: "whatsapp" as keyof Features,
    title: "Integração WhatsApp",
    description: "Botão flutuante com link direto para seu WhatsApp Business",
    price: 200,
  },
  {
    id: "blog" as keyof Features,
    title: "Sistema de Blog",
    description: "Blog completo com gerenciador de posts e categorias",
    price: 1500,
  },
  {
    id: "membersArea" as keyof Features,
    title: "Área de Membros",
    description: "Sistema de login e área restrita para usuários",
    price: 5000,
  },
  {
    id: "onlinePayment" as keyof Features,
    title: "Pagamento Online",
    description: "Integração com gateways de pagamento (Stripe, PayPal, etc)",
    price: 3000,
  },
];

export function Step4Features({
  features,
  onToggleFeature,
  onNext,
  onPrevious,
}: Step4FeaturesProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Funcionalidades extras
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Selecione as funcionalidades que deseja adicionar (opcional)
        </p>
      </div>

      <div className="space-y-4">
        {availableFeatures.map((feature) => {
          const isSelected = features[feature.id];

          return (
            <button
              key={feature.id}
              onClick={() => onToggleFeature(feature.id)}
              className={`
                w-full p-4 sm:p-6 rounded-xl border-2 transition-all duration-200 text-left
                ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400 shadow-lg"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600"
                }
              `}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 sm:gap-4 mb-2">
                    <h3
                      className={`
                      text-base sm:text-lg font-semibold
                      ${isSelected ? "text-blue-700 dark:text-blue-300" : "text-gray-800 dark:text-gray-200"}
                    `}
                    >
                      {feature.title}
                    </h3>

                    <span
                      className={`
                      text-sm font-bold px-3 py-1 rounded-lg whitespace-nowrap
                      ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }
                    `}
                    >
                      +R$ {feature.price}
                    </span>
                  </div>

                  <p
                    className={`
                    text-sm
                    ${isSelected ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}
                  `}
                  >
                    {feature.description}
                  </p>
                </div>

                {/* Checkbox */}
                <div
                  className={`
                  w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0
                  ${
                    isSelected
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300 dark:border-gray-600"
                  }
                `}
                >
                  {isSelected && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>Dica:</strong> Você pode adicionar ou remover funcionalidades
          depois do orçamento inicial
        </p>
      </div>

      <StepNavigation
        onNext={onNext}
        onPrevious={onPrevious}
        canProceed={true}
      />
    </div>
  );
}
