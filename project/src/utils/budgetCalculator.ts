/**
 * Utilitário para cálculo de orçamento
 */

import { BudgetFormData, BudgetResult } from "../types/budget";
import {
  PROJECT_PRICES,
  DESIGN_COSTS,
  COST_PER_PAGE,
  FREE_PAGES,
  SEO_COST,
  FEATURE_COSTS,
  FEATURE_DAYS,
} from "../config/pricing";

/**
 * Calcula o orçamento baseado nos dados do formulário
 * @param formData - Dados preenchidos pelo usuário
 * @returns Resultado com preço mínimo, máximo, prazo e itens inclusos
 */
export function calculatePrice(formData: BudgetFormData): BudgetResult {
  // Se não tiver tipo de projeto, retorna valores zerados
  if (!formData.projectType) {
    return {
      minPrice: 0,
      maxPrice: 0,
      estimatedDays: 0,
      includedItems: [],
      formData,
    };
  }

  // Pega o preço base do tipo de projeto
  const projectConfig = PROJECT_PRICES[formData.projectType];
  let minPrice = projectConfig.basePrice;
  let maxPrice = projectConfig.maxPrice;
  let estimatedDays = projectConfig.estimatedDays;
  const includedItems: string[] = [projectConfig.description];

  // Adiciona custo de logo se não tiver
  if (formData.hasLogo === false) {
    minPrice += DESIGN_COSTS.noLogo;
    maxPrice += DESIGN_COSTS.noLogo;
    includedItems.push("Criação de logotipo profissional");
  }

  // Adiciona custo de design premium
  if (formData.premiumDesign === true) {
    minPrice += DESIGN_COSTS.premiumDesign;
    maxPrice += DESIGN_COSTS.premiumDesign;
    includedItems.push("Design premium diferenciado");
  }

  // Adiciona custo por páginas extras
  if (formData.numberOfPages > FREE_PAGES) {
    const extraPages = formData.numberOfPages - FREE_PAGES;
    const pageCost = extraPages * COST_PER_PAGE;
    minPrice += pageCost;
    maxPrice += pageCost;
    includedItems.push(`${formData.numberOfPages} páginas customizadas`);
  } else if (formData.numberOfPages > 0) {
    includedItems.push(`${formData.numberOfPages} páginas incluídas`);
  }

  // Adiciona custo de SEO
  if (formData.needsSEO === true) {
    minPrice += SEO_COST;
    maxPrice += SEO_COST;
    estimatedDays += 5;
    includedItems.push("Otimização SEO inicial completa");
  }

  // Adiciona custos de funcionalidades
  if (formData.features.whatsapp) {
    minPrice += FEATURE_COSTS.whatsapp;
    maxPrice += FEATURE_COSTS.whatsapp;
    estimatedDays += FEATURE_DAYS.whatsapp;
    includedItems.push("Integração com WhatsApp Business");
  }

  if (formData.features.blog) {
    minPrice += FEATURE_COSTS.blog;
    maxPrice += FEATURE_COSTS.blog;
    estimatedDays += FEATURE_DAYS.blog;
    includedItems.push("Sistema de blog completo");
  }

  if (formData.features.membersArea) {
    minPrice += FEATURE_COSTS.membersArea;
    maxPrice += FEATURE_COSTS.membersArea;
    estimatedDays += FEATURE_DAYS.membersArea;
    includedItems.push("Área de membros com login");
  }

  if (formData.features.onlinePayment) {
    minPrice += FEATURE_COSTS.onlinePayment;
    maxPrice += FEATURE_COSTS.onlinePayment;
    estimatedDays += FEATURE_DAYS.onlinePayment;
    includedItems.push("Integração com pagamento online");
  }

  // Adiciona itens padrão inclusos
  includedItems.push(
    "Hospedagem por 12 meses",
    "Suporte técnico por 3 meses",
    "Certificado SSL grátis",
    "Design responsivo",
  );

  return {
    minPrice,
    maxPrice,
    estimatedDays,
    includedItems,
    formData,
  };
}

/**
 * Formata valor em reais
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/**
 * Monta mensagem de orçamento formatada para WhatsApp
 */
export function formatBudgetWhatsApp(result: BudgetResult): string {
  const { formData, minPrice, maxPrice, estimatedDays } = result;

  const clientLabel = formData.clientType === "pj" ? "Empresa" : "Nome";

  const projectLabels: Record<string, string> = {
    institutional: "Site Institucional",
    "landing-page": "Landing Page",
    ecommerce: "E-commerce",
    "custom-system": "Sistema Personalizado",
    "mobile-app": "Aplicativo Mobile",
  };

  const lines = [
    `Olá! Gostaria de solicitar um orçamento.`,
    ``,
    `*${clientLabel}:* ${formData.clientName}`,
    `*Tipo de projeto:* ${projectLabels[formData.projectType ?? ""] ?? "-"}`,
    `*Páginas:* ${formData.numberOfPages}`,
    `*Possui logo:* ${formData.hasLogo ? "Sim" : "Não"}`,
    `*Design premium:* ${formData.premiumDesign ? "Sim" : "Não"}`,
    `*SEO:* ${formData.needsSEO ? "Sim" : "Não"}`,
    ``,
    `*Funcionalidades:*`,
    formData.features.whatsapp ? `  - WhatsApp Business` : null,
    formData.features.blog ? `  - Blog` : null,
    formData.features.membersArea ? `  - Área de membros` : null,
    formData.features.onlinePayment ? `  - Pagamento online` : null,
    !formData.features.whatsapp &&
    !formData.features.blog &&
    !formData.features.membersArea &&
    !formData.features.onlinePayment
      ? `  - Nenhuma funcionalidade extra`
      : null,
    ``,
    formData.projectDescription
      ? `*Descrição:* ${formData.projectDescription}`
      : null,
    ``,
    `*Investimento estimado:* ${formatCurrency(minPrice)} – ${formatCurrency(maxPrice)}`,
    `*Prazo estimado:* ${estimatedDays} dias úteis`,
  ];

  return encodeURIComponent(lines.filter((l) => l !== null).join("\n"));
}
