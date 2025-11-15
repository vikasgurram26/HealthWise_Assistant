
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

export const getOptions = (lng = 'en', ns = 'translation') => {
  return {
    // debug: true,
    supportedLngs: ['en', 'es', 'hi', 'te'],
    fallbackLng: 'en',
    lng,
    fallbackNS: 'translation',
    defaultNS: 'translation',
    ns,
  };
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ...getOptions(),
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
