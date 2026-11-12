'use client';
import { usePathname } from 'next/navigation';
import { isSectionKey } from '@terrafirmagreg-team/sites/location';
import { SectionNotFound } from '@terrafirmagreg-team/kit/components/views/not-found';
import { useSectionCatalog } from '@terrafirmagreg-team/kit/hooks/use-catalog';
import { notFound } from 'next/navigation';

export default function NotFound() {
  const section = usePathname().split('/').filter(Boolean)[0];
  const catalog = useSectionCatalog();
  if (!isSectionKey(section)) notFound();
  return (
    <SectionNotFound section={section} datasets={catalog[section] ?? []} />
  );
}
