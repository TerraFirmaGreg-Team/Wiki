import { createSectionRoutes } from '@terrafirmagreg-team/kit/components/views/routes';
import { withSectionTitle } from '@terrafirmagreg-team/kit/lib/section-metadata';
import { ogDeepLink } from '@terrafirmagreg-team/preview/server';
import { GuideLayout } from '@terrafirmagreg-team/guide/components/views/layout';
import { guideLanding } from '@terrafirmagreg-team/guide/components/views/landing';
import { guideTrees } from '@terrafirmagreg-team/guide/components/tree';
import { getGuideSource } from '@terrafirmagreg-team/guide/lib/source';
import '@terrafirmagreg-team/guide/lib/og';

const routes = createSectionRoutes({
  section: 'guide',
  trees: guideTrees,
  source: { getSource: getGuideSource },
  layout: GuideLayout,
  landing: guideLanding,
  deepLink: ogDeepLink('guide'),
});

export const { SectionLayout, Page, Redirect, generateStaticParams } = routes;
export const generateMetadata = withSectionTitle(
  routes.generateMetadata,
  'guide',
);
