'use client';

import { useTranslations } from '../../hooks/useTranslations';
import CodeExample from './CodeExample';

const steps = [
  {
    translationKey: 'step1',
    code: 'npm install syntrojs zod'
  },
  {
    translationKey: 'step2',
    code: `import { SyntroJS } from 'syntrojs';
import { z } from 'zod';

const app = new SyntroJS({ title: 'My API' });

// API endpoint with automatic validation
app.post('/users', {
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
  }),
  handler: ({ body }) => ({ id: 1, ...body }),
});

await app.listen(3000);
// ✅ Runs on Node.js AND Bun without changes!`
  }
];

export default function SyntroJSGettingStarted() {
  const { t } = useTranslations();
  
  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-4">
        {t('sintrojs.getting_started_title') || 'Fácil de Empezar'}
      </h3>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index}>
            <label className="font-semibold text-slate-300 block mb-2">
              {t(`sintrojs.${step.translationKey}`)}
            </label>
            <CodeExample code={step.code} />
          </div>
        ))}
        
        <div className="flex flex-col gap-4 pt-4">
          <a 
            href="https://www.npmjs.com/package/syntrojs?activeTab=readme" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 text-center"
          >
            {t('sintrojs.view_npm') || 'Ver en NPM'}
          </a>
          <a 
            href="https://github.com/Syntropysoft/syntrojs" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 text-center"
          >
            {t('sintrojs.view_github') || 'Ver Código en GitHub'}
          </a>
        </div>
      </div>
    </div>
  );
}

