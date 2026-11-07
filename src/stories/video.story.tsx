import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { Video } from '@terrafirmagreg-team/ui/components/mdx/video';

export const story = defineStory({
  displayName: 'video',
  Component: Video,
  args: [
    {
      variant: 'Default',
      initial: {
        src: 'https://www.youtube-nocookie.com/embed/vLL7jTtuOuw',
        title: 'Contribution Guide',
      },
    },
  ],
});
