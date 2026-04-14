/**
 * Hook para gerenciar o estado do formulário de orçamento
 */

import { useState } from "react";
import { BudgetFormData, Features } from "../types/budget";

// Estado inicial do formulário
const initialFormData: BudgetFormData = {
  projectType: null,
  hasLogo: null,
  premiumDesign: null,
  numberOfPages: 1,
  needsSEO: null,
  features: {
    whatsapp: false,
    blog: false,
    membersArea: false,
    onlinePayment: false,
  },
  businessType: "",
  projectDescription: "",
  clientName: "",
  clientType: "pf",
};

export function useBudgetForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BudgetFormData>(initialFormData);

  // Total de etapas
  const totalSteps = 7; // 6 etapas + 1 resultado

  // Atualiza dados do formulário
  const updateFormData = (updates: Partial<BudgetFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  // Atualiza funcionalidades
  const updateFeatures = (feature: keyof Features, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: value,
      },
    }));
  };

  // Navega para próxima etapa
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Volta para etapa anterior
  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Vai para uma etapa específica
  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Reinicia o formulário
  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
  };

  // Calcula progresso em porcentagem
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return {
    currentStep,
    totalSteps,
    formData,
    progress,
    updateFormData,
    updateFeatures,
    nextStep,
    previousStep,
    goToStep,
    resetForm,
  };
}
