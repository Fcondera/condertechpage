/**
 * Configuração de Preços do Simulador de Orçamento
 *
 * Este arquivo contém todos os valores base e multiplicadores
 * usados no cálculo do orçamento.
 */

import { ProjectType, PriceConfig } from "../types/budget";

// Preços base por tipo de projeto
export const PROJECT_PRICES: Record<ProjectType, PriceConfig> = {
  institutional: {
    basePrice: 1200,
    maxPrice: 3500,
    estimatedDays: 20,
    description: "Site institucional profissional",
  },
  "landing-page": {
    basePrice: 600,
    maxPrice: 1800,
    estimatedDays: 10,
    description: "Landing page de alta conversão",
  },
  ecommerce: {
    basePrice: 3000,
    maxPrice: 9000,
    estimatedDays: 45,
    description: "Loja virtual completa",
  },
  "custom-system": {
    basePrice: 5000,
    maxPrice: 18000,
    estimatedDays: 60,
    description: "Sistema personalizado",
  },
  "mobile-app": {
    basePrice: 8000,
    maxPrice: 28000,
    estimatedDays: 90,
    description: "Aplicativo mobile nativo",
  },
};

// Custos adicionais de design
export const DESIGN_COSTS = {
  noLogo: 200, // Criar logo do zero
  premiumDesign: 800, // Design premium diferenciado
};

// Custo por página adicional (a partir da 3ª página)
export const COST_PER_PAGE = 120;
export const FREE_PAGES = 3; // Primeiras 3 páginas incluídas

// Custo de SEO inicial
export const SEO_COST = 600;

// Custos de funcionalidades extras
export const FEATURE_COSTS = {
  whatsapp: 80,
  blog: 600,
  membersArea: 2000,
  onlinePayment: 1200,
};

// Multiplicador de prazo para funcionalidades (em dias)
export const FEATURE_DAYS = {
  whatsapp: 1,
  blog: 5,
  membersArea: 15,
  onlinePayment: 10,
};
