'use client';

import { useTranslations } from '../hooks/useTranslations';
import OpenSourceCommitment from './sections/OpenSourceCommitment';

export default function AboutUs() {
  const { t } = useTranslations();

  return (
    <section id="about" className="py-20 bg-slate-900/70">
      <div className="container mx-auto px-6 text-center" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          {t('about.title')}
        </h2>
        <p className="mt-4 text-slate-400 max-w-3xl mx-auto">
          {t('about.subtitle')}
        </p>
        
        {/* Open Source Commitment Card */}
        <OpenSourceCommitment />
      </div>
    </section>
  );
} 