'use client';

import { useTranslations } from '../hooks/useTranslations';
import Navigation from './ui/Navigation';
import Logo from './ui/Logo';
import LanguageSwitcher from './ui/LanguageSwitcher';

/**
 * Header Component - Orquesta los componentes de layout del header
 * Sigue SRP: Solo se encarga de orquestar y proporcionar datos de navegación
 */
export default function Header() {
  const { t } = useTranslations();

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
      label: t('navigation.tools', 'common') as string,
      href: 'https://cyberchef-production-75f0.up.railway.app/',
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
          <Logo />
          <Navigation items={navigationItems} />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
} 