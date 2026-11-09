'use client';
import { registerLayoutDeps } from '@terrafirmagreg-team/kit/lib/config';
import { useTrackView } from '@terrafirmagreg-team/analytics';
import { useCommentsMenuItem } from '@terrafirmagreg-team/discussions/hooks/comments/use-menu-item';
import { useFeatureFlags } from '@terrafirmagreg-team/kit/hooks/use-features';

function useTrackViewGated(path: string, apiUrl?: string) {
  const flags = useFeatureFlags();
  useTrackView(flags?.analytics ? path : '', apiUrl);
}

registerLayoutDeps({
  trackView: useTrackViewGated,
  commentsMenuItem: useCommentsMenuItem,
});
