'use client';

import { useTranslations } from '../../hooks/useTranslations';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function OpenSourceCommitment() {
  const { t } = useTranslations();
  
  const commitments = [
    {
      title: 'Licencia Permisiva',
      description: 'Todos nuestros productos están licenciados bajo Apache 2.0.'
    },
    {
      title: 'Bienvenidas las Contribuciones',
      description: 'Creemos en el poder de la colaboración.'
    },
    {
      title: 'Apóyanos en GitHub',
      description: '¡Una estrella ⭐ en nuestro repositorio nos ayuda a crecer!'
    }
  ];

  return (
    <div className="mt-10 max-w-2xl mx-auto bg-slate-800 p-8 rounded-xl border border-slate-700">
      <h3 className="text-2xl font-bold text-white mb-4">
        {t('about.opensource_title') || 'Compromiso Open Source'}
      </h3>
      <ul className="space-y-3 text-slate-400 text-left">
        {commitments.map((commitment, index) => (
          <li key={index} className="flex items-start">
            <CheckIcon className="w-5 h-5 text-sky-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <strong className="text-slate-200 mr-2">{commitment.title}:</strong>
              {commitment.description}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 