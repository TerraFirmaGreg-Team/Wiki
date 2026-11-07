import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import {
  Accordion,
  Accordions,
} from '@terrafirmagreg-team/ui/components/mdx/accordion';

const two = (
  <>
    <Accordion title="First">Content one.</Accordion>
    <Accordion title="Second">Content two.</Accordion>
  </>
);

export const story = defineStory({
  displayName: 'accordions',
  Component: Accordions,
  args: [
    {
      variant: 'Group',
      initial: { children: two },
    },
    {
      variant: 'Details',
      initial: {
        children: <Accordion title="Summary">Hidden content.</Accordion>,
      },
    },
    {
      variant: 'Open',
      initial: {
        defaultValue: ['Summary'],
        children: <Accordion title="Summary">Hidden content.</Accordion>,
      },
    },
    {
      variant: 'Multiple',
      initial: { multiple: true, children: two },
    },
    {
      variant: 'Nested',
      initial: {
        defaultValue: ['Outer'],
        children: (
          <Accordion title="Outer">
            Before.
            <Accordions>
              <Accordion title="Inner one">Nested answer one.</Accordion>
              <Accordion title="Inner two">Nested answer two.</Accordion>
            </Accordions>
          </Accordion>
        ),
      },
    },
  ],
});
