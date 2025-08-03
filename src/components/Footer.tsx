'use client';

import { useTranslations } from '../hooks/useTranslations';
import Button from './ui/Button';

export default function Footer() {
  const { t } = useTranslations();

  // Footer links following SRP - data separated from presentation
  const footerLinks = [
    {
      label: t('navigation.github', 'common') as string,
      href: 'https://github.com/Syntropysoft/SyntropyLog',
      external: true
    },
    {
      label: t('navigation.npm', 'common') as string,
      href: 'https://www.npmjs.com/package/syntropylog',
      external: true
    },
    {
      label: t('navigation.docs', 'common') as string,
      href: 'https://syntropysoft.github.io/syntropylog-doc/',
      external: true
    }
  ];

  return (
    <footer className="bg-slate-950 border-t border-sky-600/30 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sky-300 text-sm">
              {t('footer.copyright', 'common') as string}
            </p>
            <p className="text-sky-400 text-xs mt-1">
              {t('footer.madeWith', 'common') as string}
            </p>
            {/* Contact Information */}
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <a 
                href="mailto:gabriel70@gmail.com" 
                className="text-sky-400 text-xs hover:text-sky-300 transition-colors duration-200 flex items-center gap-1"
                title="Enviar email a gabriel70@gmail.com"
              >
                📧 gabriel70@gmail.com
              </a>
              <a 
                href="https://www.linkedin.com/in/gabriel-alejandro-gomez-652a5111/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 text-xs hover:text-sky-300 transition-colors duration-200 flex items-center gap-1"
                title="Ver perfil de LinkedIn"
              >
                💼 LinkedIn
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex space-x-6">
            {footerLinks.map((link, index) => (
              <Button
                key={index}
                href={link.href}
                variant="ghost"
                size="sm"
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="text-sky-300 hover:text-blue-400"
              >
                {link.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
} 