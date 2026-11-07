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
      variant: 'Important',
      initial: { type: 'important', children: 'Key information.' },
    },
    {
      variant: 'Warning',
      initial: { type: 'warn', children: 'Something to watch out for.' },
    },
    {
      variant: 'Caution',
      initial: { type: 'caution', children: 'Proceed with care.' },
    },
    {
      variant: 'Attention',
      initial: { type: 'attention', children: 'Draws attention.' },
    },
    {
      variant: 'Danger',
      initial: { type: 'danger', children: 'Something dangerous or breaking.' },
    },
    {
      variant: 'Error',
      initial: { type: 'error', children: 'An error occurred.' },
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
      variant: 'Alert',
      initial: { type: 'tip', children: 'A GitHub [!TIP] alert block.' },
    },
    {
      variant: 'Question',
      initial: { type: 'question', children: 'A question block.' },
    },
    {
      variant: 'Failure',
      initial: { type: 'failure', children: 'A failure block.' },
    },
    {
      variant: 'Bug',
      initial: { type: 'bug', children: 'A bug block.' },
    },
    {
      variant: 'Abstract',
      initial: { type: 'abstract', children: 'An abstract / TL;DR block.' },
    },
    {
      variant: 'Example',
      initial: { type: 'example', children: 'An example block.' },
    },
    {
      variant: 'Quote',
      initial: { type: 'quote', children: 'A quote block.' },
    },
    {
      variant: 'Title',
      initial: {
        type: 'warn',
        title: 'Read before updating',
        children: 'A warning block with a custom title.',
      },
    },
  ],
});

