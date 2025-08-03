'use client';

import { useTranslations } from '../../hooks/useTranslations';
import { useState } from 'react';
import emailjs from 'emailjs-com';

export default function ContactForm() {
  const { t } = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Configuración de EmailJS
      const templateParams = {
        to_email: 'gabriel70@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        reply_to: formData.email
      };

      // Enviar email usando EmailJS
      await emailjs.send(
        'YOUR_SERVICE_ID', // Reemplazar con tu Service ID de EmailJS
        'YOUR_TEMPLATE_ID', // Reemplazar con tu Template ID
        templateParams,
        'YOUR_USER_ID' // Reemplazar con tu User ID
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-slate-800/50 p-8 rounded-xl border border-slate-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-slate-400 mb-2">
            {t('contact.form_name')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-slate-400 mb-2">
            {t('contact.form_email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-slate-400 mb-2">
          {t('contact.form_message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="mb-4 p-3 bg-green-900/50 border border-green-500 rounded-lg text-green-300">
          ¡Mensaje enviado exitosamente! Te responderemos pronto.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-300">
          Error al enviar el mensaje. Por favor, intenta nuevamente.
        </div>
      )}

      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Enviando...' : t('contact.form_submit')}
        </button>
      </div>

      {/* EmailJS Configuration Notice */}
      <div className="mt-4 text-xs text-slate-500 text-center">
        <p>📧 Los mensajes se envían a: gabriel70@gmail.com</p>
        <p className="mt-1">
          <strong>Configuración necesaria:</strong> Reemplaza YOUR_SERVICE_ID, YOUR_TEMPLATE_ID y YOUR_USER_ID 
          en el código con tus credenciales de EmailJS.
        </p>
      </div>
    </form>
  );
} 