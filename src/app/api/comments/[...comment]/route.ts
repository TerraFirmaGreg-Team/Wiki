import type { NextRequest } from 'next/server';
import '@/lib/app-server';
import {
  commentsEnabled,
  createCommentsRouter,
} from '@terrafirmagreg-team/discussions/lib/comments/server';
import {siteUrl} from '@/config/sections';
import { cachedResponse } from '@terrafirmagreg-team/data/lib/cache-api';

const router = createCommentsRouter({ siteUrl });

type RouteCtx = { params: Promise<{ comment: string[] }> };

export const GET = async (req: NextRequest, ctx: RouteCtx) =>
  (await ctx.params).comment.join('/') === 'config'
    ? Response.json({ enabled: commentsEnabled() })
    : req.headers.get('cookie')
      ? router.GET(req, ctx)
      : cachedResponse(req, 60, () => router.GET(req, ctx));
export const POST = router.POST;
export const PATCH = router.PATCH;
export const DELETE = router.DELETE;

