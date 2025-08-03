'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { translationService, TranslationMessages } from '../services/translationService';

export function useTranslations() {
  const params = useParams();
  const locale = params?.locale as string;
  const [messages, setMessages] = useState<TranslationMessages>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMessages = async () => {
      if (!locale || !translationService.isValidLocale(locale)) {
        setError(`Invalid locale: ${locale}`);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const loadedMessages = await translationService.loadMessages(locale);
        setMessages(loadedMessages);
      } catch (error) {
        console.error('Error loading translations:', error);
        setError('Failed to load translations');
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [locale]);

  const t = (key: string, namespace: string = 'home'): string => {
    return translationService.getTranslation(key, namespace, messages);
  };

  const getAvailableLocales = () => {
    return translationService.getAvailableLocales();
  };

  const getCurrentLocale = () => {
    return locale || translationService.getDefaultLocale();
  };

  return {
    t,
    locale: getCurrentLocale(),
    isLoading,
    error,
    getAvailableLocales,
    messages
  };
} 