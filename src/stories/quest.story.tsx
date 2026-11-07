import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { QuestEntry } from '@terrafirmagreg-team/quest/components/mdx/quest-entry';

export const story = defineStory({
  displayName: 'quest',
  Component: QuestEntry,
  args: [
    {
      variant: 'Id',
      initial: { id: '016D8D348A03C684', dataset: { id: 'modern' }, labeled: true },
    },
    {
      variant: 'File',
      initial: {
        id: 'getting_started',
        dataset: { id: 'modern' },
        labeled: true,
      },
    },
    {
      variant: 'Title',
      initial: { id: 'Polarizer', dataset: { id: 'modern' }, labeled: true },
    },
  ],
});

