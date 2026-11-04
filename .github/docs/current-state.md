# Current State

Snapshot of the application architecture, flow, and shared infrastructure after
the Tailwind rewrite (002–008).

## 1. Stack

| Concern    | Current choice                                                                       |
| ---------- | ------------------------------------------------------------------------------------ |
| Framework  | Angular 21.2, standalone components, lazy `loadComponent` routes                     |
| Styling    | Tailwind CSS v4 (PostCSS), own `@theme` tokens, light + dark                         |
| Components | Plain Tailwind; shared `PageHeader`, `StateMessage`, `Skeleton` primitives           |
| Icons      | `@ng-icons/core` + `@ng-icons/lucide`                                                |
| HTTP       | `HttpClient`, wrapped by a custom `ApiClient`                                        |
| State      | Angular signals, per-entity services                                                 |
| Tests      | Vitest via `@angular/build:unit-test` (shell/routing/theme + screen + service specs) |
| Lint       | ESLint 9 flat config, `angular-eslint` + `typescript-eslint`, conservative rules     |
| Format     | Prettier 3 (`printWidth: 100`, `singleQuote: true`)                                  |
| CI         | GitHub Actions on PRs and `main` pushes: lint → format → build → test                |
| Deploy     | Vercel (`vercel.json`, `vercel-build` → `build:prod`)                                |

## 2. Entry chain

```
src/main.ts
  └─ App (src/app/app.ts)                 → <router-outlet/>
       └─ src/app/app.routes.ts
            ├─ /           → Home      (public landing page, no shell)
            ├─ /projects   → Projects  (public, no shell)
            └─ Dashboard shell ("")    → app-shell-sidebar + app-shell-header + <router-outlet/>
                 ├─ /dashboard  → Overview
                 ├─ /timeline   → Timeline
                 ├─ /profile    → Profile → Recommendations + SkillComponent
                 ├─ /blog       → Blog
                 └─ **          → redirectTo: dashboard
```

### Bootstrapping

`src/app/app.config.ts`:

```ts
providers: [
  provideBrowserGlobalErrorListeners(),
  provideHttpClient(withFetch()),
  provideRouter(routes),
  provideAppInitializer(() => {
    inject(ThemeService);
  }),
];
```

- `HttpClient` is registered app-wide, so `ApiClient` resolves on every route.
- The theme initializer applies the stored/system theme and keeps it on `<html>`.
- No zone/change-detection configuration.
- No global state, interceptors, retries, or guards.

`src/app/app.ts` is a bare `<router-outlet/>` host. There is no global icon
registry: each component (sidebar, blog, profile, maintenance) registers the
lucide icons it uses through its own `provideIcons()`.

## 3. Routes

| Path        | Component              | Title                                     | Notes                            |
| ----------- | ---------------------- | ----------------------------------------- | -------------------------------- |
| `""` (full) | `Home` (resume)        | `Jonathan Golimlim \| Software Engineer`  | Public landing page, no shell    |
| `projects`  | `Projects` (resume)    | `Projects \| Jonathan Golimlim`           | Public, no shell                 |
| `""`        | `Dashboard` (shell)    | `Dashboard \| Jonathan Golimlim`          | Always mounted                   |
| `dashboard` | `Overview`             | `Dashboard \| Jonathan Golimlim`          | Default destination              |
| `timeline`  | `Timeline`             | `Timeline \| Jonathan Golimlim`           |                                  |
| `profile`   | `Profile`              | `Profile \| Jonathan Golimlim`            | Not linked from the sidebar menu |
| `blog`      | `Blog`                 | `Blog \| Jonathan Golimlim`               |                                  |
| `**`        | redirect → `dashboard` | —                                         | Child wildcard                   |

The two public routes are declared **above** the dashboard shell route. Both the
resume landing page and the shell match the empty path; `pathMatch: 'full'` on
the landing route decides it, so declaration order matters. Each dashboard child
route sets both `title` (document tab) and `data.pageTitle` (header `h1`) through
the `page()` helper in `app.routes.ts`.

## 4. Shell layout

`features/dashboard/shell/`

