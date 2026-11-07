import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { Tab, Tabs } from '@terrafirmagreg-team/ui/components/mdx/tabs';

const threeTabs = (
  <>
    <Tab value="First">First tab content.</Tab>
    <Tab value="Second">Second tab content.</Tab>
    <Tab value="Third">Third tab content.</Tab>
  </>
);

export const story = defineStory({
  displayName: 'tabs',
  Component: Tabs,
  args: [
    {
      variant: 'Default',
      initial: { items: ['First', 'Second'], children: threeTabs },
    },
    {
      variant: 'Default',
      initial: {
        items: ['First', 'Second', 'Third'],
        defaultIndex: 1,
        children: threeTabs,
      },
    },
    {
      variant: 'Persist',
      initial: {
        items: ['pnpm', 'npm'],
        persist: true,
        groupId: 'pm',
        children: (
          <>
            <Tab value="pnpm">pnpm add fumadocs-core</Tab>
            <Tab value="npm">npm install fumadocs-core</Tab>
          </>
        ),
      },
    },
  ],
});

