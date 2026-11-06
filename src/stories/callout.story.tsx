import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { Callout } from '@terrafirmagreg-team/ui/components/mdx/callout';

export const story = defineStory({
  displayName: 'callout',
  Component: Callout,
  args: [
    {
      variant: 'Note',
      initial: { type: 'note', children: 'A neutral note.' },
    },
    {
      variant: 'Tip',
      initial: { type: 'tip', children: 'A helpful tip.' },
    },
    {
      variant: 'Info',
      initial: { type: 'info', children: 'An informational block.' },
    },
    {
      variant: 'Warning',
      initial: { type: 'warn', children: 'Something to watch out for.' },
    },
    {
      variant: 'Danger',
      initial: { type: 'danger', children: 'Something dangerous or breaking.' },
    },
    {
      variant: 'Success',
      initial: { type: 'success', children: 'An operation succeeded.' },
    },
    {
      variant: 'Idea',
      initial: { type: 'idea', children: 'An idea block.' },
    },
    {
      variant: 'Custom title',
      initial: {
        type: 'warn',
        title: 'Read before updating',
        children: 'A warning block with a custom title.',
      },
    },
  ],
});

