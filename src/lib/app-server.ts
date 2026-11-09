import 'server-only';
import '@/lib/app-init';
import '@/lib/actions';
import { unstable_cache } from 'next/cache';
import { registerServerCache } from '@terrafirmagreg-team/data/lib/server-cache';
import { registerSectionConfig } from '@terrafirmagreg-team/kit/lib/config';
import '@terrafirmagreg-team/guide/lib/config';
import '@terrafirmagreg-team/quest/lib/config';
import '@terrafirmagreg-team/recipe/lib/config';
import { registerMdxComponents } from '@terrafirmagreg-team/mdx/components/mdx-components';
import { ItemIcon } from '@terrafirmagreg-team/game/components/mdx/item-icon';
import { MdxMultiblock } from '@terrafirmagreg-team/guide/components/mdx/multiblock';
import {
  Entry,
  ItemEntry,
  BlockEntry,
  FluidEntry,
  EntityEntry,
  TagEntry,
  RecipeEntry,
} from '@terrafirmagreg-team/game/components/entry/entry';
import { QuestEntry } from '@terrafirmagreg-team/quest/components/mdx/quest-entry';
import { GuideEntry } from '@terrafirmagreg-team/guide/components/mdx/guide-entry';
import {
  changelogMarkdown,
  getChangelogSource,
  docsMarkdown,
  getDocsSource,
} from '@/lib/sources';
import { guideDumpHasContent } from '@terrafirmagreg-team/guide/lib/dump';
import { questDumpHasContent } from '@terrafirmagreg-team/quest/lib/dump';
import { recipeDumpHasContent } from '@terrafirmagreg-team/recipe/lib/dump';
import {
  discoverDumpDatasets,
  loadDatasetDump,
} from '@terrafirmagreg-team/dump/lib/dump/mods/load';
import { registerSearchConfig } from '@terrafirmagreg-team/search/lib';
import { buildSearchIndexes } from '@terrafirmagreg-team/search/lib';
import { sections } from '@terrafirmagreg-team/kit/lib/sources';
import { datasetCatalog } from '@terrafirmagreg-team/kit/lib/datasets';
import { siteLanguages } from '@terrafirmagreg-team/kit/lib/languages';
import { registerDiscussionsConfig } from '@terrafirmagreg-team/discussions/lib/config';
import { datasetConfig } from '@/config/datasets';
import { loadLocaleSet } from '@terrafirmagreg-team/translate/server';
import '@terrafirmagreg-team/guide/lib/markdown/provider';

registerServerCache((key, loader, revalidate) =>
  unstable_cache(loader, ['server-cache', key], {
    revalidate,
    tags: ['server-cache'],
  })(),
);

registerSectionConfig({
  sources: {
    docs: { getSource: getDocsSource, markdown: docsMarkdown },
    changelog: {
      getSource: getChangelogSource,
      markdown: changelogMarkdown,
    },
  },
  ...(process.env.DOCS_ONLY === '1'
    ? {}
    : {
        dump: {
          discoverDatasets: () =>
            discoverDumpDatasets(Object.keys(datasetConfig)),
          loadDataset: loadDatasetDump,
          hasContent: {
            guide: guideDumpHasContent,
            quest: questDumpHasContent,
            recipe: recipeDumpHasContent,
          },
        },
      }),
});

void datasetCatalog()
  .then((catalog) =>
    registerDiscussionsConfig({ knownLanguages: siteLanguages(catalog) }),
  )
  .catch(() => {});

void (async () => {
  const { crowdinMembers, crowdinProgress, crowdinProjectSlug } =
    await import('@terrafirmagreg-team/crowdin/lib/members');
  const { repoContributors } = await import(
    '@terrafirmagreg-team/github/lib/contributors'
  );
  const { sectionConfig } = await import(
    '@terrafirmagreg-team/kit/lib/config'
  );
  for (const dataset of Object.values(sectionConfig().datasetConfig)) {
    const slug = crowdinProjectSlug(dataset.crowdin?.url);
    if (slug)
      void Promise.all([
        crowdinMembers(slug, {
          excludeUsers: dataset.crowdin?.excludeUsers,
          minWords: dataset.crowdin?.minWords,
        }),
        crowdinProgress(slug),
      ]).catch(() => {});
    const repo = dataset.github?.repo;
    const url = dataset.github?.url ?? (repo && `https://github.com/${repo}`);
    if (url)
      void repoContributors(url, {
        excludeUsers: dataset.github?.excludeUsers,
        minContributions: dataset.github?.minContributions,
        mergeUsers: dataset.github?.mergeUsers,
      }).catch(() => {});
  }
})().catch(() => {});

registerSearchConfig({
  indexes: async () =>
    buildSearchIndexes(sections, siteLanguages(await datasetCatalog())),
  i18n: () => loadLocaleSet().fumadocs,
});

registerMdxComponents({
  ItemIcon,
  Entry,
  ItemEntry,
  BlockEntry,
  FluidEntry,
  EntityEntry,
  TagEntry,
  RecipeEntry,
  QuestEntry,
  GuideEntry,
  Multiblock: MdxMultiblock,
});



