import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import {
  CodeBlock,
  CodeBlockTab,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
  Pre,
} from '@terrafirmagreg-team/ui/components/mdx/codeblock';
import type { ReactNode } from 'react';

function code(lines: string) {
  return (
    <CodeBlock>
      <Pre className="px-4">
        <code>
          {lines.split('\n').map((line, i) => (
            <span key={i} className="line">
              {line}
            </span>
          ))}
        </code>
      </Pre>
    </CodeBlock>
  );
}

function Tabbed({
  tabs,
  code: src,
  persist,
  groupId,
}: {
  tabs: string[];
  code: string;
  persist?: boolean;
  groupId?: string;
}) {
  return (
    <CodeBlockTabs defaultValue={tabs[0]} persist={persist} groupId={groupId}>
      <CodeBlockTabsList>
        {tabs.map((tab) => (
          <CodeBlockTabsTrigger key={tab} value={tab}>
            {tab}
          </CodeBlockTabsTrigger>
        ))}
      </CodeBlockTabsList>
      {tabs.map((tab) => (
        <CodeBlockTab key={tab} value={tab}>
          {code(`${tab === 'npm' ? 'npm install' : `${tab} add`} ${src}`)}
        </CodeBlockTab>
      ))}
    </CodeBlockTabs>
  );
}

export const story = defineStory({
  displayName: 'code-tabs',
  Component: ({ children }: { children?: ReactNode }) => <>{children}</>,
  args: [
    {
      variant: 'Tabs',
      initial: {
        children: <Tabbed tabs={['pnpm', 'npm']} code="fumadocs-core" />,
      },
    },
    {
      variant: 'Manager',
      initial: {
        children: <Tabbed tabs={['pnpm', 'npm', 'yarn', 'bun']} code="fumadocs-core" />,
      },
    },
    {
      variant: 'Synced',
      initial: {
        children: (
          <Tabbed tabs={['pnpm', 'npm']} code="fumadocs-core" persist groupId="pm" />
        ),
      },
    },
  ],
});

