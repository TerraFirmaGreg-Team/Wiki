import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { TypeTable } from '@terrafirmagreg-team/ui/components/mdx/type-table';

export const story = defineStory({
  displayName: 'type-table',
  Component: TypeTable,
  args: [
    {
      variant: 'Default',
      initial: {
        type: {
          id: { type: 'string', description: 'Resource id.', required: true },
          label: { type: 'string', description: 'Display label.' },
          count: {
            type: 'number',
            description: 'Item count.',
            default: '1',
          },
        },
      },
    },
  ],
});

