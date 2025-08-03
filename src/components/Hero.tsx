'use client';

import { useTranslations } from '../hooks/useTranslations';
import Button from './ui/Button';

// Helper component for the text gradient to keep the code clean.
const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className='bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent'>{children}</span>
);

export default function Hero() {
  const { t, isLoading } = useTranslations();

  // The loading skeleton is a great UX feature, it remains unchanged.
  if (isLoading) {
    return (
      <section className='relative flex flex-col items-center justify-center text-center px-4 py-32 min-h-screen'>
        <div className='animate-pulse'>
          <div className='h-16 bg-sky-800/30 rounded-lg mb-6 w-96'></div>
          <div className='h-8 bg-sky-800/20 rounded-lg mb-8 w-80'></div>
          <div className='h-6 bg-sky-800/20 rounded-lg mb-12 w-96'></div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* This style tag replicates the exact radial gradient from the original example.
        You can move this to your global CSS file under a class like `.hero-gradient`.
      */}
      <style jsx global>{`
        .hero-spotlight-gradient {
          background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(12, 74, 110, 0.3), rgba(255, 255, 255, 0));
        }
      `}</style>

      <section className='relative py-20 md:py-32 text-center hero-spotlight-gradient'>
        {/* Content */}
        <div className='relative z-10 container mx-auto px-6'>
          <h1 className='text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6'>
            {/* The title is now split to apply the gradient to the specific word.
              Your translation file would need to support this structure.
              Example: "hero.title_part1": "SyntropySoft: Forjando el Futuro del "
                       "hero.title_highlight": "DevSecOps"
            */}
            {t('hero.title_part1')}
            <GradientText>{t('hero.title_highlight')}</GradientText>
          </h1>

          <p className='mt-6 text-lg md:text-xl max-w-3xl mx-auto text-slate-400 mb-10'>
            {/* The subtitle is also split to apply the gold highlight.
              Example: "hero.subtitle_part1": "Creamos "
                       "hero.subtitle_highlight": "herramientas inteligentes, seguras y eficientes"
                       "hero.subtitle_part2": " para los equipos de desarrollo más exigentes del mundo."
            */}
            {t('hero.subtitle_part1')}
            <span className='text-yellow-400'>{t('hero.subtitle_highlight')}</span>
            {t('hero.subtitle_part2')}
          </p>

          {/* CTA Buttons remain the same, your implementation was great. */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Button
              href='#ecosystem'
              variant='primary'
              size='lg'
              className='bg-sky-500 hover:bg-sky-600 transform hover:scale-105 transition-transform'>
              {t('hero.cta_explore')}
            </Button>

            <Button
              href='#contact'
              variant='secondary'
              size='lg'
              className='bg-slate-700 hover:bg-slate-600 transform hover:scale-105 transition-transform'>
              {t('hero.cta_contact')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
