'use client';
import { useLocale } from './provider';
import en from './locales/en.json';
import hi from './locales/hi.json';
import te from './locales/te.json';

const translations: Record<string, any> = { en, hi, te };

export function useTranslations(namespace: string) {
    const { locale } = useLocale();
    const t = (key: string, values?: Record<string, string | number>) => {
        let translation = translations[locale]?.[namespace]?.[key] || `${namespace}.${key}`;
        if (values) {
            Object.keys(values).forEach(valueKey => {
                translation = translation.replace(`{${valueKey}}`, String(values[valueKey]));
            });
        }
        return translation;
    };
    return t;
}
