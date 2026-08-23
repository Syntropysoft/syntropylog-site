/**
 * Fuente única de los locales soportados.
 *
 * Antes la lista vivía duplicada: en `translationService` y, implícita, en el
 * parseo de `accept-language` de `src/app/page.tsx`. Agregar un idioma tocando
 * uno solo de los dos dejaba el sitio a medias.
 */

export const LOCALES = ['en', 'es'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/** Guard de tipo: ¿este string es un locale que el sitio sirve? */
export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Elige el locale a partir de un header `accept-language`. Pura.
 * Devuelve DEFAULT_LOCALE cuando el header falta, viene vacío o no menciona
 * ninguno de los idiomas soportados — nunca adivina uno que no servimos.
 */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const tags = acceptLanguage
    .split(',')
    .map((tag) => tag.split(';')[0].trim().toLowerCase());

  for (const tag of tags) {
    const match = LOCALES.find((locale) => tag.startsWith(locale));
    if (match) return match;
  }

  return DEFAULT_LOCALE;
}