```
dashboard.{ts,html}       host layout, backdrop, Escape + navigation close
shell-state.service.ts    collapsed / mobileOpen / isDesktop signals, scroll lock
sidebar/sidebar.ts        plain Tailwind sidebar (rail, nav, footer)
header/header.ts          mobile trigger + route-driven <h1>
user-menu/user-menu.ts    avatar dropdown (profile, CV, theme toggle)
```

```
<div [style.--shell-sidebar-width]="collapsed() ? '4.5rem' : '16rem'">
  @if (mobile && open) { <overlay /> }
  <app-shell-sidebar />                 <!-- fixed; 16rem or 4.5rem rail; 18rem mobile -->
  <div class="md:pl-[var(--shell-sidebar-width)]">
    <app-shell-header />                <!-- sticky; trigger below md + <h1> -->
    <main class="max-w-[75rem] p-3"><router-outlet /></main>
  </div>
</div>
```

- The header title comes from the deepest route's `data.pageTitle`; there is no
  click handler and no `pagename` signal.
- Sidebar items come from `core/constants/sidebar-sections.ts`:

| Label     | URL          | Icon                    |
| --------- | ------------ | ----------------------- |
| Dashboard | `/dashboard` | `lucideLayoutDashboard` |
| Timeline  | `/timeline`  | `lucideChartGantt`      |
| Blog      | `/blog`      | `lucideRss`             |

- Active links use `routerLinkActive` with exact matching and
  `aria-current="page"`.
- Desktop collapse (16rem ↔ 4.5rem) is persisted in localStorage; mobile uses an
  off-canvas panel below `md` (48rem) with overlay, Escape, scroll lock, and
  focus return.
- The avatar block is a dropdown button with Profile, CV, and theme actions.

### Shared UI — `src/app/shared/ui/`

- `page-header` — shared eyebrow / `h2` / optional description block used by
  Timeline and Blog.
- `state-message` — error/empty block used by every data screen, with optional
  **Try again** output.
- `skeleton` — `app-skeleton` loading placeholder with `text`, `card`, `list`,
  `grid`, and `entries` variants plus an optional `rows` count. It mirrors the
  final layout, exposes `role="status"` with visually hidden "Loading…", and
  marks the visual blocks `aria-hidden`.

### Public pages — `src/app/features/resume/`

Imported from `web_resume` in plan 020. These render **outside** the dashboard
shell — no sidebar, no header — and share the same design tokens.

```
pages/home/         landing page: profile, about, timeline, certifications,
                    recent projects, tech stack
pages/projects/     client-project highlights + public GitHub repos
components/         card, footer, maintenance, marquee, pill, spinner,
                    theme-toggler
github/             GithubRepoSignalService + presentational repo list
terminal/           terminal widget
shared/constants/   TRANSITION_MOVE_UP
core/models/        GithubRepo
```

- `pages/home/constants/home.constants.ts` drives the landing page:
  `BlockContent` entries pair a title, icon name, and component class, which
  `DynamicHostComponent` (`pages/home/components/host.ts`) instantiates.
- Icons are registered per component with `provideIcons()`; the landing page
  registers `lucideIdCard`, `lucideHistory`, `lucideAward`, `lucideBlocks`, and
  `lucideToolbox`.
- `ThemeToggler` delegates to the shared `ThemeService`, so the public pages and
  the dashboard share one stored preference and one `.dark` class.
- `pages/home/components/profile` swaps between `/profile.png` and
  `/profile_dark.png` by observing the `<html>` class.

## 5. Data layer

### Site config — `src/app/core/config/site.config.ts`

Single typed source of truth for personal content and public integrations:

- `site.profile` — name, handle, role, bio.
- `site.links` — GitHub and CV URLs.
- `site.assets` — sidebar and profile avatar filenames (served from `public/`).
- `site.notion` — page ID and public domain.
- `site.github` — GitHub username used by the repository count endpoint.

The object is `as const satisfies SiteConfig`. Consumers: shell (title/subtitle),
sidebar (avatar), profile (hero + links), blog (page ID/domain), and the root
route title. Menu labels/URLs/icons stay in `core/constants/sidebar-sections.ts`.

### `ApiClient` — `src/app/core/api/api-client.ts`

