import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { GlowHeader } from '@terrafirmagreg-team/ui/components/mdx/glow-header';

export const story = defineStory({
  displayName: 'glow-header',
  Component: GlowHeader,
  args: [
    {
      variant: 'Default',
      initial: {
        from: '#fa18cf',
        to: '#ff7967',
        gradient: true,
        fade: true,
        children: 'Glow Header',
      },
      fixed: { dir: 'to right' },
    },
    {
      variant: 'Solid',
      initial: { gradient: false, fade: false, children: 'Glow Header' },
      fixed: { dir: 'to right' },
    },
  ],
});

