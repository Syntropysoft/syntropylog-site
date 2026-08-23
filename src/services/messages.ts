/**
 * Carga de textos **en el servidor**.
 *
 * Es lo que hace que el copy llegue al HTML servido. El hook `useTranslations`
 * resuelve en el cliente dentro de un `useEffect`, así que lo que pasa por él no
 * existe para un crawler que no ejecuta JS. Las secciones que cargan el mensaje
 * reciben su texto por props desde un Server Component.
 */

import { DEFAULT_LOCALE, isLocale, type Locale } from '@/config/locales';

export interface HeroMessages {
  title_lead: string;
  title_highlight: string;
  subtitle: string;
  cta_primary: string;
  cta_secondary: string;
}

export interface ProblemMessages {
  title: string;
  lead: string;
  body: string[];
}

export interface MatrixMessages {
  title: string;
  subtitle: string;
  col_language: string;
  col_package: string;
  col_version: string;
  col_notes: string;
  notes_node: string;
  notes_python: string;
  notes_dotnet: string;
  notes_java: string;
  version_java: string;
}

export interface PrinciplesMessages {
  title: string;
  subtitle: string;
  items: { title: string; body: string }[];
}

export interface GetStartedMessages {
  title: string;
  subtitle: string;
  footnote: string;
}

export interface AboutMessages {
  title: string;
  subtitle: string;
  opensource_title: string;
  opensource_items: [string, string][];
}

export interface SupportMessages {
  title: string;
  items: { title: string; body: string; cta: string }[];
}

export interface HomeMessages {
  hero: HeroMessages;
  problem: ProblemMessages;
  matrix: MatrixMessages;
  principles: PrinciplesMessages;
  getStarted: GetStartedMessages;
  about: AboutMessages;
  support: SupportMessages;
}

export interface CommonMessages {
  navigation: Record<string, string>;
  footer: { copyright: string; madeWith: string };
  meta: { title: string; description: string };
}

/**
 * Lee los mensajes del locale pedido. Guard clause primero: un locale que no
 * servimos cae al default en vez de reventar el render — aunque hoy el router ya
 * devuelve 404 antes de llegar acá (`dynamicParams = false`).
 */
export async function getHomeMessages(locale: string): Promise<HomeMessages> {
  const safe: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const messages = await import(`../locales/${safe}/home.json`);
  return messages.default as HomeMessages;
}

/** Los textos compartidos por header y footer, también resueltos en el servidor. */
export async function getCommonMessages(locale: string): Promise<CommonMessages> {
  const safe: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const messages = await import(`../locales/${safe}/common.json`);
  return messages.default as CommonMessages;
}
