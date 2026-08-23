import { Inter } from 'next/font/google';

import { LOCALES } from '@/config/locales';

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
