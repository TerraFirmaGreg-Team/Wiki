import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { DocsImage } from '@terrafirmagreg-team/mdx/components/docs-image';

export const story = defineStory({
  displayName: 'image',
  Component: DocsImage,
  args: [
    {
      variant: 'Natural',
      initial: { src: '/dev/images/icon.png', alt: 'TerraFirmaGreg icon' },
    },
    {
      variant: 'Width',
      initial: { src: '/dev/images/icon.png', alt: 'TerraFirmaGreg icon', width: 96 },
    },
    {
      variant: 'Caption',
      initial: {
        src: '/dev/images/icon.png',
        alt: 'TerraFirmaGreg icon',
        caption: 'TerraFirmaGreg icon',
        width: 96,
      },
    },
  ],
});

