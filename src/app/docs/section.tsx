import { createSectionRoutes } from '@terrafirmagreg-team/kit/components/views/routes';
import { DocsLayout } from '@terrafirmagreg-team/docs/components/views/layout';
import { docsLanding } from '@terrafirmagreg-team/docs/components/views/landing';
import { docsPage } from '@terrafirmagreg-team/docs/components/views/browser';
import { docsFeatures } from '@/lib/docs-features';
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
  features: docsFeatures,
  layout: DocsLayout,
  landing: docsLanding,
  page: docsPage,
});
