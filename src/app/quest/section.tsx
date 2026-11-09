import { createSectionRoutes } from '@terrafirmagreg-team/kit/components/views/routes';
import { withSectionTitle } from '@terrafirmagreg-team/kit/lib/section-metadata';
import { ogDeepLink } from '@terrafirmagreg-team/preview/server';
import { QuestLayout } from '@terrafirmagreg-team/quest/components/views/layout';
import { questLanding } from '@terrafirmagreg-team/quest/components/views/landing';
import { questTrees } from '@terrafirmagreg-team/quest/components/tree';
import { getQuestSource } from '@terrafirmagreg-team/quest/lib/source';
import '@terrafirmagreg-team/quest/lib/og';

const routes = createSectionRoutes({
  section: 'quest',
  trees: questTrees,
  source: { getSource: getQuestSource },
  layout: QuestLayout,
  landing: questLanding,
  deepLink: ogDeepLink('quest'),
});

export const { SectionLayout, Page, Redirect, generateStaticParams } = routes;
export const generateMetadata = withSectionTitle(
  routes.generateMetadata,
  'quest',
);
