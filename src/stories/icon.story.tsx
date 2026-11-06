import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { Icon } from '@terrafirmagreg-team/ui/components/mdx/icon';

export const story = defineStory({
  displayName: 'icon',
  Component: Icon,
  args: [
    { variant: 'Lucide', initial: { name: 'book-open' } },
    { variant: 'Brand', initial: { name: 'github' } },
    {
      variant: 'Styled',
      initial: { name: 'hammer', size: 32, color: '#e34f26', strokeWidth: 1.5 },
    },
  ],
});

