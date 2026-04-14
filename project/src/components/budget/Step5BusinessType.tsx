/**
 * Etapa 5: Tipo de empresa/segmento
 */

import { StepNavigation } from "./StepNavigation";

interface Step5BusinessTypeProps {
  businessType: string;
  onChangeBusinessType: (type: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

// Segmentos de negócio disponíveis
const businessSegments = [
  "Tecnologia",
  "Saúde e Bem-estar",
  "Educação",
  "E-commerce / Varejo",
  "Alimentação / Restaurantes",
  "Serviços Profissionais",
  "Construção / Engenharia",
  "Moda / Beleza",
  "Turismo / Hotelaria",
  "Finanças / Consultoria",
  "Indústria",
  "Agronegócio",
  "Entretenimento",
  "Imobiliário",
  "Automotivo",
  "ONGs / Instituições",
  "Outro",
];

export function Step5BusinessType({
  businessType,
  onChangeBusinessType,
  onNext,
  onPrevious,
}: Step5BusinessTypeProps) {
  const canProceed = businessType.trim().length > 0;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Qual o segmento da sua empresa?
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Isso nos ajuda a personalizar melhor sua proposta
        </p>
      </div>

      <div className="space-y-4">
        {/* Dropdown de segmentos */}
        <div>
          <label
            htmlFor="business-type"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Selecione o segmento
          </label>
          <select
            id="business-type"
            value={businessType}
            onChange={(e) => onChangeBusinessType(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
          >
            <option value="">Selecione uma opção...</option>
            {businessSegments.map((segment) => (
              <option key={segment} value={segment}>
                {segment}
              </option>
            ))}
          </select>
        </div>

        {/* Informação visual sobre o segmento selecionado */}
        {businessType && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3">
              <div>
                <p className="font-semibold text-green-800 dark:text-green-300">
                  Segmento selecionado
                </p>
                <p className="text-sm text-green-700 dark:text-green-400">
                  {businessType}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <StepNavigation
        onNext={onNext}
        onPrevious={onPrevious}
        canProceed={canProceed}
      />
    </div>
  );
}
