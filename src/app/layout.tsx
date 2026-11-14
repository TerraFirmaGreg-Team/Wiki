import type { Metadata } from 'next';
import '@/lib/app-server';
import { AppProvider } from '@/providers/app-provider';
import {appName, siteUrl} from '@/config/sections';
import { htmlLang, resolveLang } from '@terrafirmagreg-team/translate/lib/code';
import {
  LANG_COOKIE,
  LANG_HEADER,
  requestLang,
} from '@terrafirmagreg-team/translate/lib/lang-cookie';
import { cookies, headers } from 'next/headers';
import { loadLocaleRegistry } from '@terrafirmagreg-team/translate/server';
import { datasetCatalog } from '@terrafirmagreg-team/kit/lib/datasets';
import { dumpStorageOrigin } from '@terrafirmagreg-team/data/lib/env';
import './global.css';

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
  const requestHeaders = await headers();
  const requestCookies = await cookies();
  const lang = resolveLang(
    requestLang(
      requestCookies.get(LANG_COOKIE)?.value,
      requestHeaders.get(LANG_HEADER),
    ),
    registry.languages,
    registry.defaultLanguage,
  );
  return (
    <html lang={htmlLang(lang)} suppressHydrationWarning>
      <head>
        {dumpOrigin && (
          <>
            <link rel="preconnect" href={dumpOrigin} crossOrigin="anonymous" />
            <link rel="dns-prefetch" href={dumpOrigin} />
          </>
        )}
      </head>
      <body className="flex flex-col min-h-screen">
        <AppProvider
          registry={registry}
          catalog={await datasetCatalog()}
          initialLang={lang}
        >
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

