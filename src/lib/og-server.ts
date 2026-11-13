import 'server-only';
import '@terrafirmagreg-team/recipe/lib/og';
import '@terrafirmagreg-team/quest/lib/og';
import '@terrafirmagreg-team/guide/lib/og';
import { registerSectionConfig } from '@terrafirmagreg-team/kit/lib/config';
import { datasetConfig } from '@/config/datasets';
import {
  appName,
  basePath,
  previewRoute,
  sectionAccent,
  siteUrl,
} from '@/config/sections';
import { docsRoute } from '@terrafirmagreg-team/sites';

registerSectionConfig({
  appName,
  basePath,
  siteUrl,
  previewRoute,
  docsRoute,
  sectionAccent,
  datasetConfig,
  sources: {
    docs: {
      getSource: () =>
        import('@/lib/sources').then((m) => m.getDocsSource()),
      markdown: {
        page: (page) =>
          import('@/lib/sources').then((m) => m.docsMarkdown.page(page)),
      },
      trees: (lang) =>
        import('@/lib/sources').then((m) => m.docsTrees(lang)),
    },
    changelog: {
      getSource: () =>
        import('@/lib/sources').then((m) => m.getChangelogSource()),
      markdown: {
        page: (page) =>
          import('@/lib/sources').then(
            (m) => m.changelogMarkdown.page(page),
          ),
      },
      trees: (lang) =>
        import('@/lib/sources').then((m) => m.changelogTrees(lang)),
    },
  },
});
