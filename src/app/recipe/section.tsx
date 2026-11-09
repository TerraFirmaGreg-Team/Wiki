import { createSectionRoutes } from '@terrafirmagreg-team/kit/components/views/routes';
import { withSectionTitle } from '@terrafirmagreg-team/kit/lib/section-metadata';
import { ogDeepLink } from '@terrafirmagreg-team/preview/server';
import { RecipeLayout } from '@terrafirmagreg-team/recipe/components/views/layout';
import { recipeLanding } from '@terrafirmagreg-team/recipe/components/views/landing';
import { recipeTrees } from '@terrafirmagreg-team/recipe/components/tree';
import { getRecipeSource } from '@terrafirmagreg-team/recipe/lib/source';
import '@terrafirmagreg-team/recipe/lib/og';

const routes = createSectionRoutes({
  section: 'recipe',
  trees: recipeTrees,
  source: { getSource: getRecipeSource },
  layout: RecipeLayout,
  landing: recipeLanding,
  deepLink: ogDeepLink('recipe'),
});

export const { SectionLayout, Page, Redirect, generateStaticParams } = routes;
export const generateMetadata = withSectionTitle(
  routes.generateMetadata,
  'recipe',
);
