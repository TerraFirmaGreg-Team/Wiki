import '@/lib/app-server';
import { sections } from '@terrafirmagreg-team/kit/lib/sources';
import { resolvePage } from '@terrafirmagreg-team/kit/lib/page';
import { markdownProvider } from '@terrafirmagreg-team/mdx/lib/markdown';
import { loadLocaleRegistry } from '@terrafirmagreg-team/translate/server';
import { cachedResponse } from '@terrafirmagreg-team/data/lib/cache-api';
import { notFound } from 'next/navigation';
import type { SectionKey } from '@/types/section';
import type { Lang } from '@terrafirmagreg-team/translate/types/locale';

export const revalidate = false;

export function GET(
  req: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  return cachedResponse(req, 600, async () => {
  const { slug } = await params;
  const [sectionName, ...rest] = slug ?? [];
  const { defaultLanguage } = loadLocaleRegistry();
  const lang =
    (new URL(req.url).searchParams.get('lang') as Lang | null) ??
    defaultLanguage;
  const last = rest[rest.length - 1];
  const slugs = last?.endsWith('.md')
    ? [...rest.slice(0, -1), last.slice(0, -3)]
    : rest;
  if (sectionName) {
    const provider = markdownProvider(sectionName);
    if (provider) {
      const res = await provider(req, { slugs, lang });
      if (!res) notFound();
      return res;
    }
  }
  const section = sectionName
    ? sections[sectionName as SectionKey]
    : undefined;
  if (!section) notFound();
  const resolved = resolvePage(await section.getSource(), slugs, lang);
  if (!resolved) notFound();

  return new Response(await section.markdown.page(resolved.page), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
  });
}

