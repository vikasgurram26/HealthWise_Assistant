
'use client';

import { I18nextProvider } from 'react-i18next';
import { type i18n } from 'i18next';
import { Suspense } from 'react';

export function ClientProviders({
    children,
    i18n
}: {
    children: React.ReactNode;
    i18n: i18n;
}) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <I18nextProvider i18n={i18n}>
                {children}
            </I18nextProvider>
        </Suspense>
    );
}
