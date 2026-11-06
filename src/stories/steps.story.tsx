import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { Step, Steps } from '@terrafirmagreg-team/ui/components/mdx/steps';

export const story = defineStory({
  displayName: 'steps',
  Component: Steps,
  args: [
    {
      variant: 'Default',
      initial: {
        children: (

          <>
            <Step>Install the package.</Step>
            <Step>Configure the project.</Step>
            <Step>Run the build.</Step>
          </>
        ),
      },
    },
  ],
});

