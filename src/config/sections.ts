import { sites } from '@terrafirmagreg-team/sites/hosts';
import type { SectionKey } from '@terrafirmagreg-team/sites';

export const appName = 'Wiki';
export const siteUrl = sites.wiki;

export const sectionAccent: Record<SectionKey, string> = {
  docs: '#6ea8ff',
  guide: '#7dd87d',
  recipe: '#ffb347',
  quest: '#ff96ff',
  changelog: '#b49aff',
};

export const gitConfig = {
  user: 'TerraFirmaGreg-Team',
  repo: 'Wiki',
  branch: 'main',
} as const;

export const basePath: string = '';
export const previewRoute = '/api/preview';
export const searchRoute = '/api/search';
