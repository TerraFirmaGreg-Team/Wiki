import { ViewCount } from '@terrafirmagreg-team/analytics';
import { Comments } from '@terrafirmagreg-team/discussions/components/comments-view';
import { Feedback } from '@terrafirmagreg-team/discussions/components/feedback/page';
import { FeedbackText } from '@terrafirmagreg-team/discussions/components/feedback/block';
import { feedbackEnabled } from '@terrafirmagreg-team/discussions/lib/comments/server';
import {
  onBlockFeedbackAction,
  onPageFeedbackAction,
} from '@terrafirmagreg-team/discussions/lib/feedback';
import { GitChangelog, GitContributors } from 'fumadocs-page-history/ui';
import {
  shouldShowChangelog,
  shouldShowContributors,
} from 'fumadocs-page-history';
import { resolveAuthors } from 'fumadocs-page-history/git';
import { createHistoryLoader } from '@terrafirmagreg-team/history/lib/history';
import { datasetConfig } from '@/config/datasets';
import { gitConfig } from '@/config/sections';
import type {
  DocsBrowserFeatures,
  DocsPageContext,
} from '@terrafirmagreg-team/docs/components/views/browser';

const repositoryUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;
const readPageHistory = createHistoryLoader({
  repository: { url: repositoryUrl },
  github: { token: process.env.GITHUB_TOKEN },
});

async function DocsFooter({ ctx }: { ctx: DocsPageContext }) {
  const showChangelog =
    ctx.history !== false && shouldShowChangelog(ctx.page.data);
  const showContributors =
    ctx.history !== false && shouldShowContributors(ctx.page.data);
  const commits =
    showChangelog || showContributors
      ? await readPageHistory(ctx.filePath)
      : [];
  const authors = ctx.page.data.authors?.length
    ? resolveAuthors(ctx.page.data.authors)
    : undefined;
  const datasetRepo = ctx.datasetId
    ? datasetConfig[ctx.datasetId]?.repo
    : undefined;
  const changelogRepoUrl = datasetRepo
    ? `https://github.com/${datasetRepo}`
    : repositoryUrl;
  return (
    <>
      {feedbackEnabled() ? (
        <Feedback onSendAction={onPageFeedbackAction} />
      ) : null}
      {showChangelog ? (
        <GitChangelog
          commits={commits}
          authors={authors}
          locale={ctx.page.locale}
          showContributors={showContributors}
          repository={{ url: changelogRepoUrl }}
        />
      ) : showContributors ? (
        <GitContributors
          commits={commits}
          authors={authors}
          locale={ctx.page.locale}
        />
      ) : null}
    </>
  );
}

export const docsFeatures: DocsBrowserFeatures = {
  fileUrl: (filePath) =>
    `https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/${filePath}`,
  actionsRight: () => (
    <ViewCount className="ms-auto inline-flex items-center gap-1.5 text-sm text-muted-foreground tabular-nums" />
  ),
  wrapBody: (body) =>
    feedbackEnabled() ? (
      <FeedbackText onSendAction={onBlockFeedbackAction}>
        <div data-md-root className="contents">
          {body}
        </div>
      </FeedbackText>
    ) : (
      <div data-md-root className="contents">
        {body}
      </div>
    ),
  footer: (ctx) => <DocsFooter ctx={ctx} />,
  comments: () => <Comments />,
};
