import type { NextRequest } from 'next/server';
import '@/lib/app-server';
import { createCommentsRouter } from '@terrafirmagreg-team/discussions/lib/comments/server';
import {siteUrl} from '@/config/sections';
import { cachedResponse } from '@terrafirmagreg-team/data/lib/cache-api';

const router = createCommentsRouter({ siteUrl });

type RouteCtx = { params: Promise<{ comment: string[] }> };

const disabled = () =>
  Response.json({ message: 'Comments disabled' }, { status: 404 });

export const GET = router
  ? (req: NextRequest, ctx: RouteCtx) =>
      req.headers.get('cookie')
        ? router.GET(req, ctx)
        : cachedResponse(req, 60, () => router.GET(req, ctx))
  : disabled;
export const POST = router?.POST ?? disabled;
export const PATCH = router?.PATCH ?? disabled;
export const DELETE = router?.DELETE ?? disabled;

