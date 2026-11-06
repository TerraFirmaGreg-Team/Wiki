import '@/lib/app-server';
import { isSectionKey } from '@terrafirmagreg-team/sites/location';
import { sectionDatasets } from '@terrafirmagreg-team/kit/lib/datasets';
import { sections } from '@terrafirmagreg-team/kit/lib/sources';
import {sectionTabs} from '@terrafirmagreg-team/sites';
import { notFound } from 'next/navigation';
import { generateOGImage } from '@terrafirmagreg-team/preview/components/og';
import {appName} from '@/config/sections';
import type { PreviewRouteContext } from '@/types/routes';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: PreviewRouteContext,
) {
  const { slug } = await params;
  const [sectionName, datasetId, file] = slug ?? [];
  const section = isSectionKey(sectionName) ? sectionName : undefined;
  const dataset = section
    ? (await sectionDatasets(section)).find((d) => d.id === datasetId)
    : undefined;
  if (file !== 'image.png' || !dataset) notFound();

  return generateOGImage({
    title: dataset.title ?? dataset.id,
    description: dataset.description,
    site: appName,
  });
}

export async function generateStaticParams() {
  const rows = await Promise.all(
    sectionTabs.map(async ({ key }) => {
      const used = new Set(
        sections[key]
          ? (await sections[key]!.getSource())
              .getPages()
              .map((page) => page.slugs[0])
          : [],
      );
      return (await sectionDatasets(key))
        .filter((dataset) => used.has(dataset.id))
        .map((dataset) => ({ slug: [key, dataset.id, 'image.png'] }));
    }),
  );
  return rows.flat();
}

