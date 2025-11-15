
'use client';

import { I18nextProvider } from 'react-i18next';
import { useEffect, type ReactNode } from 'react';
import type i18next from 'i18next';

export function ClientProviders({ children, i18n, lang }: { children: ReactNode, i18n: i18next.i18n, lang: string }) {

  // This effect will run on the client and ensure that the client-side i18n instance
  // is updated with the language that was used on the server.
  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <I18nextProvider i18n={i18n}>
        {children}
    </I18nextProvider>
  );
}
