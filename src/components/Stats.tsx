'use client';

import {useTranslations} from '../hooks/useTranslations';

export default function Stats() {
  const { t } = useTranslations();

  const stats = [
    {label: t('stats.downloads'), value: '1,904+'},
    {label: t('stats.examples'), value: '30+'},
    {label: t('stats.coverage'), value: '94.1%'},
    {label: t('stats.version'), value: 'v0.6.14'}
  ];

  return (
    <section className="py-24 px-4 bg-slate-900/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {t('stats.title') as string}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-sky-200">
                {stat.label as string}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 