- Base URL: `environment.portfolioApi` (Azure App Service URL, regenerated from
  `.env` by `scripts/genenv.js`).
- `GET` only, JSON headers, `firstValueFrom(HttpClient.get(...))`.
- No interceptors, retries, timeouts, or error mapping.

### `PortfolioSignalService<T>` — `src/app/shared/services/portfolio-base.service.ts`

Signal state `{ content: T[], loading: boolean, error: string | null }` with:

- `getState()`
- `setLoading()` — sets `loading: true`, clears the previous error
- `getPortfolioResource(endpoint)` — fetch in `try/catch`; success replaces
  content, failure clears content, exits loading, and stores a user-safe message
- helper `getContent<T>(endpoint, service)` — `setLoading()` then fetch

### `ResourceSignalService<T>` — `src/app/shared/services/resource-base.service.ts`

Single-object counterpart to `PortfolioSignalService`, used by count endpoints.

- state `{ content: T | null, loading, error }`
- same `getState()` / `setLoading()` / `getResource(endpoint)` contract
- helper `getResource<T>(endpoint, service)`

### Entity services (all `providedIn: 'root'`)

`OverviewSignalService`, `ExperienceSignalService`, `SkillsSignalService`,
`RecommendationService`, `GithubCountSignalService`,
`NotionCountSignalService`, and `GithubRepoSignalService` (resume projects page,
added in 020).

### Notion service

`NotionSignalService` keeps its own state
`{ content: NotionPageCard[] | null, loading, error }` and fetches
`v1/notion/{pageId}` with the same `try/catch` contract.

### Endpoints

Live:

| Endpoint                                        | Used by                   | Response type          |
| ----------------------------------------------- | ------------------------- | ---------------------- |
| `v1/overview`                                   | Overview                  | `OverviewItem[]`       |
| `v1/github/owner/{username}/repositories/count` | Overview                  | `OverviewItem`         |
| `v1/notion/{pageId}/count`                      | Overview                  | `OverviewItem`         |
| `v1/experience?includeProjects=true`            | Timeline                  | `ExperienceTimeline[]` |
| `v1/skill`                                      | Profile → Skills          | `TechStackItem[]`      |
| `v1/recommendation`                             | Profile → Recommendations | `FeedbackItem[]`       |
| `v1/notion/{site.notion.pageId}`                | Blog                      | `NotionPageCard[]`     |

The legacy endpoints (`v1/portfolio/count`, `v1/portfolio/projects`,
`v1/experience/{id}/projects`) are no longer referenced now that the `bak`
screens are deleted.

Planned (not yet implemented in the API):

| Endpoint       | Used by            | Response type |
| -------------- | ------------------ | ------------- |
| `github/repos` | Resume → Projects  | `GithubRepo[]` |

`GithubRepoSignalService` calls this path through `ApiClient`. Until the
endpoint exists, `/projects` renders the repo block's empty state. The GitHub
token deliberately lives on the API: the imported `web_resume` shipped it in the
browser bundle, which plan 020 removed.

### Models

`src/app/features/dashboard/core/models/`

- `OverviewItem { key, count }`; Overview displays each API-provided `key` in
  uppercase with camelCase/underscore word breaks and a matching local subtitle
  (key-derived fallback for unknown values). The same model types the GitHub and
  Notion count responses.
- `ExperienceTimeline { id, company: Company, duration: Period, description, role: Role, responsibility, type, projects?: Project[] | null }`
- `Project { projectId, projectName, description, coverImg, duration, contribution, techStackSpecs: TechStack[] }`
- `TechStack { specId, toolName, imgSrc, createdAt, stackId, stack }`
- `TechStackItem { id, category, createdAt, imgSrc, stackName }`
- `FeedbackItem { id, personName, description, careerPosition: Role, postedAt }`
- Value objects: `Company { name }`, `Period { startedAt, finishedAt, duration }`,
  `Role { value }`
- `NotionPageCard { url, date, title }`

`src/app/features/resume/core/models/` (plan 020):

- `GithubRepo { id, name, fullName, htmlUrl, description, language, topics }` —
  the API normalises `description`/`language` to empty strings and returns only
  public repositories.

