import { createSectionRoutes } from '@terrafirmagreg-team/kit/components/views/routes';
import { RecipeLayout } from '@terrafirmagreg-team/recipe/components/views/layout';
import { recipeLanding } from '@terrafirmagreg-team/recipe/components/views/landing';
import { recipeTrees } from '@terrafirmagreg-team/recipe/components/tree';
import { getRecipeSource } from '@terrafirmagreg-team/recipe/lib/source';

export const {
  SectionLayout,
  Page,
  Redirect,
  generateStaticParams,
  generateMetadata,
} = createSectionRoutes({
  section: 'recipe',
  trees: recipeTrees,
  source: { getSource: getRecipeSource },
  layout: RecipeLayout,
  landing: recipeLanding,
});
