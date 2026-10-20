# Gaps, Bugs, and Open Decisions

Known issues in the current app and questions to resolve while rewriting.

## Resolved in 002 (baseline runtime)

- **`HttpClient` provider** — `provideHttpClient(withFetch())` is registered in
  `app.config.ts`.
- **No error handling** — `PortfolioSignalService` and `NotionSignalService` now
  catch failures, exit the loading state, and expose a user-safe message.
- **Stuck skeletons** — every data screen renders a shared error block with a
  **Try again** action when a request fails, and an empty state when a request
  succeeds with no rows.
- **Overview "View Details →"** — removed; the cards are informational. The
  invalid `<button>` inside `<button>` nesting is gone.
- **`console.log`** — removed from the base service and the shell.
- **Dead code** — `features/dashboard/bak/**`, `ProjectDialog`, `Card`, `Item`,
  `SectionButton`, `SkeletonCard`, and `ProjectSignalService` are deleted. The
  commented legacy route block is gone.
- **Stale test** — the assertion for the never-rendered
  `"Hello, Portfolio_Dashboard"` text is removed. 003 adds real shell/routing
  tests.

## Resolved in 005 (site config)

- **Hardcoded personal content** — name, handle, role, bio, GitHub/CV URLs, and
  avatar filenames come from `site` (`core/config/site.config.ts`).
- **Hardcoded Notion values** — page ID and public domain come from
  `site.notion`; the blog feature contains no literal.

## Resolved in 006 (shell)

- **Route-driven header title** — read from the deepest route's `data.pageTitle`,
  correct on first load, reload, deep links, and back/forward.
- **Active-link state** — `routerLinkActive` (exact) plus `aria-current="page"`.
- **Route-level titles** — every child sets a branded document title.
- **Default redirect** — explicit empty-path redirect to `/dashboard`.
- **Sidebar footer** — now holds the desktop collapse/expand control.
- **Profile access** — avatar dropdown with View profile, Download CV, and the
  theme toggle.
- **Mobile navigation** — off-canvas panel with overlay, close on navigate,
  overlay click, Escape, body scroll lock, and focus return to the trigger.
- **Collapse persistence** — desktop rail state survives reloads
  (`portfolio-sidebar-collapsed`).

## Resolved in 007 (screens)

- **Spartan removed from the four screens** — `hlmH1`, `hlmH3`, `HlmIcon`, and
  `SkeletonItem` are no longer used by Overview, Timeline, Profile, or Blog.
- **Overview header** — the name comes from `site.profile.name`; no hardcoded
  "Than" copy.
- **Timeline dates** — `startedAt` is parsed defensively; a missing or invalid
  date hides the year pill instead of rendering an empty/`Invalid Date` value.
- **Profile links** — shields.io badges replaced by themed icon + text buttons
  (GitHub outline, CV accent), so they work offline and in both themes.
- **Profile skills** — responsive one/two-column layout with `break-words`; no
  more clipped "TailwindCSS" at narrow widths.
- **Blog entries** — plain `ng-icon`, Tailwind hover/focus lift with a
  `motion-reduce` fallback, and a screen-reader new-tab hint.
- **Loading** — one shared `app-skeleton` with `text`, `card`, `list`, `grid`, and
  `entries` variants; the Spartan skeleton component is deleted.
- **Cleanup** — `common.styles.ts`, `portfolio.styles.ts`, and the unused
  portfolio icon/control constants are deleted; components register only the
  icons they use.

## Navigation and layout

- **Profile is not in the sidebar menu** — intentional; it is reachable from the
  avatar dropdown (locked decision).
- **No sidebar keyboard shortcut** — the Spartan version registered one; the
  plain shell does not. Not planned unless requested.
- **Desktop collapse only** — the mobile panel always opens full width.

## Dashboard / Overview

- Card data is entirely server-driven; an empty response now shows an empty
  state, but there is no static fallback.

## Timeline

- **Read-only and non-interactive.** No expansion, links, or dialog.
- Empty list now shows a message; no empty nested-projects block is rendered.

## Profile

- No link to email/LinkedIn or any contact form.

## Blog

- A `null` or empty response now shows an empty state instead of a blank grid.
- No pagination, filtering, search, or post preview/excerpt.

## Data layer

- No interceptors, retries, timeouts, or cancellation.
- All services are `providedIn: 'root'`, so state persists across navigation and
  pages re-fetch on every visit.
- No cache or shared store; each component fetches independently.
- No request/response typing beyond generics; runtime shape is assumed.

## Dead code and cleanup remaining (008)

- `libs/ui` libraries not imported anywhere: `sheet`, `scroll-area`, `separator`,
  `tooltip`.
- `Maintenance` is retained intentionally for now and is the last component that
  still imports `@spartan-ng/helm/icon`.
- `libs/ui`, `components.json`, and `@spartan-ng/*` are still installed until 008.

## Tooling / fixtures

- **ESLint** is configured (`eslint.config.js`, `npm run lint`) with
  conservative rules; `libs/ui` is excluded until 008.
- **Prettier** is configured (`.prettierrc`, `format` / `format:check`), and all
  of `src/` is formatted.
- **CI** runs lint → format check → build → test on PRs and `main` pushes
  (`.github/workflows/ci.yml`).
- **Tests** cover shell routing, the shell state service, the user menu
  (keyboard/theme), the portfolio service error contract, theme behavior (OS
  preference, stored override, persistence), and the Overview, Timeline, and Blog
  screens (states, config header, date guard, URL rewrite).
- **Environment generation:** `scripts/genenv.js` overwrites
  `src/environments/*.ts` on `start`/`build` from `.env`; missing `.env` values
  produce an empty `portfolioApi`, which yields relative `/v1/...` calls. CI does
  not need `.env` because the build only compiles.
- **Theme:** own `@theme` tokens replace the Spartan preset (004). Light and
  dark are both verified on every screen; the toggle lives in the avatar
  dropdown (006).

## Decisions for the Tailwind-only rewrite

1. **Legacy features:** dropped permanently (`bak` screens and dialog deleted).
2. **Routes:** unchanged URLs; light refresh only.
3. **Profile:** reachable from the avatar dropdown; not a sidebar menu item.
4. **Header title:** derived from the route, with active-link styling. (006)
5. **Overview "View Details":** removed. (002)
6. **Error/empty states:** introduced in 002 and applied to every data screen;
   each screen styles them with the shared `StateMessage` (007).
7. **Icons:** keep `@ng-icons/lucide`; the `HlmIcon` wrapper remains only in
   `Maintenance` until 008.
8. **Design tokens:** own Tailwind `@theme` tokens replacing the Spartan preset.
   (004)
9. **Sidebar behavior:** reimplemented collapse and mobile overlay in plain
   Tailwind. (006)
10. **Notion config:** typed config module (decided). (005)
