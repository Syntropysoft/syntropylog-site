'use client';

import {useTranslations} from '../hooks/useTranslations';
import {useRouter, usePathname} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const { t } = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (locale: string) => {
    // Remove the current locale from the pathname and add the new one
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');
    router.push(`/${locale}${pathWithoutLocale}`);
  };

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
            <span className="text-xl font-bold">SyntropyLog</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="hover:text-blue-300 transition">
              {t('navigation.features', 'common') as string}
            </Link>
            <Link href="https://syntropysoft.github.io/syntropylog-doc/" className="hover:text-blue-300 transition">
              {t('navigation.docs', 'common') as string}
            </Link>
            <Link href="https://github.com/Syntropysoft/syntropylog-examples-" className="hover:text-blue-300 transition">
                {t('navigation.examples', 'common') as string}
            </Link>
            <Link href="https://github.com/Syntropysoft/SyntropyLog" className="hover:text-blue-300 transition">
              {t('navigation.github', 'common') as string}
            </Link>
          </nav>

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