import {
  datasetRef,
  parseDatasetRef,
} from '@terrafirmagreg-team/sites/location';
import { getShare } from '@terrafirmagreg-team/share';

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ section: string; dataset: string; id: string }>;
  },
) {
  const { section, dataset, id } = await params;
  const parsed = parseDatasetRef(decodeURIComponent(dataset));
  const version = new URL(req.url).searchParams.get('version') ?? undefined;
  const tree = await getShare(
    section,
    datasetRef(parsed.id, parsed.version ?? version),
    id,
  );
  if (!tree) return Response.json({ error: 'not found' }, { status: 404 });
  return Response.json({ tree });
}

