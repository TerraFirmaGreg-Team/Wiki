'use client';

import { story as card } from '@/stories/card.story';
import { story as banner } from '@/stories/banner.story';
import { story as callout } from '@/stories/callout.story';
import { story as icon } from '@/stories/icon.story';
import { story as gradientText } from '@/stories/gradient-text.story';
import { story as glowHeader } from '@/stories/glow-header.story';
import { story as item } from '@/stories/item.story';
import { story as block } from '@/stories/block.story';
import { story as fluid } from '@/stories/fluid.story';
import { story as entity } from '@/stories/entity.story';
import { story as tag } from '@/stories/tag.story';
import { story as quest } from '@/stories/quest.story';
import { story as guide } from '@/stories/guide.story';
import { story as multiblock } from '@/stories/multiblock.story';
import { story as recipe } from '@/stories/recipe.story';
import { story as image } from '@/stories/image.story';
import { story as tabs } from '@/stories/tabs.story';
import { story as accordions } from '@/stories/accordions.story';
import { story as steps } from '@/stories/steps.story';
import { story as files } from '@/stories/files.story';
import { story as mermaid } from '@/stories/mermaid.story';
import { story as code } from '@/stories/code.story';
import { story as twoslash } from '@/stories/twoslash.story';
import { story as codeTabs } from '@/stories/code-tabs.story';
import { story as typeTable } from '@/stories/type-table.story';
import { story as math } from '@/stories/math.story';

const stories = {
  card,
  banner,
  callout,
  icon,
  'gradient-text': gradientText,
  'glow-header': glowHeader,
  item,
  block,
  fluid,
  entity,
  tag,
  quest,
  guide,
  multiblock,
  recipe,
  image,
  tabs,
  accordions,
  steps,
  files,
  mermaid,
  code,
  twoslash,
  'code-tabs': codeTabs,
  'type-table': typeTable,
  math,
} as const;

export function MdxStory({ name }: { name?: string }) {
  const entry = name
    ? stories[name as keyof typeof stories]
    : undefined;
  if (!entry) return null;
  return <entry.WithControl />;
}

