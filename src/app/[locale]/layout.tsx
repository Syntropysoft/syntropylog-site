import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { DEFAULT_LOCALE, isLocale, LOCALES, type Locale } from '@/config/locales';

const inter = Inter({ subsets: ['latin'] });

/**
 * Los únicos segmentos válidos son los locales soportados.
 *
 * Con `dynamicParams = false`, cualquier otra ruta de un segmento devuelve 404
 * en vez de renderizar la home. Sin esto, `[locale]` se tragaba TODO:
 * /admin, /robots.txt y /esto-no-existe respondían 200 con la portada, que es
 * contenido duplicado infinito para un crawler.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/**
 * Título y descripción por idioma. Antes vivían fijos y en español en el layout
 * raíz, así que /en se anunciaba en castellano y las dos rutas competían por el
 * mismo texto en los resultados de búsqueda.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safe: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const { meta } = (await import(`../../locales/${safe}/common.json`)).default;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${safe}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/${safe}`,
      siteName: 'SyntropySoft',
      locale: safe,
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div lang={locale} className={inter.className}>
      {children}
    </div>
  );
}
