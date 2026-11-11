'use server';
import '@/lib/app-server';
import {
  localeRenderer,
  registerLocaleLoader,
  type LocaleLoadResult,
  type LocaleScope,
} from '@terrafirmagreg-team/kit/lib/locale/renderer';
import { sectionTree } from '@terrafirmagreg-team/kit/lib/section-trees';
import { sectionConfig } from '@terrafirmagreg-team/kit/lib/config';
import { sectionUrl } from '@terrafirmagreg-team/sites/location';
import { timelineEntries } from '@terrafirmagreg-team/changelog/components/entries';
import { getChangelogSource } from '@/lib/sources';
import { loadLocaleRegistry } from '@terrafirmagreg-team/translate/server';
import type { Lang } from '@terrafirmagreg-team/translate/types/locale';
import type * as PageTree from 'fumadocs-core/page-tree';

export async function loadLocaleContent(
  scope: LocaleScope,
  lang: Lang,
): Promise<LocaleLoadResult> {
  const entry = localeRenderer(scope.section);
  if (!entry) return null;
  const resolved = await entry.resolve(scope.slug, lang);
  if (resolved && !resolved.isFallback) {
    return {
      node: await entry.render(resolved.page, scope.slug, lang),
      missing: false,
    };
  }
  const { defaultLanguage } = loadLocaleRegistry();
  const fallback = await entry.resolve(scope.slug, defaultLanguage);
  if (!fallback) return null;
  return {
    node: await entry.render(fallback.page, scope.slug, lang),
    missing: true,
  };
}

export async function loadSectionTree(
  section: string,
  datasetId: string,
  lang: Lang,
): Promise<PageTree.Root | null> {
  return (await sectionTree(section, datasetId, lang)) ?? null;
}

export async function loadChangelogEntries(
  dataset: string,
  lang: Lang,
  offset: number,
  count: number,
) {
  const { entries } = await timelineEntries(
    await getChangelogSource(),
    sectionUrl('changelog'),
    dataset,
    lang,
    sectionConfig().datasetConfig[dataset]?.github?.repo,
    { offset, count },
  );
  return entries;
}

registerLocaleLoader(loadLocaleContent);

