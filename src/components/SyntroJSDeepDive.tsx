'use client';

import { useTranslations } from '../hooks/useTranslations';
import SyntroJSFeatures from './sections/SyntroJSFeatures';
import SyntroJSGettingStarted from './sections/SyntroJSGettingStarted';

export default function SyntroJSDeepDive() {
  const { t } = useTranslations();

  return (
    <section id="sintrojs" className="py-20 bg-gradient-to-b from-slate-900/50 to-slate-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('sintrojs.title')}
          </h2>
          <p className="mt-4 text-slate-400 max-w-3xl mx-auto mb-6">
            {t('sintrojs.subtitle')}
          </p>
          <p className="text-slate-500 text-sm max-w-4xl mx-auto">
            {t('sintrojs.description')}
          </p>
        </div>

        {/* Key Features Highlight */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-start gap-4">
              <div className="text-3xl">⚡</div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {t('sintrojs.dual_runtime.title')}
                </h3>
                <p className="text-slate-300 text-sm">
                  {t('sintrojs.dual_runtime.description')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6" data-aos="fade-up" data-aos-delay="200">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🚀</div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {t('sintrojs.fastapi_dx.title')}
                </h3>
                <p className="text-slate-300 text-sm">
                  {t('sintrojs.fastapi_dx.description')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6" data-aos="fade-up" data-aos-delay="300">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🧪</div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {t('sintrojs.testing.title')}
                </h3>
                <p className="text-slate-300 text-sm">
                  {t('sintrojs.testing.description')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6" data-aos="fade-up" data-aos-delay="400">
            <div className="flex items-start gap-4">
              <div className="text-3xl">⚡</div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {t('sintrojs.performance.title')}
                </h3>
                <p className="text-slate-300 text-sm">
                  {t('sintrojs.performance.description')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-slate-800/50 rounded-xl p-8 md:p-12 border border-slate-700" data-aos="fade-up" data-aos-delay="500">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Features */}
            <SyntroJSFeatures />
            
            {/* Right Column - Getting Started */}
            <SyntroJSGettingStarted />
          </div>
        </div>
      </div>
    </section>
  );
}

