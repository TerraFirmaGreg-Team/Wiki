import { defineDocs } from 'fumadocs-mdx/macro';
import { applyMdxPreset } from 'fumadocs-mdx/config';
import { z } from 'zod';
import { sectionDocsConfig } from '@terrafirmagreg-team/kit/lib/section/schema';
import { createSectionSource } from '@terrafirmagreg-team/kit/lib/section/source';
import { createDocsSource } from '@terrafirmagreg-team/docs/lib/source';
import {changelogRoute} from '@terrafirmagreg-team/sites';
import { groupTrees } from '@terrafirmagreg-team/changelog/lib/trees';
import { remarkStripAutoSections } from '@terrafirmagreg-team/changelog/lib/remark';
import { remarkGitChangelog } from '@terrafirmagreg-team/history/lib/remark';
import { mdOptions } from '@terrafirmagreg-team/mdx/lib/md-plugins';
import { datasetConfig } from '../config/datasets';
import { gitConfig } from '../config/sections';

const config = sectionDocsConfig();
const changelogConfig = sectionDocsConfig({
  date: z.iso.date().or(z.date()).optional(),
});
const options = mdOptions(datasetConfig).mdOptions;
const historyPlugin: [typeof remarkGitChangelog, object] = [
  remarkGitChangelog,
  {
    repository: {
      url: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    },
    ...(process.env.GITHUB_TOKEN
      ? { github: { token: process.env.GITHUB_TOKEN } }
      : {}),
  },
];
const changelogOptions = applyMdxPreset({
  ...options,
  remarkPlugins: [
    ...(options.remarkPlugins ?? []),
    remarkStripAutoSections,
    historyPlugin,
  ],
});
const docsOptions = applyMdxPreset({
  ...options,
  remarkPlugins: [...(options.remarkPlugins ?? []), historyPlugin],
});

const docsDef = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: config.docs.schema,
    mdxOptions: docsOptions,
    postprocess: { includeProcessedMarkdown: true },
    async: true,
    files: ['dev/**/*.{mdx,md}', 'modern/**/*.{mdx,md}', 'vintage/**/*.{mdx,md}'],
  },
  meta: { schema: config.meta.schema },
});

const changelogDef = defineDocs({
  dir: 'content/changelog',
  docs: {
    schema: changelogConfig.docs.schema,
    mdxOptions: changelogOptions,
    postprocess: { includeProcessedMarkdown: true },
    async: true,
    files: ['modern/**/*.{mdx,md}', 'vintage/**/*.{mdx,md}'],
  },
  meta: { schema: changelogConfig.meta.schema },
});

const changelogSource = changelogDef.toFumadocsSource();

export const {
  getSource: getDocsSource,
  markdown: docsMarkdown,
  trees: docsTrees,
} = createDocsSource(docsDef.toFumadocsSource());

export const {
  getSource: getChangelogSource,
  markdown: changelogMarkdown,
  trees: changelogTrees,
} = createSectionSource({
  route: changelogRoute,
  section: 'changelog',
  source: { ...changelogSource, files: () => changelogSource.files },
  postTrees: groupTrees(changelogRoute),
});
