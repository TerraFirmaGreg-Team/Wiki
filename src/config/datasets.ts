import { datasetLink } from '@terrafirmagreg-team/kit/lib/dataset-links';
import type { SectionConfigInput } from '@terrafirmagreg-team/kit/lib/config';

const excludedUsers = ['TerraFirmaGreg'] as const;

export const datasetConfig = {
  modern: {
    accent: 'hsl(211 92% 50%)',
    crowdin: {
      url: 'https://crowdin.terrafirmagreg.team/modern',
      excludeUsers: excludedUsers,
    },
    github: {
      repo: 'TerraFirmaGreg-Team/Modpack-Modern',
      discussions: {
        repoId: 'R_kgDOH_FIbA',
        categoryId: 'DIC_kwDOH_FIbM4CbMDm',
      },
    },
    links: [
      datasetLink.curseforge('terrafirmagreg-modern'),
      datasetLink.modrinth('terrafirmagreg'),
    ],
    order: 0,
    sections: {
      guide: { bookOrder: ['tfg:field_guide'] },
      quest: true,
      recipe: true,
    },
  },
  vintage: {
    crowdin: {
      url: 'https://crowdin.terrafirmagreg.team/vintage',
      excludeUsers: excludedUsers,
    },
    github: {
      repo: 'TerraFirmaGreg-Team/Modpack-Vintage',
      discussions: {
        repoId: 'R_kgDOH_EPjw',
        categoryId: 'DIC_kwDOH_EPj84CRyyM',
      },
    },
    links: [
      datasetLink.curseforge('terrafirmagreg-vintage'),
      datasetLink.modrinth('terrafirmagreg-vintage'),
    ],
    order: 1,
  },
  dev: {
    crowdin: {
      url: 'https://crowdin.terrafirmagreg.team/wiki',
      excludeUsers: excludedUsers,
    },
    github: {
      repo: 'TerraFirmaGreg-Team/Wiki',
      discussions: {
        repoId: 'R_kgDOQHnS0A',
        categoryId: 'DIC_kwDOQHnS0M4DKN-8',
      },
    },
    order: 2,
  },
} satisfies SectionConfigInput['datasetConfig'];

export type DatasetId = keyof typeof datasetConfig;
