'use client';

import { useTranslations } from '../hooks/useTranslations';
import FeatureList from './sections/FeatureList';
import GettingStarted from './sections/GettingStarted';

export default function SyntropyLogDeepDive() {
  const { t } = useTranslations();

  return (
    <section id="syntropylog" className="py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t('syntropylog.title')}
          </h2>
          <p className="mt-4 text-slate-400 max-w-3xl mx-auto">
            {t('syntropylog.subtitle')}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-slate-800/50 rounded-xl p-8 md:p-12 border border-slate-700" data-aos="fade-up">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Features */}
            <FeatureList />
            
            {/* Right Column - Getting Started */}
            <GettingStarted />
          </div>
        </div>
      </div>
    </section>
  );
} 