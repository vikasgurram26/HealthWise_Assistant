
'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { Suspense } from 'react';

// No metadata export, as it's not supported in client components
// SEO can be handled in a Server Component wrapping this layout if needed

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>HealthWise Assistant</title>
        <meta name="description" content="AI-Driven Public Health Chatbot for Disease Awareness" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Suspense fallback={<div>Loading...</div>}>
          <I18nextProvider i18n={i18n}>
            {children}
            <Toaster />
          </I18nextProvider>
        </Suspense>
      </body>
    </html>
  );
}
