import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { Banner } from '@terrafirmagreg-team/ui/components/mdx/banner';

const base = { height: '3rem', changeLayout: false };

export const story = defineStory({
  displayName: 'banner',
  Component: Banner,
  args: [
    {
      variant: 'Normal',
      initial: { ...base, children: 'Release 0.11 is out, check the changelog.' },
      fixed: { changeLayout: false },
    },
    {
      variant: 'Rainbow',
      initial: { ...base, variant: 'rainbow', children: 'Rainbow gradient banner.' },
      fixed: { changeLayout: false },
    },
    {
      variant: 'Custom colors',
      initial: {
        ...base,
        variant: 'rainbow',
        rainbowColors: ['#fa18cf', '#ff7967'],
        children: 'Custom rainbowColors list.',
      },
      fixed: { changeLayout: false },
    },
    {
      variant: 'Dismissible',
      initial: { ...base, id: 'release-0-11', children: 'Close persists via id.' },
      fixed: { changeLayout: false },
    },
  ],
});

