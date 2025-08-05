'use client';

import { useTranslations } from '../hooks/useTranslations';
import {
  SyntropyLogIcon,
  SyntropyFrontIcon,
  PraetorianIcon,
} from '../assets/icons';

interface Tool {
  name: string;
  description: string;
  cta: string;
  ctaUrl?: string;
  status?: string;
  npm?: string;
  help?: string;
}

interface EcosystemData {
  title: string;
  subtitle: string;
  tools: Tool[];
}

export default function Features() {
  const { t } = useTranslations();

  // Get ecosystem data from translations with fallback
  const ecosystemDataRaw = t('ecosystem', 'home');
  const ecosystemData = typeof ecosystemDataRaw === 'object' ? ecosystemDataRaw as EcosystemData : {
    title: 'Ecosistema Completo',
    subtitle: 'Tres herramientas poderosas, una plataforma unificada',
    tools: []
  };
  
  const tools = ecosystemData?.tools || [];

  // Map tools to component structure
  const ecosystemProducts = tools.map((tool: Tool, index: number) => ({
    id: tool.name.toLowerCase().replace(/\s+/g, ''),
    name: tool.name,
    icon: tool.name === 'SyntropyLog' ? <SyntropyLogIcon /> : 
          tool.name === 'SyntropyFront' ? <SyntropyFrontIcon /> : 
          <PraetorianIcon />,
    emoji: tool.name === 'SyntropyLog' ? '🔍' : 
           tool.name === 'SyntropyFront' ? '🎨' : '🏛️',
    description: tool.description,
    isPrimary: tool.name === 'SyntropyLog',
    aosDelay: `${(index + 1) * 100}`,
    cta: tool.cta,
    ctaUrl: tool.ctaUrl,
    status: tool.status,
    npm: tool.npm,
    help: tool.help
  }));

  return (
    <section id='ecosystem' className='py-20 bg-slate-900/70'>
      <div className='container mx-auto px-6'>
        {/* Section Header */}
        <div className='text-center mb-12' data-aos='fade-up'>
          <h2 className='text-3xl md:text-4xl font-bold text-white'>
            {ecosystemData?.title || 'Ecosistema Completo'}
          </h2>
          <p className='mt-4 text-slate-400 max-w-2xl mx-auto'>
            {ecosystemData?.subtitle || 'Tres herramientas poderosas, una plataforma unificada'}
          </p>
        </div>

        {/* Products Grid */}
        <div className='grid md:grid-cols-3 gap-8'>
          {ecosystemProducts.map((product) => (
            <div
              key={product.id}
              data-aos='fade-up'
              data-aos-delay={product.aosDelay}
              className={`bg-slate-800 p-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 ${
                product.isPrimary 
                  ? 'border border-sky-500 shadow-2xl shadow-sky-900/50' 
                  : 'border border-slate-700 hover:border-sky-500'
              }`}>
              {/* Icon Container */}
              <div className='flex items-center justify-center h-16 w-16 rounded-full bg-sky-900/50 mb-6'>{product.icon}</div>

              {/* Product Title */}
              <h3 className='text-xl font-bold text-white mb-2'>
                {product.name}
                <span className='ml-2'>{product.emoji}</span>
              </h3>

              {/* Product Description */}
              <p className='text-slate-400 mb-4'>
                {product.description}
                {/* Special status for Praetorian */}
                {product.status && (
                  <span className='font-semibold text-yellow-400 ml-1'>({product.status})</span>
                )}
              </p>

              {/* NPM Package */}
              {product.npm && (
                <div className='mb-3'>
                  <code className='bg-slate-700 text-sky-300 px-3 py-1 rounded text-sm font-mono'>
                    {product.npm}
                  </code>
                </div>
              )}

              {/* Help Link */}
              {product.help && (
                <div className='mb-4'>
                  <a 
                    href={product.help}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='text-sm text-slate-500 hover:text-sky-400 transition-colors'
                  >
                    {t('common.view_documentation', 'home') || '📖 Ver documentación'}
                  </a>
                </div>
              )}

              {/* Call to Action */}
              <a 
                href={product.ctaUrl || (product.id === 'syntropylog' ? '#syntropylog' : `https://www.npmjs.com/package/@syntropysoft/${product.id}`)} 
                target={product.id === 'syntropylog' ? '_self' : '_blank'}
                rel={product.id === 'syntropylog' ? '' : 'noopener noreferrer'}
                className='font-semibold text-sky-400 hover:text-sky-300 transition-colors'
              >
                {product.cta} &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
