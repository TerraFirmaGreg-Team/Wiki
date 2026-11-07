import { createSectionRoutes } from '@terrafirmagreg-team/kit/components/views/routes';
import { createGitFileUrl } from '@terrafirmagreg-team/kit/lib/urls';
import { DocsLayout } from '@terrafirmagreg-team/docs/components/views/layout';
import { docsLanding } from '@terrafirmagreg-team/docs/components/views/landing';
import { docsPage } from '@terrafirmagreg-team/docs/components/views/browser';
import { gitConfig } from '@/config/sections';
import { docsTrees, getDocsSource } from '@/lib/sources';

export const {
  SectionLayout,
  Page,
  Redirect,
  generateStaticParams,
  generateMetadata,
} = createSectionRoutes({
  section: 'docs',
  trees: docsTrees,
  source: { getSource: getDocsSource, contentDir: 'content/docs' },
  features: { fileUrl: createGitFileUrl(gitConfig) },
  layout: DocsLayout,
  landing: docsLanding,
  page: docsPage,
});
