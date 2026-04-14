/**
 * Etapa 1: Seleção do tipo de projeto
 */

import { ProjectType } from "../../types/budget";
import { OptionCard } from "./OptionCard";
import { StepNavigation } from "./StepNavigation";

interface Step1ProjectTypeProps {
  selectedType: ProjectType | null;
  onSelect: (type: ProjectType) => void;
  onNext: () => void;
}

// Opções de tipos de projeto
const projectTypes = [
  {
    id: "institutional" as ProjectType,
    title: "Site Institucional",
    description: "Site profissional para apresentar sua empresa e serviços",
  },
  {
    id: "landing-page" as ProjectType,
    title: "Landing Page",
    description: "Página focada em conversão para produtos ou serviços",
  },
  {
    id: "ecommerce" as ProjectType,
    title: "Loja Virtual",
    description: "E-commerce completo para vender online",
  },
  {
    id: "custom-system" as ProjectType,
    title: "Sistema Personalizado",
    description: "Sistema web customizado para sua necessidade",
  },
  {
    id: "mobile-app" as ProjectType,
    title: "Aplicativo Mobile",
    description: "App nativo para iOS e Android",
  },
];

export function Step1ProjectType({
  selectedType,
  onSelect,
  onNext,
}: Step1ProjectTypeProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Qual tipo de projeto você precisa?
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Selecione a opção que melhor descreve seu projeto
        </p>
      </div>

      <div className="space-y-4">
        {projectTypes.map((type) => (
          <OptionCard
            key={type.id}
            title={type.title}
            description={type.description}
            selected={selectedType === type.id}
            onClick={() => onSelect(type.id)}
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
