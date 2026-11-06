import type { Metadata } from 'next';
import '@/lib/app-server';
import { AppProvider } from '@/providers/app-provider';
import {appName, siteUrl} from '@/config/sections';
import { htmlLang } from '@terrafirmagreg-team/translate/lib/code';
import { loadLocaleRegistry } from '@terrafirmagreg-team/translate/server';
import { datasetCatalog } from '@terrafirmagreg-team/kit/lib/datasets';
import './global.css';

function dumpStorageOrigin(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_DUMP_STORAGE_URL;
  if (!raw) return undefined;
  try {
    return new URL(raw).origin;
  } catch {
    return undefined;
  }
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  openGraph: {
    siteName: appName,
    type: 'website',
    url: siteUrl,
  },
};

export default async function Layout({ children }: LayoutProps<'/'>) {
  const registry = loadLocaleRegistry();
  const dumpOrigin = dumpStorageOrigin();
  return (
    <html lang={htmlLang(registry.defaultLanguage)} suppressHydrationWarning>
      <head>
        {dumpOrigin && (
          <>
            <link rel="preconnect" href={dumpOrigin} crossOrigin="anonymous" />
            <link rel="dns-prefetch" href={dumpOrigin} />
          </>
        )}
      </head>
      <body className="flex flex-col min-h-screen">
        <AppProvider registry={registry} catalog={await datasetCatalog()}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

