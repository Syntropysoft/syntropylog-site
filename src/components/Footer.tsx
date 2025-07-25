'use client';

import {useTranslations} from '../hooks/useTranslations';

export default function Footer() {
  const { t } = useTranslations();

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
          </div>

          {/* Links */}
          <div className="flex space-x-6">
            <a
              href="https://github.com/Syntropysoft/SyntropyLog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-300 hover:text-blue-400 transition"
            >
              {t('navigation.github', 'common') as string}
            </a>
            <a
              href="https://www.npmjs.com/package/syntropylog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-300 hover:text-blue-400 transition"
            >
              {t('navigation.npm', 'common') as string}
            </a>
            <a
              href="https://syntropysoft.github.io/syntropylog-doc/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-300 hover:text-blue-400 transition"
            >
              {t('navigation.docs', 'common') as string}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 