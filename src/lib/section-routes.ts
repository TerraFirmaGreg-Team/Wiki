import '@/lib/app-server';
import { changelogRoutes } from '@terrafirmagreg-team/changelog/lib/routes';
import { docsRoutes } from '@terrafirmagreg-team/docs/lib/routes';
import { guideRoutes } from '@terrafirmagreg-team/guide/lib/routes';
import { questRoutes } from '@terrafirmagreg-team/quest/lib/routes';
import { recipeRoutes } from '@terrafirmagreg-team/recipe/lib/routes';
import type { SectionKey } from '@terrafirmagreg-team/kit/types';
import type { SectionRoutes } from '@terrafirmagreg-team/kit/components/views/routes';

export const sectionRoutes: Record<SectionKey, SectionRoutes> = {
  changelog: changelogRoutes(),
  docs: docsRoutes(),
  guide: guideRoutes(),
  quest: questRoutes(),
  recipe: recipeRoutes(),
};
