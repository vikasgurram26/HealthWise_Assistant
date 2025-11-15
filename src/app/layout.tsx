
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { getTranslations } from '@/lib/server-i18n';
import { ClientProviders } from './client-providers';

export async function generateMetadata() {
  const { t } = await getTranslations();
  return {
    title: t('healthwise'),
    description: t('appDescription'),
  };
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { i18n } = await getTranslations();

  return (
    <html lang={i18n.language} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ClientProviders i18n={i18n}>
            {children}
            <Toaster />
        </ClientProviders>
      </body>
    </html>
  );
}
