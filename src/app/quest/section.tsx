import { createSectionRoutes } from '@terrafirmagreg-team/kit/components/views/routes';
import { QuestLayout } from '@terrafirmagreg-team/quest/components/views/layout';
import { questLanding } from '@terrafirmagreg-team/quest/components/views/landing';
import { questTrees } from '@terrafirmagreg-team/quest/components/tree';
import { getQuestSource } from '@terrafirmagreg-team/quest/lib/source';

export const {
  SectionLayout,
  Page,
  Redirect,
  generateStaticParams,
  generateMetadata,
} = createSectionRoutes({
  section: 'quest',
  trees: questTrees,
  source: { getSource: getQuestSource },
  layout: QuestLayout,
  landing: questLanding,
});
