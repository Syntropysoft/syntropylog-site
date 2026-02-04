'use client';

import { useRouter, usePathname } from 'next/navigation';

export function useLanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (locale: string) => {
    // Remove the current locale from the pathname and add the new one
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');
    router.push(`/${locale}${pathWithoutLocale}`);
  };

  const getCurrentLocale = (): string => {
    return pathname.startsWith('/es') ? 'es' : 'en';
  };

  return {
    changeLanguage,
    currentLocale: getCurrentLocale(),
  };
}
