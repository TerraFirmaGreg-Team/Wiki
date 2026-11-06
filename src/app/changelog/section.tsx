import { createSectionRoutes } from '@terrafirmagreg-team/kit/components/views/routes';
import { ChangelogLayout } from '@terrafirmagreg-team/changelog/components/views/layout';
import { changelogLanding } from '@terrafirmagreg-team/changelog/components/views/landing';
import { changelogPage } from '@terrafirmagreg-team/changelog/components/views/browser';
import { docsFeatures } from '@/lib/docs-features';
import { changelogTrees, getChangelogSource } from '@/lib/sources';

export const {
  SectionLayout,
  Page,
  Redirect,
  generateStaticParams,
  generateMetadata,
} = createSectionRoutes({
  section: 'changelog',
  trees: changelogTrees,
  source: {
    getSource: getChangelogSource,
    contentDir: 'content/changelog',
    history: false,
  },
  features: docsFeatures,
  layout: ChangelogLayout,
  landing: changelogLanding,
  page: changelogPage,
});
