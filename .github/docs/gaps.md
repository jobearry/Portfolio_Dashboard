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

## Navigation and layout

- **Blank header title on reload.** `pagename` is empty until a sidebar item is
  clicked; it is not derived from the active route. It also does not reset or
  update on browser back/forward, or on direct URL entry. (006)
- **No active-link state.** The sidebar has no `routerLinkActive` styling. (006)
- **Profile is not in the sidebar menu.** It is reachable only through the
  avatar card or by typing `/profile`. Locked decision: avatar dropdown, not a
  menu item. (006)
- **No route-level titles** on child routes (only the shell has a title). (006)
- **No default redirect** for the root path; it depends on the child wildcard
  matching the empty segment. (006)
- **Sidebar footer is empty** (dead space). (006)
- **No theme toggle.** `index.html` hardcodes `class="dark"`. (004/006)

## Dashboard / Overview

- Card data is entirely server-driven; an empty response now shows an empty
  state, but there is no static fallback.
- The header still uses the Spartan `hlmH1` directive and hardcoded copy. (007)

## Timeline

- **Read-only and non-interactive.** No expansion, links, or dialog.
- `experience.duration.startedAt` is rendered with `DatePipe`; if the API returns
  a non-date string, the year renders empty. (007)
- Empty list now shows a message; no empty nested-projects block is rendered.

## Profile

- **Personal content is hardcoded in the template**: name, handle, bio, GitHub
  URL, CV Google Drive URL, avatar filename. (005)
- No link to email/LinkedIn or any contact form.
- The badges are external shields.io images; they will not render offline. (007)
- `HlmH3` is used for the name and must be replaced with Tailwind typography.
  (007)

## Blog

- **Hardcoded Notion page ID** in `Blog` and **hardcoded public domain** in
  `notion.constants.ts`. (005, decided: typed config module)
- A `null` or empty response now shows an empty state instead of a blank grid.
- No pagination, filtering, search, or post preview/excerpt.

## Data layer

- No interceptors, retries, timeouts, or cancellation.
- All services are `providedIn: 'root'`, so state persists across navigation and
  pages re-fetch on every visit.
- No cache or shared store; each component fetches independently.
- No request/response typing beyond generics; runtime shape is assumed.

## Dead code and cleanup remaining (008)

- Unused constants: `PORTFOLIO_CONTROLS`, `Result<T>`, `PortfolioItems`.
- Unused icon registrations: `lucideInfo`, `lucideToolCase`, `lucideLibraryBig`,
  `lucideDrill`, `lucideFileDown`; `lucideUserCircle` is registered twice.
- `libs/ui` libraries not imported anywhere: `sheet`, `scroll-area`, `separator`,
  `tooltip`.
- Overlapping style constants (`common.styles.ts` vs `portfolio.styles.ts`).
- `Maintenance` is retained intentionally for now.
- `libs/ui`, `components.json`, and `@spartan-ng/*` are still installed until
  008.

## Tooling / fixtures

- **ESLint** is configured (`eslint.config.js`, `npm run lint`) with
  conservative rules; `libs/ui` is excluded until 008.
- **Prettier** is configured (`.prettierrc`, `format` / `format:check`), and all
  of `src/` is formatted.
- **CI** runs lint → format check → build → test on PRs and `main` pushes
  (`.github/workflows/ci.yml`).
- **Tests** cover shell routing, the portfolio service error contract, and the
  overview states. Screen component tests arrive with 007.
- **Environment generation:** `scripts/genenv.js` overwrites
  `src/environments/*.ts` on `start`/`build` from `.env`; missing `.env` values
  produce an empty `portfolioApi`, which yields relative `/v1/...` calls. CI does
  not need `.env` because the build only compiles.
- **Hardcoded dark mode** until 004.

## Decisions for the Tailwind-only rewrite

1. **Legacy features:** dropped permanently (`bak` screens and dialog deleted).
2. **Routes:** unchanged URLs; light refresh only.
3. **Profile:** reachable from the avatar dropdown; not a sidebar menu item.
4. **Header title:** derived from the route, with active-link styling. (006)
5. **Overview "View Details":** removed. (002)
6. **Error/empty states:** introduced in 002 and refined per screen in 007.
7. **Icons:** keep `@ng-icons/lucide`; drop the `HlmIcon` wrapper.
8. **Design tokens:** own Tailwind `@theme` tokens replacing the Spartan preset.
   (004)
9. **Sidebar behavior:** reimplement collapse and mobile overlay in plain
   Tailwind. (006)
10. **Notion config:** typed config module (decided). (005)
