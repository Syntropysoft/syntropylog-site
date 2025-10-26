'use client';

import { useTranslations } from '../../hooks/useTranslations';
import Image from 'next/image';

interface Sponsor {
  name: string;
  logo?: string;
  tier?: string;
  description?: string;
}

interface SponsorsData {
  title: string;
  subtitle: string;
  description: string;
  sponsors: Sponsor[];
}

export default function Sponsors() {
  const { t } = useTranslations();

  // Get sponsors data from translations with fallback
  const sponsorsDataRaw = t('sponsors', 'home');
  const sponsorsData: SponsorsData = typeof sponsorsDataRaw === 'object' ? sponsorsDataRaw as SponsorsData : {
    title: 'Nuestros Patrocinadores',
    subtitle: 'Gracias a quienes hacen posible este proyecto',
    description: 'SyntropyLog es posible gracias al apoyo de nuestra comunidad y patrocinadores.',
    sponsors: []
  };

  const sponsors = sponsorsData?.sponsors || [];

  return (
    <section id='sponsors' className='py-20 bg-slate-800/50'>
      <div className='container mx-auto px-6'>
        {/* Section Header */}
        <div className='text-center mb-12' data-aos='fade-up'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
            {sponsorsData?.title || 'Nuestros Patrocinadores'}
          </h2>
          <p className='text-slate-400 max-w-2xl mx-auto mb-6'>
            {sponsorsData?.subtitle || 'Gracias a quienes hacen posible este proyecto'}
          </p>
          <p className='text-slate-500 text-sm max-w-3xl mx-auto'>
            {sponsorsData?.description || 'SyntropyLog es posible gracias al apoyo de nuestra comunidad y patrocinadores.'}
          </p>
        </div>

        {/* Sponsors Grid */}
        {sponsors.length > 0 ? (
          <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {sponsors.map((sponsor: Sponsor, index: number) => (
              <div
                key={index}
                data-aos='fade-up'
                data-aos-delay={`${(index + 1) * 100}`}
                className='bg-slate-700/50 p-6 rounded-xl border border-slate-600 hover:border-sky-500 transition-all duration-300 transform hover:-translate-y-1'
              >
                <div className='text-center'>
                  {sponsor.logo && (
                    <div className='h-12 flex items-center justify-center mb-4'>
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={48}
                        height={48}
                        className='object-contain'
                      />
                    </div>
                  )}
                  <h3 className='text-lg font-semibold text-white mb-2'>
                    {sponsor.name}
                  </h3>
                  {sponsor.tier && (
                    <span className='inline-block bg-sky-500/20 text-sky-300 px-3 py-1 rounded-full text-xs font-medium mb-3'>
                      {sponsor.tier}
                    </span>
                  )}
                  {sponsor.description && (
                    <p className='text-slate-400 text-sm'>
                      {sponsor.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className='text-center' data-aos='fade-up'>
            <div className='bg-slate-700/30 border-2 border-dashed border-slate-600 rounded-xl p-12 max-w-2xl mx-auto'>
              <div className='text-6xl mb-4'>🤝</div>
              <h3 className='text-xl font-semibold text-white mb-4'>
                {t('sponsors.empty_title', 'home') || 'Sé el primer patrocinador'}
              </h3>
              <p className='text-slate-400 mb-6'>
                {t('sponsors.empty_description', 'home') || 'Ayuda a mantener SyntropyLog como proyecto open source y obtén beneficios exclusivos.'}
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <a 
                  href='https://github.com/Syntropysoft/SyntropyLog'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors'
                >
                  {t('sponsors.become_sponsor', 'home') || 'Convertirse en Patrocinador'}
                </a>
                <a 
                  href='mailto:gabriel70@gmail.com'
                  className='border border-slate-600 hover:border-sky-500 text-slate-300 hover:text-sky-400 font-semibold py-3 px-6 rounded-lg transition-colors'
                >
                  {t('sponsors.contact_us', 'home') || 'Contactar'}
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Support Options */}
        <div className='mt-16 text-center' data-aos='fade-up'>
          <h3 className='text-2xl font-bold text-white mb-6'>
            {t('sponsors.support_options_title', 'home') || 'Otras formas de apoyar'}
          </h3>
          <div className='grid md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
            <div className='bg-slate-700/30 p-6 rounded-xl border border-slate-600'>
              <div className='text-3xl mb-3'>⭐</div>
              <h4 className='text-lg font-semibold text-white mb-2'>
                {t('sponsors.star_github', 'home') || 'Dar Star en GitHub'}
              </h4>
              <p className='text-slate-400 text-sm mb-4'>
                {t('sponsors.star_description', 'home') || 'Ayuda a que más desarrolladores descubran SyntropyLog.'}
              </p>
              <a 
                href='https://github.com/Syntropysoft/SyntropyLog'
                target='_blank'
                rel='noopener noreferrer'
                className='text-sky-400 hover:text-sky-300 text-sm font-medium'
              >
                {t('sponsors.star_button', 'home') || 'Ir a GitHub'} →
              </a>
            </div>
            
            <div className='bg-slate-700/30 p-6 rounded-xl border border-slate-600'>
              <div className='text-3xl mb-3'>🐛</div>
              <h4 className='text-lg font-semibold text-white mb-2'>
                {t('sponsors.report_issues', 'home') || 'Reportar Issues'}
              </h4>
              <p className='text-slate-400 text-sm mb-4'>
                {t('sponsors.issues_description', 'home') || 'Ayuda a mejorar el proyecto reportando bugs o sugerencias.'}
              </p>
              <a 
                href='https://github.com/Syntropysoft/SyntropyLog/issues'
                target='_blank'
                rel='noopener noreferrer'
                className='text-sky-400 hover:text-sky-300 text-sm font-medium'
              >
                {t('sponsors.issues_button', 'home') || 'Ver Issues'} →
              </a>
            </div>
            
            <div className='bg-slate-700/30 p-6 rounded-xl border border-slate-600'>
              <div className='text-3xl mb-3'>💬</div>
              <h4 className='text-lg font-semibold text-white mb-2'>
                {t('sponsors.share', 'home') || 'Compartir'}
              </h4>
              <p className='text-slate-400 text-sm mb-4'>
                {t('sponsors.share_description', 'home') || 'Comparte SyntropyLog con tu equipo y comunidad.'}
              </p>
              <a 
                href='https://twitter.com/intent/tweet?text=Check%20out%20SyntropyLog%20-%20The%20observability%20framework%20for%20high-performance%20teams!%20https://github.com/Syntropysoft/SyntropyLog'
                target='_blank'
                rel='noopener noreferrer'
                className='text-sky-400 hover:text-sky-300 text-sm font-medium'
              >
                {t('sponsors.share_button', 'home') || 'Compartir en Twitter'} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 