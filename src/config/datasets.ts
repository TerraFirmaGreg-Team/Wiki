import { datasetLink } from '@terrafirmagreg-team/kit/lib/dataset-links';
import type { SectionConfigInput } from '@terrafirmagreg-team/kit/lib/config';

export const datasetConfig: SectionConfigInput['datasetConfig'] = {
  modern: {
    repo: 'TerraFirmaGreg-Team/Modpack-Modern',
    discussions: { repoId: 'R_kgDOH_FIbA', categoryId: 'DIC_kwDOH_FIbM4CbMDm' },
    accent: 'hsl(211 92% 50%)',
    crowdin: 'https://crowdin.terrafirmagreg.team/modern',
    links: [
      datasetLink.github('TerraFirmaGreg-Team/Modpack-Modern'),
      datasetLink.curseforge('terrafirmagreg-modern'),
      datasetLink.modrinth('terrafirmagreg'),
    ],
    order: 0,
    sections: ['guide', 'quest', 'recipe'],
    guide: { bookOrder: ['tfg:field_guide'] },
  },
  vintage: {
    repo: 'TerraFirmaGreg-Team/Modpack-Vintage',
    discussions: { repoId: 'R_kgDOH_EPjw', categoryId: 'DIC_kwDOH_EPj84CRyyM' },
    crowdin: 'https://crowdin.terrafirmagreg.team/vintage',
    links: [
      datasetLink.github('TerraFirmaGreg-Team/Modpack-Vintage'),
      datasetLink.curseforge('terrafirmagreg-vintage'),
      datasetLink.modrinth('terrafirmagreg-vintage'),
    ],
    order: 1,
    sections: [],
  },
  dev: {
    repo: 'TerraFirmaGreg-Team/Wiki',
    discussions: { repoId: 'R_kgDOQHnS0A', categoryId: 'DIC_kwDOQHnS0M4DKN-8' },
    crowdin: 'https://crowdin.terrafirmagreg.team/wiki',
    links: [datasetLink.github('TerraFirmaGreg-Team/Wiki')],
    order: 2,
  },
};

