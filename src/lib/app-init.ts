import dynamic from 'next/dynamic';
import { registerUiConfig } from '@terrafirmagreg-team/ui/lib/config';
import {
  registerClientDumpLoader,
  registerSectionConfig,
} from '@terrafirmagreg-team/kit/lib/config';
import { registerTranslateConfig } from '@terrafirmagreg-team/translate/config';
import { registerReadabilityConfig } from '@terrafirmagreg-team/ui/lib/readability/config';
import { registerSearchClientSource } from '@terrafirmagreg-team/search/lib/sources';
import { registerCommentsView } from '@terrafirmagreg-team/discussions/lib/comments';
import { registerDiscussionsConfig } from '@terrafirmagreg-team/discussions/lib/config';
import { knownLanguages, localeCatalogs } from '@/lib/locales';
import {appName, siteUrl, basePath, previewRoute} from '@/config/sections';
import {docsRoute, immersiveSections} from '@terrafirmagreg-team/sites';
import { datasetConfig } from '@/config/datasets';
import { parseSectionLocation } from '@terrafirmagreg-team/sites/location';
import {
  getPreviewResolver,
  loadClientPreviews,
  registerPreviewResolver,
  resolveLinkPreview,
} from '@terrafirmagreg-team/preview/lib';
import { PageActions } from '@terrafirmagreg-team/kit/components/page-actions';
import { UntranslatedCallout } from '@terrafirmagreg-team/ui/components/blocks/lang/untranslated-callout';
import iconUrl from '@/app/icon.png';
import '@terrafirmagreg-team/quest/lib/embed';
import '@terrafirmagreg-team/recipe/lib/embed';
import '@terrafirmagreg-team/guide/lib/search/filter';

registerTranslateConfig({ locales: localeCatalogs });

registerUiConfig({
  basePath,
  brand: { name: appName, icon: iconUrl.src },
  components: { PageActions, UntranslatedCallout },
  loadPagePreview: (href, ctx) => resolveLinkPreview(href, ctx?.lang),
  loadPagePreviews: loadClientPreviews,
  pagePreviewIcon: dynamic(() =>
    import('@terrafirmagreg-team/game/components/preview-icon').then(
      (m) => m.PagePreviewIcon,
    ),
  ),
});

registerReadabilityConfig({
  isSpotlightDisabled: (pathname) =>
    immersiveSections.has(parseSectionLocation(pathname).section ?? ''),
});

registerSectionConfig({
  basePath,
  siteUrl,
  previewRoute,
  docsRoute,
  datasetConfig,
  knownLanguages,
});

registerClientDumpLoader({
  loadDump: (dataset) =>
    import('@terrafirmagreg-team/dump/lib/dump/mods/load').then((m) =>
      m.loadDatasetDump(dataset),
    ),
  loadVersions: (id) =>
    import('@terrafirmagreg-team/dump/lib/dump/client/dump').then((m) =>
      m.loadClientVersions(id),
    ),
  warm: (dataset) => {
    import('@terrafirmagreg-team/dump/lib/dump/client/dump')
      .then((m) => m.clientDumpJson(dataset, 'manifest.json', 'high'))
      .catch(() => {});
  },
});

registerSearchClientSource(({ refs, locale, tag }) => ({
  deps: [
    refs.map(({ id, version }) => `${id}/${version ?? ''}`).join(','),
    locale,
    String(tag),
  ],
  async search(query: string) {
    const { dumpSearchClientSource } = await import(
      '@terrafirmagreg-team/game/lib/search'
    );
    return dumpSearchClientSource({ refs, locale, tag }).search(query);
  },
}));

registerDiscussionsConfig({
  datasets: datasetConfig,
  siteUrl,
  knownLanguages,
});

registerCommentsView(
  dynamic(() =>
    import('@terrafirmagreg-team/discussions/components/comments-view').then((m) => m.Comments),
  ),
);

const lazyPreviewResolvers: Record<string, () => Promise<unknown>> = {
  guide: () => import('@terrafirmagreg-team/guide/lib/preview'),
  quest: () => import('@terrafirmagreg-team/quest/lib/preview'),
  recipe: () => import('@terrafirmagreg-team/recipe/lib/preview'),
};
for (const [section, load] of Object.entries(lazyPreviewResolvers)) {
  registerPreviewResolver(section, async (ctx) => {
    await load();
    return getPreviewResolver(section)?.resolve(ctx);
  });
}

