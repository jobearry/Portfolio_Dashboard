# 002 — Baseline runtime and dead code

Status: Done
Owner: Jonathan Golimlim
Depends on: 001
Related docs: `.github/docs/gaps.md`, `.github/docs/current-state.md`

## Goal

Make the app actually talk to the API, never leave a skeleton running forever,
and delete the dead code that drags Spartan imports into every later phase.

Nothing in this phase is cosmetic. No tokens, no restyling, no shell rewrite.

## Scope

**In:**

- Register `HttpClient`.
- Error handling in the shared portfolio service.
- A minimal shared error / empty state used by the four data screens.
- Remove `console.log` from services and shell.
- Remove the overview "View Details →" buttons and the nested `<button>`.
- Delete un-routed legacy screens and unused components.
- Remove the commented-out legacy route block.

**Out:**

- Theme, tokens, shell, screen redesign (004–007).
- Deleting `libs/ui`, `components.json`, Spartan packages (008).
- Retry / timeout / interceptor work beyond the per-screen retry button.

## Affected surface

- `src/app/app.config.ts`
- `src/app/shared/services/portfolio-base.service.ts`
- `src/app/shared/services/portfolio.service.ts`
- `src/app/shared/store/portfolio.state.ts`
- `src/app/shared/utils/error.util.ts` (new)
- `src/app/shared/ui/state-message/state-message.ts` (new)
- `src/app/features/dashboard/shell/dashboard.ts`
- `src/app/features/dashboard/pages/overview/*`
- `src/app/features/dashboard/pages/timeline/timeline.ts`
- `src/app/features/dashboard/pages/profile/components/*`
- `src/app/features/dashboard/pages/blog/*` (component, template, store)
- Delete: `features/dashboard/bak/**`, `components/dialog/project-dialog.ts`,
  `components/card/**`, `components/item/item.ts`,
  `components/button/section-button.ts`, `components/skeletons/card/skeleton-card.ts`
- `src/app/components/index.ts`, `src/app/app.routes.ts`
- Tests: `app.spec.ts`, new `portfolio-base.service.spec.ts`,
  new `overview.spec.ts`

## Tasks

- [x] Add `provideHttpClient(withFetch())` to `app.config.ts`.
- [x] `PortfolioSignalService.getPortfolioResource`: wrap the request in
      `try/catch`; on failure set `loading: false` and a human-readable error;
      never leave `loading: true`.
- [x] Replace the unused `message` field with `error: string | null` in
      `PortfolioState` (and the Notion state).
- [x] Ensure each page's `ngOnInit` awaits the service and does not throw
      unhandled.
- [x] Create the shared `StateMessage` component (plain Tailwind,
      `role="alert"` for errors, `role="status"` for empty, no Spartan).
- [x] Wire it into overview, timeline, profile (both sections), and blog.
- [x] Add a **Try again** action that re-runs the failed request.
- [x] Remove `console.log` from `portfolio-base.service.ts`, `dashboard.ts`, and
      anywhere else in `src/`.
- [x] Overview: replace the outer `<button>` with `<article>`, delete the inner
      "View Details →" button.
- [x] Delete `features/dashboard/bak/**` and the unused components listed above.
- [x] Delete `ProjectSignalService`.
- [x] Update barrels and remove the commented legacy route block.
- [x] Keep `Maintenance` and `SkeletonItem` (used until 007).
- [x] Remove the stale `should render title` assertion from `app.spec.ts`.

## Deviations / decisions recorded during implementation

- **Test change pulled forward:** the stale assertion was deleted here instead
  of waiting for 003, so `npm test` is green at the end of 002. 003 still owns
  the real shell/routing tests.
- **New tests added in 002:** `portfolio-base.service.spec.ts` covers the
  success, server-error, and unreachable-API paths; `overview.spec.ts` covers
  error, empty, and success rendering. Both use Angular's built-in
  `provideHttpClientTesting` (no new dependency).
- **Navbar title still click-driven.** Fixing it requires the route titles that
  land in 006, so `pagename` remains for now; only the `console.log` was
  removed.
- **API host unreachable from the dev machine** at implementation time, so the
  data-render path was verified with unit tests and the error path was verified
  in headless Chromium (see verification).

## Verification

- [x] `npm run build` — passes.
- [x] `npm test` — 7 tests pass.
- [x] All four routes serve and render: `/dashboard`, `/timeline`, `/profile`,
      `/blog`.
- [x] With the API unreachable: `/dashboard`, `/timeline`, `/blog`, and the
      wildcard redirect each render one error alert with **Try again**;
      `/profile` renders two (recommendations + skills). No skeleton remains.
- [x] Overview cards are `<article>` elements with no `<button>` and no
      "View Details".
- [x] `grep -rn "console.log" src/` returns nothing.
- [x] `grep -rn "bak/\|ProjectDialog\|SectionButton\|SkeletonCard\|ProjectSignalService" src/`
      returns nothing.
- [x] No new `@spartan-ng` import was introduced.

## Exit criteria

The app is runtime-correct and the dead surface is gone. Later phases can assume
data screens have loading / empty / error states.
