import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { GradientText } from '@terrafirmagreg-team/ui/components/mdx/gradient-text';

export const story = defineStory({
  displayName: 'gradient-text',
  Component: GradientText,
  args: [
    {
      variant: 'Default',
      initial: {
        from: '#fa18cf',
        to: '#ff7967',
        children: 'Gradient text',
      },
      fixed: { dir: 'to right' },
    },
    {
      variant: 'Vertical',
      initial: {
        from: '#22d3ee',
        to: '#a78bfa',
        children: 'Gradient text',
      },
      fixed: { dir: 'to bottom' },
    },
  ],
});

