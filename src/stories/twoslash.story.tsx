import { defineStory } from '@terrafirmagreg-team/mdx/lib/story';
import { CodeBlock, Pre } from '@terrafirmagreg-team/ui/components/mdx/codeblock';
import { Icon } from '@terrafirmagreg-team/ui/components/mdx/icon';
import {
  Popup,
  PopupContent,
  PopupTrigger,
} from 'fumadocs-twoslash/ui';
import type { CSSProperties, ReactNode } from 'react';

const c = (light: string, dark: string): CSSProperties =>
  ({ '--shiki-light': light, '--shiki-dark': dark }) as CSSProperties;

const kw = c('#D73A49', '#F97583');
const va = c('#005CC5', '#79B8FF');
const str = c('#032F62', '#9ECBFF');
const fn = c('#6F42C1', '#B392F0');

const tsIcon = <Icon name="typescript" className="size-3.5" />;

const tagIcons: Record<string, ReactNode> = {
  log: <Icon name="info" />,
  warn: <Icon name="triangle-alert" />,
  annotate: <Icon name="lightbulb" />,
};
const methodIcon = <Icon name="square-function" />;

const base = {
  title: 'ts',
  icon: tsIcon,
  className: 'shiki-themes github-light github-dark twoslash lsp',
};

const popupCode = (children: ReactNode) => (
  <div className="twoslash shiki fd-codeblock prose-no-margin">
    <code className="twoslash-popup-code">{children}</code>
  </div>
);

const queryLine = (offset: number, content: ReactNode) => (
  <div className="twoslash-meta-line twoslash-query-line nd-copy-ignore">
    <span>{' '.repeat(offset)}</span>
    <span className="twoslash-popup-container nd-copy-ignore">
      <div className="twoslash-popup-arrow" />
      {content}
    </span>
  </div>
);

const tagLine = (name: string, text: string) => (
  <div
    className={`twoslash-tag-line twoslash-tag-${name}-line nd-copy-ignore`}
  >
    <span className={`twoslash-tag-icon tag-${name}-icon`}>
      {tagIcons[name]}
    </span>
    {text}
  </div>
);

const queryCode = (
  <Pre className="px-4">
    <code>
      <span className="line">
        <span style={kw}>const</span>{' '}
        <span className="twoslash-hover" style={va}>
          amount
        </span>{' '}
        <span style={kw}>=</span> <span style={va}>42</span>;
      </span>
      {queryLine(
        4,
        popupCode(
          <>
            <span style={kw}>const</span> <span style={va}>amount</span>:{' '}
            <span style={va}>42</span>
          </>,
        ),
      )}
    </code>
  </Pre>
);

const hoverCode = (
  <Pre className="px-4">
    <code>
      <span className="line">
        <span style={kw}>const</span> <span style={va}>amount</span>{' '}
        <span style={kw}>=</span> <span style={va}>42</span>;
      </span>
      <span className="line">
        <Popup>
          <PopupContent className="nd-copy-ignore">
            {popupCode(
              <>
                <span style={kw}>const</span>{' '}
                <span style={va}>amount</span>: <span style={va}>42</span>
              </>,
            )}
          </PopupContent>
          <PopupTrigger>
            <span style={va}>amount</span>
          </PopupTrigger>
        </Popup>
        .<span style={fn}>toFixed</span>(<span style={va}>2</span>);
      </span>
    </code>
  </Pre>
);

const errorCode = (
  <Pre className="px-4">
    <code>
      <span className="line">
        <span style={kw}>const</span> <span style={va}>a</span>:{' '}
        <span style={va}>number</span> <span style={kw}>=</span>{' '}
        <span className="twoslash-error" style={str}>
          {'"oops"'}
        </span>
        ;
      </span>
      <div className="twoslash-meta-line twoslash-error-line nd-copy-ignore">
        {"Type 'string' is not assignable to type 'number'."}
      </div>
    </code>
  </Pre>
);

const tagsCode = (
  <Pre className="px-4">
    <code>
      <span className="line">
        <span style={kw}>const</span> <span style={va}>amount</span>{' '}
        <span style={kw}>=</span> <span style={va}>42</span>;
      </span>
      {tagLine('log', 'computed once at build time')}
      {tagLine('warn', 'deprecated in favour of amount2')}
      {tagLine('annotate', 'see quest docs for usage')}
    </code>
  </Pre>
);

const completionsCode = (
  <Pre className="px-4">
    <code>
      <span className="line">
        <span style={kw}>const</span> <span style={va}>m</span>{' '}
        <span style={kw}>=</span> <span style={va}>Math</span>;
      </span>
      <span className="line">
        <span style={va}>m</span>.<span style={va}>a</span>
        <span className="twoslash-completion-cursor nd-copy-ignore">
          <ul className="twoslash-completion-list nd-copy-ignore">
            {['abs', 'acos', 'asin', 'atan', 'atan2'].map((name) => (
              <li key={name}>
                <span className="twoslash-completions-icon completions-method">
                  {methodIcon}
                </span>
                <span>
                  <span className="twoslash-completions-matched">a</span>
                  <span className="twoslash-completions-unmatched">
                    {name.slice(1)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </span>
      </span>
    </code>
  </Pre>
);

const highlightCode = (
  <Pre className="px-4">
    <code>
      <span className="line">
        <span style={kw}>const</span>{' '}
        <span className="highlighted-word twoslash-highlighted" style={va}>
          amount
        </span>{' '}
        <span style={kw}>=</span> <span style={va}>42</span>;
      </span>
    </code>
  </Pre>
);

const cutCode = (
  <Pre className="px-4">
    <code>
      <span className="line">
        <span style={kw}>const</span> <span style={va}>amount</span>{' '}
        <span style={kw}>=</span> <span style={va}>42</span>;
      </span>
    </code>
  </Pre>
);

export const story = defineStory({
  displayName: 'twoslash',
  Component: CodeBlock,
  args: [
    {
      variant: 'Query ^?',
      initial: { ...base, children: queryCode },
    },
    {
      variant: 'Hover',
      initial: { ...base, children: hoverCode },
    },
    {
      variant: 'Errors',
      initial: { ...base, children: errorCode },
    },
    {
      variant: 'Tags',
      initial: { ...base, children: tagsCode },
    },
    {
      variant: 'Completions ^|',
      initial: { ...base, children: completionsCode },
    },
    {
      variant: 'Highlight ^^^',
      initial: { ...base, children: highlightCode },
    },
    {
      variant: 'Cut',
      initial: { ...base, children: cutCode },
    },
  ],
});

