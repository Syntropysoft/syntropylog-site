'use client';

import { useTranslations } from '../../hooks/useTranslations';
import CodeExample from './CodeExample';

const steps = [
  {
    translationKey: 'step1_label',
    code: 'npm install syntropylog',
    language: 'bash'
  },
  {
    translationKey: 'step2_label',
    code: `import { syntropyLog } from 'syntropylog';

// Initialize with minimal configuration
await syntropyLog.init({
  logger: {
    serviceName: 'my-app',
    level: 'info',
  },
});

// Use it immediately
const logger = syntropyLog.getLogger();
logger.info('Hello, SyntropyLog!');`,
    language: 'javascript'
  }
];

export default function GettingStarted() {
  const { t } = useTranslations();

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-4">
        {t('syntropylog.getting_started_title') || 'Fácil de Empezar'}
      </h3>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index}>
            <label className="font-semibold text-slate-300 block mb-2">
              {t(`syntropylog.${step.translationKey}`) || step.translationKey}
            </label>
            <CodeExample 
              code={step.code} 
              language={step.language} 
            />
          </div>
        ))}
        
        <div className="flex justify-center pt-4">
          <a 
            href="https://github.com/Syntropysoft/syntropylog" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105"
          >
            {t('syntropylog.docs_cta') || 'Ver Documentación Completa'}
          </a>
        </div>
      </div>
    </div>
  );
} 