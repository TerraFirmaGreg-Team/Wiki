import 'server-only';
import '@/lib/app-init';
import { registerSectionConfig } from '@terrafirmagreg-team/kit/lib/config';
import '@terrafirmagreg-team/guide/lib/config';
import '@terrafirmagreg-team/quest/lib/config';
import '@terrafirmagreg-team/recipe/lib/config';
import { registerMdxComponents } from '@terrafirmagreg-team/mdx/components/mdx-components';
import { ItemIcon } from '@terrafirmagreg-team/game/components/mdx/item-icon';
import { MdxMultiblock } from '@terrafirmagreg-team/guide/components/mdx/multiblock';
import { MdxStory } from '@/components/mdx/story';
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
import { sectionConfig } from '@terrafirmagreg-team/kit/lib/config';
import { datasetConfig } from '@/config/datasets';
import { loadLocaleSet } from '@terrafirmagreg-team/translate/server';
import '@terrafirmagreg-team/guide/lib/markdown/provider';

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

registerSearchConfig({
  indexes: () =>
    buildSearchIndexes(sections, sectionConfig().knownLanguages),
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
  Story: MdxStory,
});



