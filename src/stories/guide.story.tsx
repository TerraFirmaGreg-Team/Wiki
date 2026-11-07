import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { GuideEntry } from '@terrafirmagreg-team/guide/components/mdx/guide-entry';

export const story = defineStory({
  displayName: 'guide',
  Component: GuideEntry,
  args: [
    {
      variant: 'Id',
      initial: {
        id: 'agriculture/composting',
        dataset: { id: 'modern' },
        labeled: true,
      },
    },
    {
      variant: 'Name',
      initial: { id: 'Blast Furnace', dataset: { id: 'modern' }, labeled: true },
    },
  ],
});

