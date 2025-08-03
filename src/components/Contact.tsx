'use client';

import { useTranslations } from '../hooks/useTranslations';
import ContactForm from './sections/ContactForm';

export default function Contact() {
  const { t } = useTranslations();

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6" data-aos="fade-up">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t('contact.title')}
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
        
        {/* Contact Form */}
        <ContactForm />
      </div>
    </section>
  );
} 