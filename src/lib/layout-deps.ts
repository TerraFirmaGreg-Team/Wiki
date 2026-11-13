'use client';
import { registerLayoutDeps } from '@terrafirmagreg-team/kit/lib/config';
import { useTrackView } from '@terrafirmagreg-team/analytics';
import { useCommentsMenuItem } from '@terrafirmagreg-team/discussions/hooks/comments/use-menu-item';
import { useFeatureFlags } from '@terrafirmagreg-team/kit/hooks/use-features';
import { registerChangelogDeps } from '@terrafirmagreg-team/changelog/lib/config';
import { clientDumpLangNames } from '@terrafirmagreg-team/dump/lib/dump/client/dump';
import { loadChangelogEntries, loadSectionTree } from '@/lib/actions';

function useTrackViewGated(path: string, apiUrl?: string) {
  const flags = useFeatureFlags();
  useTrackView(flags?.analytics ? path : '', apiUrl);
}

registerLayoutDeps({
  trackView: useTrackViewGated,
  commentsMenuItem: useCommentsMenuItem,
  loadSectionTree,
  warmLang(dataset, lang) {
    void clientDumpLangNames(dataset, lang).catch(() => {});
  },
});
registerChangelogDeps({ loadEntries: loadChangelogEntries });
