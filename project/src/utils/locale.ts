import type { Lang } from "@/contexts/LanguageContext";

export const LOCALE_AWARE_PATHS = [
  "/",
  "/sobre",
  "/termos-de-uso",
  "/governanca-de-dados",
  "/orcamento",
] as const;

export const LANG_TO_SEGMENT: Record<Lang, string> = {
  "pt-BR": "",
  en: "en",
  es: "es",
};

const SEGMENT_TO_LANG: Record<string, Lang> = {
  en: "en",
  es: "es",
};

/**
 * Splits a pathname into its locale (defaulting to pt-BR) and the bare path
 * without the locale segment, e.g. "/en/sobre" -> { locale: "en", bare: "/sobre" }.
 */
export function stripLocalePrefix(pathname: string): {
  locale: Lang;
  bare: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  const lang = first ? SEGMENT_TO_LANG[first] : undefined;

  if (!lang) {
    return { locale: "pt-BR", bare: pathname };
  }

  const rest = segments.slice(1).join("/");
  return { locale: lang, bare: rest ? `/${rest}` : "/" };
}

/**
 * Builds the URL for `path` in the given language. Paths outside
 * LOCALE_AWARE_PATHS are returned unchanged (those routes have no
 * translated variant).
 */
export function getLocalizedPath(lang: Lang, path: string): string {
  if (!LOCALE_AWARE_PATHS.includes(path as (typeof LOCALE_AWARE_PATHS)[number])) {
    return path;
  }

  const segment = LANG_TO_SEGMENT[lang];
  if (!segment) return path;

  return path === "/" ? `/${segment}` : `/${segment}${path}`;
}
