import { createSectionRoutes } from '@terrafirmagreg-team/kit/components/views/routes';
import { createGitFileUrl } from '@terrafirmagreg-team/kit/lib/urls';
import { withSectionTitle } from '@terrafirmagreg-team/kit/lib/section-metadata';
import { ChangelogLayout } from '@terrafirmagreg-team/changelog/components/views/layout';
import { changelogLanding } from '@terrafirmagreg-team/changelog/components/views/landing';
import { changelogPage } from '@terrafirmagreg-team/changelog/components/views/browser';
import { gitConfig } from '@/config/sections';
import { changelogTrees, getChangelogSource } from '@/lib/sources';

const routes = createSectionRoutes({
  section: 'changelog',
  trees: changelogTrees,
  source: {
    getSource: getChangelogSource,
    contentDir: 'content/changelog',
    history: false,
  },
  features: { fileUrl: createGitFileUrl(gitConfig) },
  layout: ChangelogLayout,
  landing: changelogLanding,
  page: changelogPage,
});

export const { SectionLayout, Page, Redirect, generateStaticParams } = routes;
export const generateMetadata = withSectionTitle(
  routes.generateMetadata,
  'changelog',
);
