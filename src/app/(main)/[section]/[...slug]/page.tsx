import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isSectionKey } from '@terrafirmagreg-team/sites/location';
import { sectionRoutes } from '@/lib/section-routes';

export const revalidate = 60;

type Props = {
  params: Promise<{ section: string; slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { section, slug } = await props.params;
  if (!isSectionKey(section)) return {};
  return sectionRoutes[section].generateMetadata({
    params: Promise.resolve({ slug }),
  });
}

export async function generateStaticParams() {
  const params = await Promise.all(
    Object.entries(sectionRoutes).map(async ([section, routes]) =>
      (await routes.generateStaticParams()).map((p) => ({ ...p, section })),
    ),
  );
  return params.flat();
}

export default async function Page(props: Props) {
  const { section, slug } = await props.params;
  if (!isSectionKey(section)) notFound();
  return sectionRoutes[section].Page({
    params: Promise.resolve({ slug }),
    searchParams: props.searchParams,
  });
}
