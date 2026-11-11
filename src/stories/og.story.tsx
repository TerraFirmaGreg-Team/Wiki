'use client';

import {
  defineStory,
  useDataEngine,
} from '@terrafirmagreg-team/mdx/lib/story';
import type { TypeNode } from '@fumadocs/story/type-tree';
import { sectionTabs } from '@terrafirmagreg-team/sites';
import type { OgPreviewProps } from '@terrafirmagreg-team/preview/components/og-preview';
import {
  OgGallery,
  type OgGalleryProps,
} from '@terrafirmagreg-team/preview/components/og-gallery';

import { datasetConfig } from '@/config/datasets';
import { uiLanguages } from '@terrafirmagreg-team/translate/locales';

const enumNode = (values: readonly string[]): TypeNode => ({
  type: 'enum',
  members: [
    { label: 'default', value: undefined },
    ...values.map((v) => ({ label: v, value: v })),
  ],
});

const controls: { node: TypeNode } = {
  node: {
    type: 'object',
    properties: [
      { name: 'url', type: { type: 'string' }, required: false },
      {
        name: 'section',
        type: enumNode(sectionTabs.map((tab) => tab.key)),
        required: false,
      },
      {
        name: 'dataset',
        type: enumNode(Object.keys(datasetConfig)),
        required: false,
      },
      { name: 'slug', type: { type: 'string' }, required: false },
      { name: 'lang', type: enumNode(uiLanguages), required: false },
      { name: 'version', type: { type: 'string' }, required: false },
    ],
  },
};

const presets: { variant: string; initial: OgPreviewProps }[] = [
  {
    variant: 'Docs landing',
    initial: { section: 'docs', dataset: 'modern' },
  },
  {
    variant: 'Docs page',
    initial: {
      section: 'docs',
      dataset: 'modern',
      slug: 'developer/contributing',

    },
  },
  {
    variant: 'Changelog landing',
    initial: { section: 'changelog', dataset: 'modern' },
  },
  {
    variant: 'Changelog release',
    initial: {
      section: 'changelog',
      dataset: 'modern',
      slug: '0.0.7',

    },
  },
  {
    variant: 'Guide book',
    initial: {
      url: '/guide/modern?book=tfg:field_guide',

    },
  },
  {
    variant: 'Guide category',
    initial: {
      url: '/guide/modern?book=tfg:field_guide&cat=game_mechanics',

    },
  },
  {
    variant: 'Guide entry',
    initial: {
      url: '/guide/modern?book=tfg:field_guide&entry=game_mechanics/player_temperature',

    },
  },
  {
    variant: 'Recipe category',
    initial: {
      url: '/recipe/modern?type=gtceu:alloy_smelter',

    },
  },
  {
    variant: 'Recipe tag',
    initial: {
      url: '/recipe/modern?type=emi:tag&id=emi:tag/item/ad_astra/items/calorite_ingots',

    },
  },
  {
    variant: 'Recipe item',
    initial: {
      url: '/recipe/modern?item=tfg:ev_universal_circuit',

    },
  },
  {
    variant: 'Recipe fluid',
    initial: { url: '/recipe/modern?fluid=ad_astra:cryo_fuel' },
  },
  {
    variant: 'Recipe single',
    initial: {
      url: '/recipe/modern?id=gtceu:alloy_blast_smelter/alloy_blast_smelter/rocket_alloy_t2',

    },
  },
  {
    variant: 'Recipe tool',
    initial: { url: '/recipe/modern?tool=calc' },
  },
  {
    variant: 'Quest chapter',
    initial: {
      url: '/quest/modern?category=ev__extreme_voltage',

    },
  },
  {
    variant: 'Quest single',
    initial: { url: '/quest/modern?id=52AB0BDC64293253' },
  },
  {
    variant: 'Quest item',
    initial: { url: '/quest/modern?item=ad_astra:tier_2_rocket' },
  }
];

const items = presets.map((p) => ({ label: p.variant, ...p.initial }));

function OgStory({ gallery, ...props }: OgGalleryProps) {
  const engine = useDataEngine();
  return (
    <OgGallery
      {...props}
      items={gallery ? items : undefined}
      onSelect={({ label: _label, ...itemProps }) =>
        engine.reset({ gallery: true, ...itemProps })
      }
    />
  );
}

export const story = defineStory({
  displayName: 'og',
  Component: OgStory,
  args: [
    {
      variant: 'All',
      initial: { gallery: true, ...presets[0].initial },
      controls,
    },
    ...presets.map((preset) => ({ ...preset, controls })),
  ],
});
