import { createSectionRoutes } from '@terrafirmagreg-team/kit/components/views/routes';
import { GuideLayout } from '@terrafirmagreg-team/guide/components/views/layout';
import { guideLanding } from '@terrafirmagreg-team/guide/components/views/landing';
import { guideTrees } from '@terrafirmagreg-team/guide/components/tree';
import { getGuideSource } from '@terrafirmagreg-team/guide/lib/source';

export const {
  SectionLayout,
  Page,
  Redirect,
  generateStaticParams,
  generateMetadata,
} = createSectionRoutes({
  section: 'guide',
  trees: guideTrees,
  source: { getSource: getGuideSource },
  layout: GuideLayout,
  landing: guideLanding,
});
