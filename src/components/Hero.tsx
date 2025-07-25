'use client';

import {useTranslations} from '../hooks/useTranslations';

export default function Hero() {
  const { t } = useTranslations();

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-4 py-32 min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-950 via-sky-900 to-sky-950 opacity-20"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {t('hero.title') as string}
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-sky-100 max-w-3xl mx-auto">
          {t('hero.subtitle') as string}
        </p>
        
        <p className="text-lg md:text-xl mb-12 text-sky-200 max-w-2xl mx-auto">
          <span dangerouslySetInnerHTML={{__html: t('hero.description')}} />
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://github.com/Syntropysoft/SyntropyLog"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-blue-500/25"
          >
            {t('buttons.starOnGithub', 'common') as string}
          </a>
          
          <a
            href="https://www.npmjs.com/package/syntropylog"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-sky-400/50 hover:bg-sky-800/30 rounded-full text-lg font-medium transition-colors duration-200"
          >
            <code className="text-sky-300">{t('buttons.installNpm', 'common') as string}</code>
          </a>
        </div>

        {/* Quick start code */}
        <div className="mt-12 p-6 bg-slate-900/70 rounded-lg ring-1 ring-sky-600/30 max-w-2xl mx-auto">
          <p className="text-sm text-sky-300 mb-2">{t('quickStart.subtitle') as string}</p>
          <code className="text-green-400 font-mono text-sm">
            {t('quickStart.code') as string}
          </code>
        </div>
      </div>
    </section>
  );
} 