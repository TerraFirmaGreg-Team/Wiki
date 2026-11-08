import '@/lib/app-server';
import { isSectionKey } from '@terrafirmagreg-team/sites/location';
import { sectionDatasets } from '@terrafirmagreg-team/kit/lib/datasets';
import { sections } from '@terrafirmagreg-team/kit/lib/sources';
import {sectionTabs} from '@terrafirmagreg-team/sites';
import { notFound } from 'next/navigation';
import { generateOGImage } from '@terrafirmagreg-team/preview/components/og';
import {appName} from '@/config/sections';
import type { PreviewRouteContext } from '@/types/routes';
import type { SectionPage } from '@terrafirmagreg-team/kit/types';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: PreviewRouteContext,
) {
  const { slug } = await params;
  const [sectionName, datasetId, ...rest] = slug ?? [];
  const section = isSectionKey(sectionName) ? sectionName : undefined;
  if (rest[rest.length - 1] !== 'image.png' || !section) notFound();
  const dataset = (await sectionDatasets(section)).find(
    (d) => d.id === datasetId,
  );
  if (!dataset) notFound();

  const pageSlugs = rest.slice(0, -1);
  let title = dataset.title ?? dataset.id;
  let description = dataset.description;
  if (pageSlugs.length) {
    const page = (await sections[section]?.getSource())?.getPage([
      dataset.id,
      ...pageSlugs,
    ]) as SectionPage | undefined;
    if (!page?.data) notFound();
    title = page.data.title;
    description = page.data.description ?? description;
  }

  return generateOGImage({
    title,
    description,
    site: appName,
  });
}

export async function generateStaticParams() {
  const rows = await Promise.all(
    sectionTabs.map(async ({ key }) => {
      if (!sections[key]) return [];
      const pages = (await sections[key]!.getSource()).getPages();
      const used = new Set(pages.map((page) => page.slugs[0]));
      return (await sectionDatasets(key))
        .filter((dataset) => used.has(dataset.id))
        .flatMap((dataset) => [
          { slug: [key, dataset.id, 'image.png'] },
          ...pages
            .filter((page) => page.slugs[0] === dataset.id)
            .map((page) => ({
              slug: [key, ...page.slugs, 'image.png'],
            })),
        ]);
    }),
  );
  return rows.flat();
}

