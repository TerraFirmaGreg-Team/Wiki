import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import {
  Accordion,
  Accordions,
} from '@terrafirmagreg-team/ui/components/mdx/accordion';

const two = (
  <>
    <Accordion title="Question one">Answer one.</Accordion>
    <Accordion title="Question two">Answer two.</Accordion>
  </>
);

export const story = defineStory({
  displayName: 'accordions',
  Component: Accordions,
  args: [
    {
      variant: 'Default',
      initial: { children: two },
    },
    {
      variant: 'Multiple',
      initial: { multiple: true, children: two },
    },
  ],
});

