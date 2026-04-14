/**
 * Etapa 2: Questões sobre design
 */

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
  const canProceed = hasLogo !== null && premiumDesign !== null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Sobre o design do projeto
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Responda as perguntas abaixo
        </p>
      </div>

      {/* Pergunta 1: Tem logo? */}
      <div className="mb-8">
        <h3 className="text-base sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
          Sua empresa já possui logotipo?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <OptionCard
            title="Sim, já tenho"
            description="Usaremos seu logo existente"
            selected={hasLogo === true}
            onClick={() => onSelectLogo(true)}
          />
          <OptionCard
            title="Não, preciso criar"
            description="Criaremos um logo profissional (+R$ 500)"
            selected={hasLogo === false}
            onClick={() => onSelectLogo(false)}
          />
        </div>
      </div>

      {/* Pergunta 2: Design premium? */}
      <div className="mb-8">
        <h3 className="text-base sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
          Deseja um design premium diferenciado?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <OptionCard
            title="Design Padrão"
            description="Design profissional e clean"
            selected={premiumDesign === false}
            onClick={() => onSelectPremium(false)}
          />
          <OptionCard
            title="Design Premium"
            description="Design exclusivo e diferenciado (+R$ 2.000)"
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
