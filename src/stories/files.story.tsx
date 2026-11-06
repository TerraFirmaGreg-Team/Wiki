import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import {
  File,
  Files,
  Folder,
} from '@terrafirmagreg-team/ui/components/mdx/files';

export const story = defineStory({
  displayName: 'files',
  Component: Files,
  args: [
    {
      variant: 'Default',
      initial: {
        children: (

          <Folder name="src" defaultOpen>
            <File name="index.ts" />
            <Folder name="components">
              <File name="button.tsx" />
            </Folder>
          </Folder>
        ),
      },
    },
    {
      variant: 'Deep tree',
      initial: {
        children: (
          <Folder name="content" defaultOpen>
            <Folder name="docs" defaultOpen>
              <Folder name="dev" defaultOpen>
                <Folder name="components">
                  <File name="index.md" />
                  <File name="item.md" />
                  <File name="meta.json" />
                </Folder>
                <File name="meta.json" />
              </Folder>
            </Folder>
            <File name="index.mdx" />
          </Folder>
        ),
      },
    },
  ],
});

