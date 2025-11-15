
import { createInstance, i18n } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { getOptions } from '@/lib/i18n';
import { cookies } from 'next/headers';

const initI18next = async (lng: string | undefined, ns = 'translation'): Promise<i18n> => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../../public/locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function getTranslations(ns?: string) {
    const lang = cookies().get('i18next')?.value;
    const i18n = await initI18next(lang, ns);
    return {
        t: i18n.t,
        i18n,
    };
}
