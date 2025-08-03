'use client';

import { useTranslations } from '../hooks/useTranslations';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from './ui/Navigation';

export default function Header() {
  const { t } = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (locale: string) => {
    // Remove the current locale from the pathname and add the new one
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');
    router.push(`/${locale}${pathWithoutLocale}`);
  };

  // Navigation items following SRP - data separated from presentation
  const navigationItems = [
    {
      label: t('navigation.features', 'common') as string,
      href: '#features',
      external: false
    },
    {
      label: t('navigation.docs', 'common') as string,
      href: 'https://syntropysoft.github.io/syntropylog-doc/',
      external: true
    },
    {
      label: t('navigation.examples', 'common') as string,
      href: 'https://github.com/Syntropysoft/syntropylog-examples-',
      external: true
    },
    {
      label: t('navigation.github', 'common') as string,
      href: 'https://github.com/Syntropysoft/SyntropyLog',
      external: true
    }
  ];

  return (
    <header className="fixed top-0 w-full bg-sky-950/80 backdrop-blur-lg border-b border-sky-600/30 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/syntropylog-logo.png"
              alt="SyntropyLog"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-xl font-bold">Syntropysoft</span>
          </Link>

          {/* Navigation Component */}
          <Navigation items={navigationItems} />

          {/* Language Switcher */}
          <div className="flex items-center space-x-4">
            <select
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-sky-800/50 border border-sky-600/30 rounded px-3 py-1 text-sm"
              defaultValue={pathname.startsWith('/es') ? 'es' : 'en'}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
} 