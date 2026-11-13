import { datasetRef } from '@terrafirmagreg-team/sites/location';
import { getShare, shareEnabled } from '@terrafirmagreg-team/share';
import { cachedResponse } from '@terrafirmagreg-team/data/lib/cache-api';

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ section: string; dataset: string; id: string }>;
  },
) {
  if (!shareEnabled())
    return Response.json({ error: 'disabled' }, { status: 404 });
  return cachedResponse(req, 31536000, async () => {
    const { section, dataset, id } = await params;
    const version = new URL(req.url).searchParams.get('version') ?? undefined;
    const tree = await getShare(
      section,
      datasetRef(decodeURIComponent(dataset), version),
      id,
    );
    if (!tree) return Response.json({ error: 'not found' }, { status: 404 });
    return Response.json({ tree });
  });
}

