import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { BlockEntry } from '@terrafirmagreg-team/game/components/entry/entry';

export const story = defineStory({
  displayName: 'block',
  Component: BlockEntry,
  args: [
    {
      variant: 'Icon only',
      initial: { id: 'minecraft:stone', dataset: { id: 'modern' } },
    },
    {
      variant: 'Labeled',
      initial: { id: 'minecraft:stone', dataset: { id: 'modern' }, labeled: true },
    },
    {
      variant: 'Chip',
      initial: { id: 'minecraft:stone', dataset: { id: 'modern' }, variant: 'chip' },
    },
    {
      variant: 'Copy',
      initial: { id: 'minecraft:stone', dataset: { id: 'modern' }, copy: true },
    },
  ],
});

