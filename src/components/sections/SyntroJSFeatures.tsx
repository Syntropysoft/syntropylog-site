'use client';

import { useTranslations } from '../../hooks/useTranslations';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function SyntroJSFeatures() {
  const { t } = useTranslations();

  const features = [
    {
      title: t('sintrojs.dual_runtime.title') || '⚡ Dual Runtime',
      description: t('sintrojs.dual_runtime.description') || 'El mismo código funciona en Node.js y Bun sin cambios'
    },
    {
      title: t('sintrojs.fastapi_dx.title') || '🚀 FastAPI-like DX',
      description: t('sintrojs.fastapi_dx.description') || 'Validación automática con Zod, type-safety completo'
    },
    {
      title: t('sintrojs.interactive_docs.title') || '📚 Documentación Interactiva',
      description: t('sintrojs.interactive_docs.description') || 'Swagger UI y ReDoc generados automáticamente'
    },
    {
      title: t('sintrojs.testing.title') || '🧪 Testing Simplificado',
      description: t('sintrojs.testing.description') || 'TinyTest hace que escribir tests sea tan fácil como crear endpoints'
    },
    {
      title: t('sintrojs.performance.title') || '⚡ Alto Rendimiento',
      description: t('sintrojs.performance.description') || '3.8x más rápido que Fastify con Bun, 89.3% con Node.js'
    }
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-4">
        {t('sintrojs.features_title') || 'Características Principales:'}
      </h3>
      <p className="text-slate-400 mb-6">
        {t('sintrojs.description') || 'SyntroJS es el primer framework dual-runtime del mundo que trae la simplicidad de FastAPI a Node.js y Bun.'}
      </p>
      
      <ul className="space-y-3 text-slate-400">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckIcon className="w-5 h-5 text-emerald-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <strong className="text-slate-200">{feature.title}:</strong>{' '}
              {feature.description}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

