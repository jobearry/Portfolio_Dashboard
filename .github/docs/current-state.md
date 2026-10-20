# Current State

Snapshot of the application architecture, flow, and shared infrastructure before
the rewrite.

## 1. Stack

| Concern           | Current choice                                                                       |
| ----------------- | ------------------------------------------------------------------------------------ |
| Framework         | Angular 21, standalone components, lazy `loadComponent` routes                       |
| Styling           | Tailwind CSS v4 (PostCSS), own `@theme` tokens, light + dark                         |
| Component library | Spartan UI (Helm) vendored under `libs/ui` + `@spartan-ng/brain`                     |
| Icons             | `@ng-icons/core` + `@ng-icons/lucide`                                                |
| HTTP              | `HttpClient`, wrapped by a custom `ApiClient`                                        |
| State             | Angular signals, per-entity services                                                 |
| Tests             | Vitest via `@angular/build:unit-test` (shell/routing/theme + screen + service specs) |
| Lint              | ESLint 9 flat config, `angular-eslint` + `typescript-eslint`, conservative rules     |
| Format            | Prettier 3 (`printWidth: 100`, `singleQuote: true`)                                  |
| CI                | GitHub Actions on PRs and `main` pushes: lint → format → build → test                |
| Deploy            | Vercel (`vercel.json`, `vercel-build` → `build:prod`)                                |

## 2. Entry chain

```
src/main.ts
  └─ App (src/app/app.ts)                 → <router-outlet/>
       └─ src/app/app.routes.ts
            └─ Dashboard shell ("")       → app-shell-sidebar + app-shell-header + <router-outlet/>
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

| Path        | Component              | Title                            | Notes                            |
| ----------- | ---------------------- | -------------------------------- | -------------------------------- |
| `""`        | `Dashboard` (shell)    | `Dashboard \| Jonathan Golimlim` | Always mounted                   |
| `dashboard` | `Overview`             | `Dashboard \| Jonathan Golimlim` | Default destination              |
| `timeline`  | `Timeline`             | `Timeline \| Jonathan Golimlim`  |                                  |
| `profile`   | `Profile`              | `Profile \| Jonathan Golimlim`   | Not linked from the sidebar menu |
| `blog`      | `Blog`                 | `Blog \| Jonathan Golimlim`      |                                  |
| `**`        | redirect → `dashboard` | —                                | Child wildcard                   |

Each child route sets both `title` (document tab) and `data.pageTitle` (header
`h1`) through the `page()` helper in `app.routes.ts`. An explicit empty-path
redirect handles `/`.

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

- `state-message` — error/empty block used by every data screen, with optional
  **Try again** output.
- `skeleton` — `app-skeleton` loading placeholder with `text`, `card`, `list`,
  `grid`, and `entries` variants plus an optional `rows` count. It mirrors the
  final layout, exposes `role="status"` with visually hidden "Loading…", and
  marks the visual blocks `aria-hidden`.

## 5. Data layer

### Site config — `src/app/core/config/site.config.ts`

Single typed source of truth for personal content and public integrations:

- `site.profile` — name, handle, role, bio.
- `site.links` — GitHub and CV URLs.
- `site.assets` — sidebar and profile avatar filenames (served from `public/`).
- `site.notion` — page ID and public domain.

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

### Entity services (all `providedIn: 'root'`)

`OverviewSignalService`, `ExperienceSignalService`, `SkillsSignalService`,
`RecommendationService`.

### Notion service

`NotionSignalService` keeps its own state
`{ content: NotionPageCard[] | null, loading, error }` and fetches
`v1/notion/{pageId}` with the same `try/catch` contract.

### Endpoints

Live:

| Endpoint                             | Used by                   | Response type          |
| ------------------------------------ | ------------------------- | ---------------------- |
| `v1/overview`                        | Overview                  | `DashboardItem[]`      |
| `v1/experience?includeProjects=true` | Timeline                  | `ExperienceTimeline[]` |
| `v1/skill`                           | Profile → Skills          | `TechStackItem[]`      |
| `v1/recommendation`                  | Profile → Recommendations | `FeedbackItem[]`       |
| `v1/notion/{site.notion.pageId}`     | Blog                      | `NotionPageCard[]`     |

The legacy endpoints (`v1/portfolio/count`, `v1/portfolio/projects`,
`v1/experience/{id}/projects`) are no longer referenced now that the `bak`
screens are deleted.

### Models

`src/app/features/dashboard/core/models/`

- `DashboardItem { title, subtitle, count, description }`
- `ExperienceTimeline { id, company: Company, duration: Period, description, role: Role, responsibility, type, projects?: Project[] | null }`
- `Project { projectId, projectName, description, coverImg, duration, contribution, techStackSpecs: TechStack[] }`
- `TechStack { specId, toolName, imgSrc, createdAt, stackId, stack }`
- `TechStackItem { id, category, createdAt, imgSrc, stackName }`
- `FeedbackItem { id, personName, description, careerPosition: Role, postedAt }`
- `PortfolioItems { pjCount, expCount, techCount }`
- Value objects: `Company { name }`, `Period { startedAt, finishedAt, duration }`,
  `Role { value }`, `Result<T> { isSuccess, error?, value? }`
- `NotionPageCard { url, date, title }`

## 6. Asset and environment notes

- Public assets: `public/favicon.ico`, `public/grad_1.jpeg` (sidebar avatar),
  `public/jg-profile.png` (profile avatar).
- `scripts/genenv.js` rewrites `src/environments/environment*.ts` from `.env`
  (`PORTFOLIO_API_HOST`, etc.) on every `npm start` / `npm run build*`.
- `index.html` no longer hardcodes a theme class. A small inline script applies
  the stored theme (or `prefers-color-scheme` on first load) before first paint.
- **Theme:** `ThemeService` (`core/theme`) exposes `theme`, `set()`, and
  `toggle()`, persists to `localStorage` (`portfolio-theme`), and toggles the
  `.dark` class plus `color-scheme` on `<html>`. The toggle lives in the avatar
  dropdown.
- `src/styles.css` no longer imports the Spartan preset. It defines its own
  `@theme inline` mapping plus light/dark CSS variables (`--background`,
  `--foreground`, `--card`, `--muted`, `--border`, `--sidebar*`,
  `--radius: 0.625rem`). It keeps the CDK overlay CSS and `tw-animate-css` until
  the 008 cleanup and adds the named `data-*` variants.
- Accent color: token `--color-accent-brand` (`#912f56`); templates no longer
  repeat the hex.
- Template neutrals use semantic tokens (`text-muted-foreground`, `bg-muted/50`)
  so both themes stay legible.

## 7. Functional inventory (rewrite checklist)

- [x] Router shell + lazy children + wildcard redirect to `/dashboard`.
- [x] Sidebar with three menu items and icons; avatar header linking to `/profile`.
- [x] Collapsible sidebar on desktop; off-canvas/mobile behavior via the sidebar trigger.
- [x] Sticky top header with sidebar trigger and current page title.
- [x] Content wrapper: centered, max-width ~1200px, padding.
- [x] Skeleton loading state on every data screen, with error and empty states.
- [x] Five GET fetches (four portfolio + one Notion).
- [x] Dashboard overview header + responsive 3-column metric cards.
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
