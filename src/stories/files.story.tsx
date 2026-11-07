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
      variant: 'List',
      initial: {
        children: (
          <>
            <Folder name="app" defaultOpen>
              <File name="layout.tsx" />
              <File name="page.tsx" />
            </Folder>
            <File name="package.json" />
          </>
        ),
      },
    },
    {
      variant: 'Links',
      initial: {
        children: (
          <>
            <Folder
              name="modpack"
              defaultOpen
              href="/docs/modern/modpack"
              description="Modpack guides"
            >
              <File
                name="optional-mods.md"
                href="/docs/modern/modpack/optional-mods"
                description="Extra compatible mods"
              />
              <Folder name="kubejs" defaultOpen>
                <File name="server_scripts" />
                <File name="startup_scripts" />
              </Folder>
            </Folder>
            <File
              name="pakku.json"
              href="https://pakku.readthedocs.io"
              description="Pakku config"
            />
          </>
        ),
      },
    },
    {
      variant: 'Deep',
      initial: {
        children: (
          <Folder name="content" defaultOpen>
            <Folder name="docs" defaultOpen>
              <Folder name="dev" defaultOpen>
                <Folder name="components" defaultOpen>
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
    {
      variant: 'Fenced',
      initial: {
        children: (
          <Folder name="TerraFirmaGreg" defaultOpen>
            <File name="mods" />
            <File name="config" />
          </Folder>
        ),
      },
    },
  ],
});
