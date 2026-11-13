import '@/lib/app-server';
import { authMode } from '@terrafirmagreg-team/auth';
import { analyticsEnabled } from '@terrafirmagreg-team/analytics/server';
import {
  commentsEnabled,
  feedbackEnabled,
} from '@terrafirmagreg-team/discussions/lib/comments/server';
import { shareEnabled } from '@terrafirmagreg-team/share';

export const dynamic = 'force-static';

export function GET() {
  return Response.json({
    analytics: analyticsEnabled(),
    share: shareEnabled(),
    feedback: feedbackEnabled(),
    comments: { enabled: commentsEnabled(), auth: authMode() },
  });
}
