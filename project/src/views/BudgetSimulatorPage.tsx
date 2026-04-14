"use client";

/**
 * Página principal do Simulador de Orçamento Condertech
 */

import { useEffect } from "react";
import { useBudgetForm } from "../hooks/useBudgetForm";
import { calculatePrice } from "../utils/budgetCalculator";
import { ThemeToggle } from "../components/budget/ThemeToggle";
import { ProgressBar } from "../components/budget/ProgressBar";
import { Step1ProjectType } from "../components/budget/Step1ProjectType";
import { Step2Design } from "../components/budget/Step2Design";
import { Step3Content } from "../components/budget/Step3Content";
import { Step4Features } from "../components/budget/Step4Features";
import { Step5BusinessType } from "../components/budget/Step5BusinessType";
import { Step6Description } from "../components/budget/Step6Description";
import { Step7Result } from "../components/budget/Step7Result";
import { ProjectType, Features } from "../types/budget";

export default function BudgetSimulatorPage() {
  // Força tema claro enquanto a página estiver aberta
  useEffect(() => {
    const root = document.documentElement;
    const hadDark = root.classList.contains("dark");
    root.classList.remove("dark");
    return () => {
      if (hadDark) root.classList.add("dark");
    };
  }, []);

  const {
    currentStep,
    totalSteps,
    formData,
    progress,
    updateFormData,
    updateFeatures,
    nextStep,
    previousStep,
    resetForm,
  } = useBudgetForm();

  // Calcula o resultado do orçamento
  const budgetResult = calculatePrice(formData);

  // Renderiza a etapa atual
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1ProjectType
            selectedType={formData.projectType}
            onSelect={(type: ProjectType) =>
              updateFormData({ projectType: type })
            }
            onNext={nextStep}
          />
        );

      case 2:
        return (
          <Step2Design
            hasLogo={formData.hasLogo}
            premiumDesign={formData.premiumDesign}
            onSelectLogo={(hasLogo: boolean) => updateFormData({ hasLogo })}
            onSelectPremium={(premium: boolean) =>
              updateFormData({ premiumDesign: premium })
            }
            onNext={nextStep}
            onPrevious={previousStep}
          />
        );

      case 3:
        return (
          <Step3Content
            numberOfPages={formData.numberOfPages}
            needsSEO={formData.needsSEO}
            onChangePages={(pages: number) =>
              updateFormData({ numberOfPages: pages })
            }
            onSelectSEO={(needsSEO: boolean) => updateFormData({ needsSEO })}
            onNext={nextStep}
            onPrevious={previousStep}
          />
        );

      case 4:
        return (
          <Step4Features
            features={formData.features}
            onToggleFeature={(feature: keyof Features) =>
              updateFeatures(feature, !formData.features[feature])
            }
            onNext={nextStep}
            onPrevious={previousStep}
          />
        );

      case 5:
        return (
          <Step5BusinessType
            businessType={formData.businessType}
            onChangeBusinessType={(type: string) =>
              updateFormData({ businessType: type })
            }
            onNext={nextStep}
            onPrevious={previousStep}
          />
        );

      case 6:
        return (
          <Step6Description
            description={formData.projectDescription}
            onChangeDescription={(desc: string) =>
              updateFormData({ projectDescription: desc })
            }
            onNext={nextStep}
            onPrevious={previousStep}
          />
        );

      case 7:
        return (
          <Step7Result
            result={budgetResult}
            onReset={resetForm}
            onUpdateFormData={updateFormData}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-6 sm:py-8 px-3 sm:px-4 transition-colors duration-300">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Simulador de Orçamento
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
              Condertech - Soluções Digitais
            </p>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Container principal */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-10">
          {/* Barra de progresso (não mostrar na última etapa) */}
          {currentStep < totalSteps && (
            <ProgressBar
              progress={progress}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          )}

          {/* Renderiza a etapa atual */}
          <div className="animate-fade-in">{renderStep()}</div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 dark:text-gray-400 text-sm">
          <p>© 2020 Condertech - Todos os direitos reservados</p>
          <p className="mt-1">
            Os valores apresentados são estimativas e podem variar
          </p>
        </div>
      </div>
    </div>
  );
}
