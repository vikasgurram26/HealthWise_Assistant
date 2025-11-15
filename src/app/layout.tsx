
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { getTranslations, getLang } from '@/lib/server-i18n';
import { ClientProviders } from './client-providers';
import { dir } from 'i18next';

export async function generateMetadata() {
  const { t } = await getTranslations();
  return {
    title: t('appTitle'),
    description: t('appDescription'),
  };
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLang();
  const { i18n } = await getTranslations();

  return (
    <html lang={lang} dir={dir(lang)} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ClientProviders i18n={i18n} lang={lang}>
          {children}
          <Toaster />
        </ClientProviders>
      </body>
    </html>
  );
}
