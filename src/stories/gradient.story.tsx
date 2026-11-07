import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { Gradient } from '@terrafirmagreg-team/ui/components/mdx/gradient';

export const story = defineStory({
  displayName: 'gradient',
  Component: Gradient,
  args: [
    {
      variant: 'Default',
      initial: {
        from: '#fa18cf',
        to: '#ff7967',
        dir: 'to right',
        children: 'Gradient text',
      },
    },
    {
      variant: 'Direction',
      initial: {
        from: '#22d3ee',
        to: '#a78bfa',
        dir: '135deg',
        children: 'Diagonal gradient',
      },
    },
    {
      variant: 'Image',
      initial: {
        image:
          'repeating-linear-gradient(45deg, #fa18cf 0 12px, #ff7967 12px 24px)',
        children: 'Striped gradient',
      },
    },
    {
      variant: 'Wrap',
      initial: {
        from: '#f59e0b',
        to: '#ef4444',
        children:
          'A longer gradient sample flowing across the whole line to show wrapping.',
      },
    },
  ],
});
