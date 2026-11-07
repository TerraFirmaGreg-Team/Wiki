import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { Card } from '@terrafirmagreg-team/ui/components/mdx/card';

export const story = defineStory({
  displayName: 'card',
  Component: Card,
  args: [
    {
      variant: 'Link',
      initial: {
        title: 'Documentation',
        icon: 'book-open',
        href: '/docs',
        description: 'Guides, mechanics and tutorials',
      },
    },
    {
      variant: 'External',
      initial: {
        title: 'GitHub',
        icon: 'github',
        href: 'https://github.com/TerraFirmaGreg-Team',
        external: true,
      },
    },
    {
      variant: 'Body',
      initial: {
        title: 'Standalone card',
        icon: 'rocket',
        children: 'Card bodies support **any markdown**.',
      },
    },
  ],
});

