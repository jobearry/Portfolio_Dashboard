# 017 — Overview GitHub and Notion counts

Status: Done (interactive browser check pending)
Owner: agent
Related docs: `.github/docs/current-state.md`, `.github/docs/screens.md`,
`.github/rules/backend.md`

## Goal

Show the GitHub repository count and Notion page count as additional metric
cards on `/dashboard`, alongside the existing `v1/overview` metrics, with
independent loading, empty, and error handling per count.

## Scope

In:

- Add the GitHub owner to `site` config so it is not hardcoded in components.
- Add a single-resource signal service (mirroring `PortfolioSignalService`) for
  endpoints that return one object instead of a list.
- Fetch `v1/github/owner/{username}/repositories/count` and
  `v1/notion/{pageId}/count` in parallel with `v1/overview`.
- Render all five metrics in one responsive grid, with two columns on mobile and
  three from `lg`. The final card stays a normal one-column card.
- Give each count card its own loading, error, and retry state so one failure
  does not hide the rest of the overview.
- Update tests and documentation.

Out:

- Changing the existing `v1/overview` endpoint or response shape.
- Changing other dashboard routes.
- Adding a GitHub token or direct GitHub API calls to the frontend.
- Caching, polling, or pagination.

## Affected surface

- Routes: `/dashboard`
- Components: `pages/overview`, new `pages/overview/components/metric-card`,
  `shared/ui/skeleton`
- Services / models: new `ResourceSignalService<OverviewItem>`,
  `GithubCountSignalService`, `NotionCountSignalService`; reuse `OverviewItem`
- Endpoints: `GET v1/github/owner/{username}/repositories/count`,
  `GET v1/notion/{pageId}/count`
- Assets / config: `site.github.username`

## Tasks

- [x] Add `site.github.username` (`jobearry`) with a typed config interface.
- [x] Add `ResourceState<T>`, `ResourceSignalService<T>`, and `getResource`
      helper.
- [x] Register `GithubCountSignalService` and `NotionCountSignalService` typed as
      `OverviewItem`.
- [x] Add a presentational `MetricCard` component with loading, error, and retry
      states.
- [x] Add a `metric` skeleton variant.
- [x] Rewrite the Overview template with the agreed responsive grid and
      independent count cards. The Notion card does not span the full width.
- [x] Add camelCase/underscore-aware metric labels and count subtitles.
- [x] Update Overview tests for the three requests and the new cards.
- [x] Add a `ResourceSignalService` spec.
- [x] Update current-state, screens, and backend endpoint documentation.

## Risks / decisions

- Both count endpoints return `{ key, count }`, so `OverviewItem` is reused and
  no new response model is needed.
- The count cards are the only interactive controls on the page (retry only).
- `v1/overview` currently returns three keys. The final count card remains a
  normal one-column grid item, so the last row may contain a single card.
- The Notion count subtitle was changed to "Blog posts through my Notion
  workspace" at the user's request.
- Existing stale Overview layout assertion (`max-w-[56rem]`) is replaced with
  the new grid assertions.

## Verification

- [x] `npm run build`
- [x] `npm test` — 38/38 pass (includes the new Overview and resource-service specs).
- [x] `npm run lint`
- [x] `npm run format:check`
- [x] `/dashboard` serves from the existing dev server (HTTP 200) and its
      compiled bundle contains the new GitHub/Notion cards.
- [ ] Interactive browser check (2-column mobile, 3-column desktop, count error
      retry, keyboard focus) — no Browser MCP connection was available.

Status: Done (interactive browser check pending)
