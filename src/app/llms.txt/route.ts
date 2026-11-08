import '@/lib/app-server';
import { siteUrl } from '@/config/sections';
import { sections } from '@terrafirmagreg-team/kit/lib/sources';
import { sectionDatasets } from '@terrafirmagreg-team/kit/lib/datasets';
import { toPublicSlug } from '@terrafirmagreg-team/translate/lib/slug';
import type { SectionKey } from '@/types/section';

export const dynamic = 'force-static';

const SECTION_TITLES: Record<string, string> = {
  docs: 'Docs',
  guide: 'Guide',
  quest: 'Quest',
  recipe: 'Recipe',
  changelog: 'Changelog',
};

export async function GET() {
  const lines = [
    '# Wiki',
    '',
    '> TerraFirmaGreg documentation and gameplay guides. Every docs and changelog page is also available as Markdown by appending `.md` to its URL.',
    '',
  ];

  for (const key of Object.keys(sections) as SectionKey[]) {
    const section = sections[key];
    if (!section) continue;
    const languages = new Set(
      (await sectionDatasets(key)).flatMap((dataset) =>
        (dataset.languages ?? []).filter((lang): lang is string => Boolean(lang)),
      ),
    );
    lines.push(`## ${SECTION_TITLES[key] ?? key}`);
    for (const page of (await section.getSource()).getPages()) {
      const path = `/${key}/${toPublicSlug(page.slugs, [...languages]).join('/')}`;
      const title =
        (page.data as { title?: string } | undefined)?.title ?? path;
      lines.push(`- [${title}](${siteUrl}${path}.md)`);
    }
    lines.push('');
  }

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
