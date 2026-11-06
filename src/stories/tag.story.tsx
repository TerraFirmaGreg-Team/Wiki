import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { TagEntry } from '@terrafirmagreg-team/game/components/entry/entry';

export const story = defineStory({
  displayName: 'tag',
  Component: TagEntry,
  args: [
    {
      variant: 'Default',
      initial: { id: '#minecraft:logs', dataset: { id: 'modern' }, labeled: true },
    },
    {
      variant: 'Chip',
      initial: { id: '#minecraft:logs', dataset: { id: 'modern' }, variant: 'chip' },
    },
    {
      variant: 'Copy',
      initial: { id: '#minecraft:logs', dataset: { id: 'modern' }, copy: true },
    },
  ],
});

