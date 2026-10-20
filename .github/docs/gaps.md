# Gaps, Bugs, and Open Decisions

Known issues in the current app and questions to resolve before/while rewriting.

## Critical

### 1. Missing `HttpClient` provider (critical)

`ApiClient` injects `HttpClient`, but `app.config.ts` never calls
`provideHttpClient()`. Any page that constructs an entity service will throw
`NullInjectorError: No provider for HttpClient`. This means the live data screens
(`/dashboard`, `/timeline`, `/profile`, `/blog`) cannot render today.

**Fix in rewrite:** add `provideHttpClient(withFetch())` to the app config.

### 2. No error handling on requests

`getContent()` does not catch errors. A failed request leaves `loading: true`
forever, so the skeleton is displayed indefinitely. There are no error, empty, or
retry states anywhere.

## Navigation and layout

- **Blank header title on reload.** `pagename` is empty until a sidebar item is
  clicked; it is not derived from the active route. It also does not reset or
  update on browser back/forward, or on direct URL entry.
- **No active-link state.** The sidebar has no `routerLinkActive` styling.
- **Profile is not in the sidebar menu.** It is reachable only through the
  avatar card or by typing `/profile`.
- **No route-level titles** on child routes (only the shell has a title).
- **No default redirect** for the root path; it depends on the child wildcard
  matching the empty segment.
- **Sidebar footer is empty** (dead space).

## Dashboard / Overview

- **"View Details →" does nothing.** No click handler, no route, no modal.
- **Invalid nesting:** `<button>` inside `<button>` for each overview card.
- Card data is entirely server-driven; no static fallback if the API returns an
  empty list.

## Timeline

- **Read-only and non-interactive.** No expansion, links, or dialog.
- Nested projects duplicate behavior that the legacy experience page implemented
  through a dialog (dead code now).
- `experience.duration.startedAt` is rendered with `DatePipe`; if the API returns
  a non-date string, the year renders empty.
- Projects are conditionally rendered but there is no empty-state message.

## Profile

- **No CRUD/editing** anywhere, despite the README describing a dashboard for
  updating the resume.
- Personal content is hardcoded in the template: name, handle, bio, GitHub URL,
  CV Google Drive URL, avatar filename (`jg-profile.png`).
- No link to email/LinkedIn or any contact form.
- The badges are external shields.io images; they will not render offline.
- `HlmH3` is imported in `skill.ts` but unused.

## Blog

- **Hardcoded Notion page ID** (`16348b6ae5dd8032b137c4327f9ab77c`) in
  `Blog.ngOnInit`.
- **Hardcoded Notion public domain** (`glamorous-monitor-0b1.notion.site`).
- If the API returns `null` content, the grid renders nothing silently.
- No pagination, filtering, search, or post preview/excerpt.
- No error state if the Notion fetch fails.

## Data layer

- No interceptors, retries, timeouts, or cancellation.
- `console.log` left in `PortfolioSignalService.getPortfolioResource` and
  `Dashboard.onItemClickHandler`, plus a commented-out dialog log.
- All services are `providedIn: 'root'`, so state persists across navigation and
  pages re-fetch on every visit (except Project).
- No cache or shared store; each component fetches independently.
- No request/response typing beyond generics; runtime shape is assumed.

## Dead code and legacy

- `src/app/features/dashboard/bak/**` — three un-routed screens plus a commented
  route block in `app.routes.ts`.
- Unused components: `Card`, `Item`, `SectionButton`, `SkeletonCard`,
  `Maintenance`, `ProjectDialog`.
- Unused constants: `PORTFOLIO_CONTROLS`, `Result<T>`, `PortfolioItems` (only in
  legacy code).
- Unused icon registrations: `lucideInfo`, `lucideToolCase`, `lucideLibraryBig`,
  `lucideDrill`, `lucideFileDown`; `lucideUserCircle` is registered twice (App
  and Sidebar).
- Unused `HlmH3` import in `profile/components/skill.ts`.
- Unused `common.styles.ts` vs `portfolio.styles.ts` overlap
  (`TRANSITION_MOVE_UP` vs `PORTFOLIO_CARD_FOOTER_STYLES`).
- `ProjectSignalService` is only referenced by dead code.
- `libs/ui` libraries not imported anywhere: `sheet`, `scroll-area`, `separator`,
  `tooltip`.

## Tooling / fixtures

- **Stale test:** `app.spec.ts` expects `"Hello, Portfolio_Dashboard"`, which the
  app never renders.
- **Environment generation:** `scripts/genenv.js` overwrites
  `src/environments/*.ts` on `start`/`build` from `.env`; the committed Azure URL
  is just the last generated output. Missing `.env` values produce an empty
  `portfolioApi`, which yields relative `/v1/...` calls.
- **Hardcoded dark mode:** `<html class="dark">`; no toggle, no `prefers-color-scheme`.
- **No lint configuration** and no `npm run lint` script.
- **No CI workflow** under `.github/workflows`.

## Decisions needed for the Tailwind-only rewrite

1. **Legacy features:** restore or drop the `bak` Portfolio / Experience /
   Project screens and the `ProjectDialog`?
2. **Routes:** keep the exact same URLs and layout, or redesign?
3. **Profile:** add it to the sidebar menu? Add CRUD later?
4. **Header title:** derive from the route (recommended) and add active-link styling?
5. **Overview "View Details":** wire to a destination, open a dialog, or remove?
6. **Error/empty states:** introduce them as part of the rewrite?
7. **Icons:** keep `@ng-icons/lucide` or switch to inline SVGs?
8. **Design tokens:** keep the shadcn-style CSS variables under Tailwind `@theme`,
   or define a smaller custom palette?
9. **Sidebar behavior:** replicate collapse + mobile overlay exactly, or simplify?
10. **Notion config:** move page ID/domain into environment or config?
