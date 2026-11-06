import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { QuestEntry } from '@terrafirmagreg-team/quest/components/mdx/quest-entry';

export const story = defineStory({
  displayName: 'quest',
  Component: QuestEntry,
  args: [
    {
      variant: 'By id',
      initial: { id: '016D8D348A03C684', dataset: { id: 'modern' }, labeled: true },
    },
    {
      variant: 'By filename',
      initial: {
        id: 'getting_started',
        dataset: { id: 'modern' },
        labeled: true,
      },
    },
    {
      variant: 'By title',
      initial: { id: 'Polarizer', dataset: { id: 'modern' }, labeled: true },
    },
  ],
});

