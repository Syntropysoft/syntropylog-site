'use client';

import {useTranslations} from '../hooks/useTranslations';

export default function Features() {
  const { t } = useTranslations();

  // Get features array safely
  const features = t('features.items', 'home');
  const featuresArray = Array.isArray(features) ? features : [];

  return (
    <section id="features" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {t('features.title') as string}
          </h2>
          <p className="text-xl text-sky-200 max-w-2xl mx-auto">
            {t('features.subtitle') as string}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresArray.map((feature: {title: string; description: string}, index: number) => (
            <div
              key={index}
              className="p-6 bg-slate-900/50 rounded-xl border border-sky-600/30 hover:border-sky-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-400 text-xl font-bold">
                  {index + 1}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              
              <p className="text-sky-200 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 