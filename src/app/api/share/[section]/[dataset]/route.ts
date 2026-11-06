import '@/lib/app-server';
import { resolveDatasetMeta } from '@terrafirmagreg-team/kit/lib/datasets';
import {
  datasetRef,
  isSectionKey,
  parseDatasetRef,
} from '@terrafirmagreg-team/sites/location';
import { putShare } from '@terrafirmagreg-team/share';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ section: string; dataset: string }> },
) {
  const { section, dataset } = await params;
  const body = (await req.json().catch(() => null)) as {
    tree?: unknown;
  } | null;
  const parsed = parseDatasetRef(decodeURIComponent(dataset));
  const meta = isSectionKey(section)
    ? await resolveDatasetMeta(section, parsed)
    : undefined;
  if (!meta || typeof body?.tree !== 'string')
    return Response.json({ error: 'invalid tree' }, { status: 400 });

  const pinned = datasetRef(parsed.id, parsed.version ?? meta.versions?.[0]);
  const shareId = await putShare(section, pinned, body.tree);
  if (!shareId) return Response.json({ error: 'invalid tree' }, { status: 400 });
  return Response.json({ id: shareId, dataset: pinned });
}

