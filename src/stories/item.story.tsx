import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { ItemEntry } from '@terrafirmagreg-team/game/components/entry/entry';

export const story = defineStory({
  displayName: 'item',
  Component: ItemEntry,
  args: [
    {
      variant: 'Icon only',
      initial: { id: 'minecraft:iron_ingot', dataset: { id: 'modern' } },
    },
    {
      variant: 'Labeled',
      initial: { id: 'tfg:cast_iron_ingot', dataset: { id: 'modern' }, labeled: true },
    },
    {
      variant: 'Chip',
      initial: { id: 'minecraft:iron_ingot', dataset: { id: 'modern' }, variant: 'chip' },
    },
    {
      variant: 'Copy',
      initial: { id: 'minecraft:iron_ingot', dataset: { id: 'modern' }, copy: true },
    },
  ],
});

