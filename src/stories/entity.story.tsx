import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { EntityEntry } from '@terrafirmagreg-team/game/components/entry/entry';

export const story = defineStory({
  displayName: 'entity',
  Component: EntityEntry,
  args: [
    {
      variant: 'Auto (texture → egg)',
      initial: { id: 'tfc:pig', dataset: { id: 'modern' }, view: 'auto' },
    },
    {
      variant: 'Texture',
      initial: { id: 'tfc:pig', dataset: { id: 'modern' }, view: 'texture' },
    },
    {
      variant: 'Spawn egg',
      initial: { id: 'minecraft:zombie', dataset: { id: 'modern' }, view: 'egg' },
    },
    {
      variant: 'Model',
      initial: { id: 'tfc:pig', dataset: { id: 'modern' }, view: 'model' },
    },
  ],
});

