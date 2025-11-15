
import 'server-only';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { cookies } from 'next/headers';
import { getOptions } from './i18n-options';

const initI18next = async (lang: string, ns: string | string[]) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`../../public/locales/${language}/${namespace}.json`)))
    .init(getOptions(lang, ns));
  return i18nInstance;
};

export async function getTranslations(ns?: string | string[], options: { keyPrefix?: string } = {}) {
  const lang = await getLang();
  const i18nextInstance = await initI18next(lang, ns || 'translation');
  return {
    t: i18nextInstance.getFixedT(lang, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}

export async function getLang() {
  return cookies().get('i18next')?.value || 'en';
}
