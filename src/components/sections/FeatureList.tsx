'use client';

import { useTranslations } from '../../hooks/useTranslations';
import { CheckIcon } from '@heroicons/react/24/outline';

// Fallback features en caso de que las traducciones no estén disponibles
const fallbackFeatures = [
  {
    title: 'Logging Estructurado',
    description: 'Logs en formato JSON, listos para cualquier plataforma de análisis.'
  },
  {
    title: 'Monitoreo de Rendimiento',
    description: 'Mide y optimiza el rendimiento de tus funciones críticas.'
  },
  {
    title: 'Captura de Errores',
    description: 'Centraliza todos los errores no controlados de tu aplicación.'
  },
  {
    title: 'Enmascaramiento de Datos',
    description: 'Protege información sensible automáticamente.'
  },
  {
    title: 'Transparencia y Seguridad',
    description: '100% open source, sin telemetría oculta y listo para auditorías.'
  }
];

export default function FeatureList() {
  const { t } = useTranslations();
  
  // Obtener features de las traducciones o usar fallback
  const translatedFeatures = t('syntropylog.features', 'home');
  const features = Array.isArray(translatedFeatures) ? translatedFeatures : fallbackFeatures;

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-4">
        {t('syntropylog.feature_title') || 'Observabilidad Integral'}
      </h3>
      <p className="text-slate-400 mb-6">
        {t('syntropylog.feature_desc') || 'SyntropyLog no es solo un logger. Es un completo sistema de observabilidad que te da el poder de entender tu aplicación a fondo, con características listas para producción.'}
      </p>
      
      <h3 className="text-2xl font-bold text-white mb-4">
        {t('syntropylog.main_features_title') || 'Características Principales:'}
      </h3>
      <ul className="space-y-3 text-slate-400">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckIcon className="w-5 h-5 text-sky-400 mr-3 mt-1 flex-shrink-0" />
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