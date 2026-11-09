'use client';

import { createElement } from 'react';
import { Database } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import {
  dumpSections,
  sectionTabs,
  type SectionKey,
} from '@terrafirmagreg-team/sites';
import { useSectionCatalog } from '@terrafirmagreg-team/kit/hooks/use-catalog';
import type { SectionDataset } from '@terrafirmagreg-team/kit/types';
import { datasetConfig } from '@/config/datasets';
import { datasetLinks } from '@terrafirmagreg-team/kit/lib/dataset-links';
import { sectionAccent } from '@/config/sections';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@terrafirmagreg-team/ui/components/ui/item';

export type SiteInfoProps = {
  view?: 'sections' | 'datasets';
  section?: SectionKey;
};

function SectionsView({ section }: { section?: SectionKey }) {
  const catalog = useSectionCatalog();
  const tabs = section ? sectionTabs.filter((t) => t.key === section) : sectionTabs;
  return (
    <ItemGroup>
      {tabs.map((tab) => {
        const datasets = catalog[tab.key] ?? [];
        return (
          <Item key={tab.key} variant="outline">
            <ItemMedia variant="icon" style={{ color: sectionAccent[tab.key] }}>
              {createElement(tab.icon)}
            </ItemMedia>
            <ItemContent>
              <ItemTitle>
                {tab.key}
                <span className="ml-2 font-mono text-xs font-normal text-muted-foreground">
                  {tab.url}
                </span>
              </ItemTitle>
              <ItemDescription>
                {dumpSections.has(tab.key) ? 'dump' : 'content'} ·{' '}
                {datasets.length}{' '}
                {datasets.length === 1 ? 'dataset' : 'datasets'}
              </ItemDescription>
            </ItemContent>
          </Item>
        );
      })}
    </ItemGroup>
  );
}

function DatasetsView({ section }: { section?: SectionKey }) {
  const catalog = useSectionCatalog();
  const tabs = section ? sectionTabs.filter((t) => t.key === section) : sectionTabs;
  const rows = new Map<string, { d: SectionDataset; sections: SectionKey[] }>();
  for (const tab of tabs) {
    for (const d of catalog[tab.key] ?? []) {
      const row = rows.get(d.id) ?? { d, sections: [] };
      if (!row.sections.includes(tab.key)) row.sections.push(tab.key);
      rows.set(d.id, row);
    }
  }
  const cfgOf = (id: string) =>
    id in datasetConfig
      ? datasetConfig[id as keyof typeof datasetConfig]
      : undefined;
  const ordered = [...rows.values()].sort(
    (a, b) =>
      (cfgOf(a.d.id)?.order ?? Number.MAX_SAFE_INTEGER) -
      (cfgOf(b.d.id)?.order ?? Number.MAX_SAFE_INTEGER),
  );
  return (
    <ItemGroup>
      {ordered.map(({ d, sections }) => {
        const cfg = cfgOf(d.id);
        const links = datasetLinks(cfg);
        return (
        <Item key={d.id} variant="outline">
          <ItemMedia variant="icon">
            {d.icon ? <DynamicIcon name={d.icon} /> : <Database />}
          </ItemMedia>
          <ItemContent>
            <ItemTitle>
              {d.title ?? d.id}
              <span className="ml-2 font-mono text-xs font-normal text-muted-foreground">
                {d.id}
              </span>
            </ItemTitle>
            {d.description && (
              <ItemDescription>{d.description}</ItemDescription>
            )}
            <ItemDescription>
              {sections.join(', ')}
              {d.versions?.length ? ` · ${d.versions.join(', ')}` : ''}
              {d.languages?.length ? ` · ${d.languages.join(', ')}` : ''}
            </ItemDescription>
            {links?.length ? (
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
                {cfg?.crowdin && (
                  <a
                    href={cfg.crowdin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
                  >
                    Crowdin
                  </a>
                )}
              </div>
            ) : null}
          </ItemContent>
        </Item>
        );
      })}
    </ItemGroup>
  );
}

export function SiteInfo({ view = 'sections', section }: SiteInfoProps) {
  if (view === 'datasets') return <DatasetsView section={section} />;
  return <SectionsView section={section} />;
}
