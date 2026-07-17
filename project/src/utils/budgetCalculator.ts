/**
 * Utilitário para cálculo de orçamento
 */

import { BudgetFormData, BudgetResult } from "../types/budget";
import type { Translations } from "../contexts/LanguageContext";
import {
  PROJECT_PRICES,
  DESIGN_COSTS,
  COST_PER_PAGE,
  FREE_PAGES,
  SEO_COST,
  FEATURE_COSTS,
  FEATURE_DAYS,
} from "../config/pricing";

type BudgetTranslations = Translations["budget"];

/**
 * Calcula o orçamento baseado nos dados do formulário
 * @param formData - Dados preenchidos pelo usuário
 * @param t - Traduções do simulador de orçamento
 * @returns Resultado com preço mínimo, máximo, prazo e itens inclusos
 */
export function calculatePrice(
  formData: BudgetFormData,
  t: BudgetTranslations,
): BudgetResult {
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
  const includedItems: string[] = [
    t.included.projectDescriptions[formData.projectType],
  ];

  // Adiciona custo de logo se não tiver
  if (formData.hasLogo === false) {
    minPrice += DESIGN_COSTS.noLogo;
    maxPrice += DESIGN_COSTS.noLogo;
    includedItems.push(t.included.logoCreation);
  }

  // Adiciona custo de design premium
  if (formData.premiumDesign === true) {
    minPrice += DESIGN_COSTS.premiumDesign;
    maxPrice += DESIGN_COSTS.premiumDesign;
    includedItems.push(t.included.premiumDesign);
  }

  // Adiciona custo por páginas extras
  if (formData.numberOfPages > FREE_PAGES) {
    const extraPages = formData.numberOfPages - FREE_PAGES;
    const pageCost = extraPages * COST_PER_PAGE;
    minPrice += pageCost;
    maxPrice += pageCost;
    includedItems.push(t.included.customPages(formData.numberOfPages));
  } else if (formData.numberOfPages > 0) {
    includedItems.push(t.included.includedPages(formData.numberOfPages));
  }

  // Adiciona custo de SEO
  if (formData.needsSEO === true) {
    minPrice += SEO_COST;
    maxPrice += SEO_COST;
    estimatedDays += 5;
    includedItems.push(t.included.seo);
  }

  // Adiciona custos de funcionalidades
  if (formData.features.whatsapp) {
    minPrice += FEATURE_COSTS.whatsapp;
    maxPrice += FEATURE_COSTS.whatsapp;
    estimatedDays += FEATURE_DAYS.whatsapp;
    includedItems.push(t.included.whatsappIntegration);
  }

  if (formData.features.blog) {
    minPrice += FEATURE_COSTS.blog;
    maxPrice += FEATURE_COSTS.blog;
    estimatedDays += FEATURE_DAYS.blog;
    includedItems.push(t.included.blogSystem);
  }

  if (formData.features.membersArea) {
    minPrice += FEATURE_COSTS.membersArea;
    maxPrice += FEATURE_COSTS.membersArea;
    estimatedDays += FEATURE_DAYS.membersArea;
    includedItems.push(t.included.membersArea);
  }

  if (formData.features.onlinePayment) {
    minPrice += FEATURE_COSTS.onlinePayment;
    maxPrice += FEATURE_COSTS.onlinePayment;
    estimatedDays += FEATURE_DAYS.onlinePayment;
    includedItems.push(t.included.onlinePayment);
  }

  // Adiciona itens padrão inclusos
  includedItems.push(
    t.included.hosting,
    t.included.support,
    t.included.ssl,
    t.included.responsive,
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
export function formatBudgetWhatsApp(
  result: BudgetResult,
  t: BudgetTranslations,
): string {
  const { formData, minPrice, maxPrice, estimatedDays } = result;
  const w = t.whatsapp;

  const clientLabel = formData.clientType === "pj" ? w.companyLabel : w.nameLabel;
  const projectLabel = formData.projectType
    ? t.step1.types[formData.projectType].title
    : "-";

  const lines = [
    w.greeting,
    ``,
    `*${clientLabel}:* ${formData.clientName}`,
    `*${w.projectTypeLabel}:* ${projectLabel}`,
    `*${w.pagesLabel}:* ${formData.numberOfPages}`,
    `*${w.hasLogoLabel}:* ${formData.hasLogo ? w.yes : w.no}`,
    `*${w.premiumLabel}:* ${formData.premiumDesign ? w.yes : w.no}`,
    `*${w.seoLabel}:* ${formData.needsSEO ? w.yes : w.no}`,
    ``,
    `*${w.featuresLabel}:*`,
    formData.features.whatsapp ? `  - ${w.featureWhatsapp}` : null,
    formData.features.blog ? `  - ${w.featureBlog}` : null,
    formData.features.membersArea ? `  - ${w.featureMembersArea}` : null,
    formData.features.onlinePayment ? `  - ${w.featureOnlinePayment}` : null,
    !formData.features.whatsapp &&
    !formData.features.blog &&
    !formData.features.membersArea &&
    !formData.features.onlinePayment
      ? `  - ${w.noExtraFeatures}`
      : null,
    ``,
    formData.projectDescription
      ? `*${w.descriptionLabel}:* ${formData.projectDescription}`
      : null,
    ``,
    `*${w.investmentLabel}:* ${formatCurrency(minPrice)} – ${formatCurrency(maxPrice)}`,
    `*${w.deadlineLabel}:* ${estimatedDays} ${w.daysUnit}`,
  ];

  return encodeURIComponent(lines.filter((l) => l !== null).join("\n"));
}
