import { SITE_URL } from "@/config/site";

export interface BlogTranslationLink {
  language: string;
  slug: string;
}

export interface BlogAlternates {
  canonical: string;
  languages: Record<string, string>;
}

const LANGUAGE_CODE_PATTERN = /^[A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/;

export function isLanguageCode(value: string): boolean {
  if (!LANGUAGE_CODE_PATTERN.test(value)) return false;

  try {
    Intl.getCanonicalLocales(value);
    return true;
  } catch {
    return false;
  }
}

export function normalizeLanguageCode(value: string): string | null {
  if (!isLanguageCode(value)) return null;
  return Intl.getCanonicalLocales(value)[0] ?? null;
}

function encodeSegment(value: string): string {
  return encodeURIComponent(value.trim());
}

export function blogPath(language: string, slug: string): string {
  const normalizedLanguage = normalizeLanguageCode(language);
  if (!normalizedLanguage || !slug.trim()) {
    throw new Error("A valid language and slug are required for a blog URL.");
  }
  return `/blog/${normalizedLanguage}/${encodeSegment(slug)}`;
}

export function authorPath(slug: string): string {
  if (!slug.trim()) throw new Error("An author slug is required.");
  return `/authors/${encodeSegment(slug)}`;
}

export function absoluteUrl(path: string): string {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function buildBlogAlternates(
  translations: BlogTranslationLink[],
  current: BlogTranslationLink,
): BlogAlternates {
  const languages: Record<string, string> = {};

  for (const translation of translations) {
    const language = normalizeLanguageCode(translation.language);
    if (!language || !translation.slug.trim()) continue;
    languages[language] = absoluteUrl(blogPath(language, translation.slug));
  }

  if (languages.en) languages["x-default"] = languages.en;

  return {
    canonical: absoluteUrl(blogPath(current.language, current.slug)),
    languages,
  };
}
