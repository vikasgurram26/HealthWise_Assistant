
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { getOptions } from './i18n-options';


i18n
  .use(initReactI18next)
  .use(resourcesToBackend((language: string, namespace: string) => import(`../../public/locales/${language}/${namespace}.json`)))
  .init({
    ...getOptions(),
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;
