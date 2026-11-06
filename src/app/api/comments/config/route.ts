import '@/lib/app-server';
import { authMode } from '@terrafirmagreg-team/auth';
import { commentsEnabled } from '@terrafirmagreg-team/discussions/lib/comments/server';

export function GET() {
  return Response.json({
    enabled: commentsEnabled(),
    auth: authMode(),
  });
}

