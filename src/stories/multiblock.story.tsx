import { defineStory, md } from '@terrafirmagreg-team/mdx/lib/story';
import { MdxMultiblock } from '@terrafirmagreg-team/guide/components/mdx/multiblock';

export const story = defineStory({
  displayName: 'multiblock',
  Component: MdxMultiblock,
  args: [
    {
      variant: 'Name',
      initial: { name: 'Blast Furnace', dataset: 'modern' },
    },
    {
      variant: 'Dump',
      initial: {
        id: 'tfg:b8ee3ec0a872c4eea4941e8ba16f97a4d3b5b92ed8ee47953643f61cb435510d',
        dataset: 'modern',
      },
    },
    {
      variant: 'Spec',
      initial: {
        spec: md`
          {
            "pattern": [[" F ","F F"," F "],[" F ","F F"," F "],[" F ","F F"," F "],[" F ","F F"," F "],[" F ","F0F"," F "],["   "," BW","   "],["   "," M ","   "]],
            "mapping": {"B":"tfc:blast_furnace","F":"tfcbetterbf:insulated_fire_bricks","W":"tfc:bellows[facing=north]","M":"tfcchannelcasting:mold_table"}
          }
        `,
        dataset: 'modern',
      },
    },
  ],
});

