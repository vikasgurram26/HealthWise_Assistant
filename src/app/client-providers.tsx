
'use client';

import { I18nextProvider } from 'react-i18next';
import { type i18n } from 'i18next';
import { Suspense } from 'react';
import i18nClient from '@/lib/i18n';

export function ClientProviders({
    children,
    i18n
}: {
    children: React.ReactNode;
    i18n: i18n;
}) {
    // This merges the server-side translations into the client-side instance.
    // This is important to avoid hydration mismatches.
    if (i18nClient.isInitialized) {
        Object.keys(i18n.services.resourceStore.data).forEach((lang) => {
            Object.keys(i18n.services.resourceStore.data[lang]).forEach((ns) => {
                i18nClient.addResourceBundle(
                    lang,
                    ns,
                    i18n.services.resourceStore.data[lang][ns],
                    true,
                    true
                );
            });
        });
    }


    return (
        <Suspense fallback={<div>Loading...</div>}>
            <I18nextProvider i18n={i18nClient}>
                {children}
            </I18nextProvider>
        </Suspense>
    );
}
