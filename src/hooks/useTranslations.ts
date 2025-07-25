import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

type Messages = Record<string, Record<string, unknown>>;

export function useTranslations() {
  const params = useParams();
  const locale = params?.locale as string;
  const [messages, setMessages] = useState<Messages>({});

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const homeMessages = await import(`../locales/${locale}/home.json`);
        const commonMessages = await import(`../locales/${locale}/common.json`);
        setMessages({
          home: homeMessages.default,
          common: commonMessages.default
        });
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };

    if (locale) {
      loadMessages();
    }
  }, [locale]);

  const t = (key: string, namespace: string = 'home') => {
    try {
      const namespaceMessages = messages[namespace];
      
      if (!namespaceMessages) {
        return key;
      }

      const keys = key.split('.');
      let result: unknown = namespaceMessages;
      
      for (const k of keys) {
        if (result && typeof result === 'object' && k in result && result !== null) {
          result = (result as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }
      
      return result || key;
    } catch (error) {
      console.error('Translation error:', error);
      return key;
    }
  };

  return { t, locale };
} 