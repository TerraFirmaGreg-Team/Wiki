import { defineStory, md } from '@terrafirmagreg-team/mdx/lib/story';
import { CodeBlock, Pre } from '@terrafirmagreg-team/ui/components/mdx/codeblock';

function lines(code: string, highlighted: number[] = []) {
  return (
    <Pre className="px-4">
      <code>
        {code.split('\n').map((line, i) => (
          <span
            key={i}
            className={
              highlighted.includes(i + 1) ? 'line highlighted' : 'line'
            }
          >
            {line}
          </span>
        ))}
      </code>
    </Pre>
  );
}

const diffCode = (
  <Pre className="px-4">
    <code>
      <span className="line diff remove">const a = 1;</span>
      <span className="line diff add">const b = 2;</span>
      <span className="line">const c = 3;</span>
    </code>
  </Pre>
);

const focusCode = (
  <Pre className="px-4">
    <code>
      <span className="line">const a = 1;</span>
      <span className="line focused">const b = 2;</span>
      <span className="line">const c = 3;</span>
    </code>
  </Pre>
);

const wordCode = (
  <Pre className="px-4">
    <code>
      <span className="line">
        const <span className="highlighted-word">amount</span> = 42;
      </span>
    </code>
  </Pre>
);

export const story = defineStory({
  displayName: 'code',
  Component: CodeBlock,
  args: [
    {
      variant: 'Plain',
      initial: {
        children: lines('const x = 1;'),
      },
    },
    {
      variant: 'Titled',
      initial: {
        title: 'hello.ts',
        children: lines(md`
          export function hello() {
            return "hi";
          }
        `),
      },
    },
    {
      variant: 'Lines',
      initial: {
        title: 'lines.ts',
        'data-line-numbers': true,
        children: lines(md`
          const a = 1;
          const b = 2;
          const c = 3;
        `),
      },
    },
    {
      variant: 'Highlight',
      initial: {
        children: lines(
          md`
            const a = 1;
            const b = 2;
            const c = 3;
          `,
          [1, 3],
        ),
      },
    },
    {
      variant: 'Diff',
      initial: { children: diffCode },
    },
    {
      variant: 'Focus',
      initial: {
        className: 'has-focused',
        children: focusCode,
      },
    },
    {
      variant: 'Word',
      initial: { children: wordCode },
    },
    {
      variant: 'NoCopy',
      initial: {
        allowCopy: false,
        children: lines('const x = 1;'),
      },
    },
  ],
});