The unused `PortfolioItems` and `Result<T>` models were deleted in 008.

## 6. Asset and environment notes

- Public assets: `public/favicon.ico`, `public/grad_1.jpeg` (sidebar avatar),
  `public/jg-profile.png` (profile avatar), `public/profile.png` and
  `public/profile_dark.png` (resume landing page, plan 020).
- `scripts/genenv.js` rewrites `src/environments/environment*.ts` from `.env`
  (`PORTFOLIO_API_HOST`, etc.) on every `npm start` / `npm run build*`. It uses
  `dotenv`, now an explicit dev dependency; without `.env` the API base is empty
  and requests become relative `/v1/...` calls.
- `index.html` no longer hardcodes a theme class. A small inline script applies
  the stored theme (or `prefers-color-scheme` on first load) before first paint.
- **Theme:** `ThemeService` (`core/theme`) exposes `theme`, `set()`, and
  `toggle()`, persists to `localStorage` (`portfolio-theme`), and toggles the
  `.dark` class plus `color-scheme` on `<html>`. The toggle lives in the avatar
  dropdown.
- **TypeScript config:** `tsconfig.json` sets `rootDir: ./src` so the app and
  spec projects stay compatible with TypeScript 6 editors (VS Code bundles
  6.0.3); the project itself compiles with TypeScript 5.9.3.
- `src/styles.css` owns the token layer: `@theme inline` mapping plus light/dark
  CSS variables (`--background`, `--foreground`, `--card`, `--muted`,
  `--border`, `--sidebar*`, `--radius: 0.625rem`). It has no Spartan preset, CDK
  overlay CSS, `tw-animate-css` import, or untyped `data-*` variants (all removed
  in 008).
- Accent color: token `--color-accent-brand` (`#912f56`); templates no longer
  repeat the hex.
- Template neutrals use semantic tokens (`text-muted-foreground`, `bg-muted/50`)
  so both themes stay legible.

## 7. Functional inventory

- [x] Router shell + lazy children + wildcard redirect to `/dashboard`.
- [x] Sidebar with three menu items and icons; avatar header linking to `/profile`.
- [x] Collapsible sidebar on desktop; off-canvas/mobile behavior via the sidebar trigger.
- [x] Sticky top header with sidebar trigger and current page title.
- [x] Content wrapper: centered, max-width ~1200px, padding.
- [x] Skeleton loading state on every data screen, with error and empty states.
- [x] Five GET fetches (four portfolio + one Notion).
- [x] Dashboard overview header + responsive 5-card metric grid, including
      GitHub repository and Notion page counts with independent retry states.
- [x] Timeline experience cards with year badge, role/description, responsibility,
      nested projects, and technology chips.
- [x] Profile hero (avatar, name, handle, bio), GitHub and CV external links.
- [x] Recommendations list and skills grid on Profile.
- [x] Blog list: numbered entries, title, date, external link icon, URL rewrite
      to the public Notion domain, new-tab links.
- [x] Hover/focus lift transition on blog cards.
- [x] Light and dark theme with persisted choice; toggle in the avatar dropdown.
- [x] External links use `target="_blank"` + `rel="noopener noreferrer"`.

Not present today: forms, CRUD, auth, search/filter/pagination, dialogs in live
code, toasts, analytics, i18n.

## 8. Removed in the Tailwind rewrite (008)

- `libs/ui/**`, `components.json`, and the `@spartan-ng/helm/*` TypeScript path
  aliases.
- `@spartan-ng/brain`, `@spartan-ng/cli`, `class-variance-authority`, `clsx`,
  `tailwind-merge`, `tw-animate-css`, `@angular/cdk`, and the unused
  `@angular/forms`.
- `HlmIcon` and all Helm directives; `Maintenance` remains but is now plain
  Tailwind (it is not routed).
- CDK overlay CSS, the `tw-animate-css` import, Spartan `data-*` variants, and
  the unused `--animate-indeterminate` keyframes.
- The unused `PortfolioItems` and `Result<T>` models.

`Maintenance` is intentionally retained for future placeholder use. No live code
imports `@spartan-ng/*` or `libs/ui`.
