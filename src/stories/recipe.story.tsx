import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { Recipe } from '@terrafirmagreg-team/recipe/components/mdx/recipe';

export const story = defineStory({
  displayName: 'recipe',
  Component: Recipe,
  args: [
    {
      variant: 'Default',
      initial: { id: 'tfg:active_power_transformer', dataset: { id: 'modern' } },
    },
  ],
});

