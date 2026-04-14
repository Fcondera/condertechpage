/**
 * Tipos para o Simulador de Orçamento Condertech
 */

// Tipo de projeto selecionado
export type ProjectType =
  | "institutional"
  | "landing-page"
  | "ecommerce"
  | "custom-system"
  | "mobile-app";

// Opções de funcionalidades extras
export interface Features {
  whatsapp: boolean;
  blog: boolean;
  membersArea: boolean;
  onlinePayment: boolean;
}

// Dados coletados do formulário
export interface BudgetFormData {
  projectType: ProjectType | null;
  hasLogo: boolean | null;
  premiumDesign: boolean | null;
  numberOfPages: number;
  needsSEO: boolean | null;
  features: Features;
  businessType: string;
  projectDescription: string;
  clientName: string;
  clientType: "pf" | "pj";
}

// Resultado do orçamento
export interface BudgetResult {
  minPrice: number;
  maxPrice: number;
  estimatedDays: number;
  includedItems: string[];
  formData: BudgetFormData;
}

// Configuração de preços
export interface PriceConfig {
  basePrice: number;
  maxPrice: number;
  estimatedDays: number;
  description: string;
}
