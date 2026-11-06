'use client';
import { registerLayoutDeps } from '@terrafirmagreg-team/kit/lib/config';
import { useTrackView } from '@terrafirmagreg-team/analytics';
import { useCommentsMenuItem } from '@terrafirmagreg-team/discussions/hooks/comments/use-menu-item';

registerLayoutDeps({
  trackView: useTrackView,
  commentsMenuItem: useCommentsMenuItem,
});
