import { sites } from '@terrafirmagreg-team/sites/hosts';

export const appName = 'Wiki';
export const siteUrl = sites.wiki;

export const gitConfig = {
  user: 'TerraFirmaGreg-Team',
  repo: 'Wiki',
  branch: 'main',
} as const;

export const basePath: string = '';
export const previewRoute = '/api/preview';
export const searchRoute = '/api/search';
