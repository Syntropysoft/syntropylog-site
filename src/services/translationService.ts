export interface TranslationMessages {
  [namespace: string]: Record<string, unknown>;
}

export interface TranslationService {
  loadMessages: (locale: string) => Promise<TranslationMessages>;
  getTranslation: (key: string, namespace: string, messages: TranslationMessages) => string;
  getAvailableLocales: () => string[];
}

class TranslationServiceImpl implements TranslationService {
  private availableLocales = ['en', 'es'];

  async loadMessages(locale: string): Promise<TranslationMessages> {
    try {
      const homeMessages = await import(`../locales/${locale}/home.json`);
      const commonMessages = await import(`../locales/${locale}/common.json`);
      
      return {
        home: homeMessages.default,
        common: commonMessages.default
      };
    } catch (error) {
      console.error(`Error loading translations for locale ${locale}:`, error);
      // Fallback to English if translation fails
      if (locale !== 'en') {
        return this.loadMessages('en');
      }
      return {};
    }
  }

  getTranslation(key: string, namespace: string, messages: TranslationMessages): string {
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

      return (result as string) || key;
    } catch (error) {
      console.error('Translation error:', error);
      return key;
    }
  }

  getAvailableLocales(): string[] {
    return this.availableLocales;
  }

  isValidLocale(locale: string): boolean {
    return this.availableLocales.includes(locale);
  }

  getDefaultLocale(): string {
    return 'en';
  }
}

// Singleton instance
export const translationService = new TranslationServiceImpl(); 