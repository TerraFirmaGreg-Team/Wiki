import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '@/lib/app-server';
import { appName, siteDescription, siteUrl } from '@/config/sections';
import { defaultDataset } from '@terrafirmagreg-team/kit/lib/datasets';
import { sectionUrl } from '@terrafirmagreg-team/sites/location';
import { resolveLang } from '@terrafirmagreg-team/translate/lib/code';
import { withLang } from '@terrafirmagreg-team/translate/lib/url';
import { loadLocaleRegistry } from '@terrafirmagreg-team/translate/server';

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
  const dataset = await defaultDataset('docs');
  if (!dataset) notFound();
  const { languages, defaultLanguage } = loadLocaleRegistry();
  const target = withLang(
    sectionUrl('docs', dataset),
    resolveLang((await searchParams)?.lang, languages, defaultLanguage),
    defaultLanguage,
  );
  return (
    <main className="flex flex-1 items-center justify-center">
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `location.replace(${JSON.stringify(target)})`,
        }}
      />
      <a className="text-muted-foreground underline" href={target}>
        {appName}
      </a>
    </main>
  );
}
