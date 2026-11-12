import { isSectionKey } from '@terrafirmagreg-team/sites/location';
import { notFound } from 'next/navigation';
import { sectionRoutes } from '@/lib/section-routes';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ section: string }> },
) {
  const { section } = await params;
  if (!isSectionKey(section)) notFound();
  return sectionRoutes[section].Redirect(request);
}
