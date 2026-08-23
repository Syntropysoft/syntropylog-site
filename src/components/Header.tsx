import Logo from './ui/Logo';
import Navigation, { type NavigationItem } from './ui/Navigation';
import LanguageSwitcher from './ui/LanguageSwitcher';
import type { CommonMessages } from '@/services/messages';

/** Los destinos son datos, no traducciones: solo el rótulo cambia de idioma. */
const LINKS: { key: string; href: string; external?: boolean }[] = [
  { key: 'syntropylog', href: '#syntropylog' },
  { key: 'principles', href: '#principles' },
  { key: 'start', href: '#start' },
  { key: 'docs', href: 'https://syntropysoft.github.io/syntropylog-doc/', external: true },
  { key: 'examples', href: 'https://github.com/Syntropysoft/syntropylog-examples', external: true },
  { key: 'tools', href: 'https://cyberchef-production-75f0.up.railway.app/', external: true },
  { key: 'github', href: 'https://github.com/Syntropysoft/SyntropyLog', external: true },
];

/**
 * Server Component. Antes era cliente y resolvía los rótulos con `useTranslations`,
 * así que el HTML servido traía `navigation.github` como texto del link — el
 * crawler leía la clave, no la palabra.
 */
export default function Header({ messages }: { messages: CommonMessages }) {
  const items: NavigationItem[] = LINKS.map(({ key, href, external }) => ({
    label: messages.navigation[key] ?? key,
    href,
    external,
  }));

  return (
    <header className="fixed top-0 w-full bg-sky-950/80 backdrop-blur-lg border-b border-sky-600/30 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <Navigation items={items} />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
