import '@/lib/og-server';
import { notFound } from 'next/navigation';
import {
  ogBrandLogo,
  ogImageResponse,
  ogStaticParams,
} from '@terrafirmagreg-team/preview/server';
import { appName, siteUrl } from '@/config/sections';
import type { PreviewRouteContext } from '@/types/routes';
import { join } from 'node:path';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: PreviewRouteContext,
) {
  const { slug } = await params;
  const image = await ogImageResponse(slug, {
    site: appName,
    siteUrl,
    logo: await ogBrandLogo(join(process.cwd(), 'src/app/icon.png')),
  });
  if (!image) notFound();
  return image;
}

export async function generateStaticParams() {
  return ogStaticParams();
}
