import { createSectionRoutes } from '@terrafirmagreg-team/kit/components/views/routes';
import { createGitFileUrl } from '@terrafirmagreg-team/kit/lib/urls';
import { withSectionTitle } from '@terrafirmagreg-team/kit/lib/section-metadata';
import { DocsLayout } from '@terrafirmagreg-team/docs/components/views/layout';
import { docsLanding } from '@terrafirmagreg-team/docs/components/views/landing';
import { docsPage } from '@terrafirmagreg-team/docs/components/views/browser';
import { PageHistoryFooter } from '@terrafirmagreg-team/github/components/page-history';
import { RepoContributors } from '@terrafirmagreg-team/github/components/contributors';
import { PageFooterFeedback } from '@terrafirmagreg-team/discussions/components/page-features';
import { CrowdinMembers } from '@terrafirmagreg-team/crowdin/components/members';
import { gitConfig } from '@/config/sections';
import { docsTrees, getDocsSource } from '@/lib/sources';

const routes = createSectionRoutes({
  section: 'docs',
  trees: docsTrees,
  source: { getSource: getDocsSource, contentDir: 'content/docs' },
  features: {
    fileUrl: createGitFileUrl(gitConfig),
    footer: (ctx) => (
      <>
        <CrowdinMembers ctx={ctx} />
        <RepoContributors ctx={ctx} />
        <PageHistoryFooter ctx={ctx} />
        <PageFooterFeedback />
      </>
    ),
  },
  layout: DocsLayout,
  landing: docsLanding,
  page: docsPage,
});

export const { SectionLayout, Page, Redirect, generateStaticParams } = routes;
export const generateMetadata = withSectionTitle(
  routes.generateMetadata,
  'docs',
);
