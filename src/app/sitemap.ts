import '@/lib/app-server';
import type { MetadataRoute } from 'next';
import {siteUrl} from '@/config/sections';
import { sections } from '@terrafirmagreg-team/kit/lib/sources';
import { sectionDatasets } from '@terrafirmagreg-team/kit/lib/datasets';
import { toPublicSlug } from '@terrafirmagreg-team/translate/lib/slug';
import type { SectionKey } from '@/types/section';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seen = new Set<string>();
  const urls: MetadataRoute.Sitemap = [{ url: siteUrl }];

  for (const key of Object.keys(sections) as SectionKey[]) {
    const section = sections[key];
    if (!section) continue;
    const languages = new Set(
      (await sectionDatasets(key)).flatMap((dataset) =>
        (dataset.languages ?? []).filter((lang): lang is string => Boolean(lang)),
      ),
    );
    for (const page of (await section.getSource()).getPages()) {
      const path = `/${key}/${toPublicSlug(page.slugs, [...languages]).join('/')}`;
      if (seen.has(path)) continue;
      seen.add(path);
      urls.push({ url: `${siteUrl}${path}` });
    }
  }
  return urls;
}

