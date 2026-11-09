'use client';

import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { SiteInfo } from '@/components/dev/site-info';

export const story = defineStory({
  displayName: 'site',
  Component: SiteInfo,
  args: [
    {
      variant: 'Sections',
      initial: { view: 'sections' },
    },
    {
      variant: 'Datasets',
      initial: { view: 'datasets' },
    },
  ],
});
