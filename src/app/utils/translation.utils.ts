import { Language } from '../models/localized.types';

/**
 * Helper function to get localized content from Sanity CMS fields
 * @param field - The multilingual field object from Sanity
 * @param language - Current language
 * @param fallback - Fallback language (default: 'pl')
 * @returns Localized string or fallback
 */
export function getLocalizedText(
  field: any, 
  language: Language, 
  fallback: Language = 'pl'
): string {
  if (!field || typeof field !== 'object') {
    return field || '';
  }

  // Try current language first
  if (field[language]) {
    return field[language];
  }

  // Try fallback language
  if (field[fallback]) {
    return field[fallback];
  }

  // Try any available language
  const availableLanguages: Language[] = ['pl', 'en', 'it'];
  for (const lang of availableLanguages) {
    if (field[lang]) {
      return field[lang];
    }
  }

  return '';
}

/**
 * Helper function to get localized array content from Sanity CMS fields
 * @param field - The multilingual field object from Sanity (for rich text/blocks)
 * @param language - Current language
 * @param fallback - Fallback language (default: 'pl')
 * @returns Localized array or fallback
 */
export function getLocalizedContent(
  field: any, 
  language: Language, 
  fallback: Language = 'pl'
): any[] {
  if (!field || typeof field !== 'object') {
    return [];
  }

  // Try current language first
  if (field[language] && Array.isArray(field[language])) {
    return field[language];
  }

  // Try fallback language
  if (field[fallback] && Array.isArray(field[fallback])) {
    return field[fallback];
  }

  // Try any available language
  const availableLanguages: Language[] = ['pl', 'en', 'it'];
  for (const lang of availableLanguages) {
    if (field[lang] && Array.isArray(field[lang])) {
      return field[lang];
    }
  }

  return [];
}
