import type { Metadata } from 'next';
import '@/lib/app-server';
import { appName, siteDescription, siteUrl } from '@/config/sections';
import { sectionTabs } from '@terrafirmagreg-team/sites/sections';
import { sectionUrl } from '@terrafirmagreg-team/sites/location';
import { resolveLang } from '@terrafirmagreg-team/translate/lib/code';
import { withLang } from '@terrafirmagreg-team/translate/lib/url';
import { loadLocaleRegistry } from '@terrafirmagreg-team/translate/server';
import { Home } from './home';

export const metadata: Metadata = {
  title: { absolute: appName },
  description: siteDescription,
  openGraph: {
    title: appName,
    description: siteDescription,
    url: siteUrl,
  },
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: Props) {
  const { languages, defaultLanguage } = loadLocaleRegistry();
  const lang = resolveLang(
    (await searchParams)?.lang,
    languages,
    defaultLanguage,
  );
  return (
    <Home
      sections={sectionTabs.map(({ key }) => ({
        key,
        url: withLang(sectionUrl(key), lang, defaultLanguage),
      }))}
    />
  );
}
