import '@/lib/app-server';
import { resolveDatasetMeta } from '@terrafirmagreg-team/kit/lib/datasets';
import {
  datasetRef,
  isSectionKey,
} from '@terrafirmagreg-team/sites/location';
import { putShare, shareEnabled } from '@terrafirmagreg-team/share';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ section: string; dataset: string }> },
) {
  if (!shareEnabled())
    return Response.json({ error: 'disabled' }, { status: 404 });
  const { section, dataset } = await params;
  const body = (await req.json().catch(() => null)) as {
    tree?: unknown;
  } | null;
  const ref = datasetRef(decodeURIComponent(dataset));
  const meta = isSectionKey(section)
    ? await resolveDatasetMeta(section, ref)
    : undefined;
  if (!meta || typeof body?.tree !== 'string')
    return Response.json({ error: 'invalid tree' }, { status: 400 });

  const pinned = datasetRef(ref.id, ref.version ?? meta.versions?.[0]);
  const shareId = await putShare(section, pinned, body.tree);
  if (!shareId) return Response.json({ error: 'invalid tree' }, { status: 400 });
  return Response.json({ id: shareId, dataset: pinned });
}

