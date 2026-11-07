import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { FluidEntry } from '@terrafirmagreg-team/game/components/entry/entry';

export const story = defineStory({
  displayName: 'fluid',
  Component: FluidEntry,
  args: [
    {
      variant: 'Icon',
      initial: { id: 'minecraft:lava', dataset: { id: 'modern' } },
    },
    {
      variant: 'Labeled',
      initial: { id: 'minecraft:lava', dataset: { id: 'modern' }, labeled: true },
    },
    {
      variant: 'Chip',
      initial: { id: 'minecraft:lava', dataset: { id: 'modern' }, variant: 'chip' },
    },
    {
      variant: 'Copy',
      initial: { id: 'minecraft:lava', dataset: { id: 'modern' }, copy: true },
    },
  ],
});

