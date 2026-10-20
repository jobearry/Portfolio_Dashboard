# Current State

Snapshot of the application architecture, flow, and shared infrastructure before
the rewrite.

## 1. Stack

| Concern | Current choice |
| --- | --- |
| Framework | Angular 21, standalone components, lazy `loadComponent` routes |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| Component library | Spartan UI (Helm) vendored under `libs/ui` + `@spartan-ng/brain` |
| Icons | `@ng-icons/core` + `@ng-icons/lucide` |
| HTTP | `HttpClient`, wrapped by a custom `ApiClient` |
| State | Angular signals, per-entity services |
| Tests | Vitest via `@angular/build:unit-test` (only the default spec exists) |
| Deploy | Vercel (`vercel.json`, `vercel-build` → `build:prod`) |

## 2. Entry chain

```
src/main.ts
  └─ App (src/app/app.ts)                 → <router-outlet/>
       └─ src/app/app.routes.ts
            └─ Dashboard shell ("")       → app-sidebar + app-navbar + <router-outlet/>
                 ├─ /dashboard  → DashboardHome → Overview
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
  provideRouter(routes),
]
```

- No `provideHttpClient()` — see [gaps.md](./gaps.md#1-missing-httpclient-provider-critical).
- No zone/change-detection configuration.
- No global state, interceptors, or guards.

`src/app/app.ts` registers the global icon set:

```ts
providers: provideIcons({ ...SIDEBAR_ICONS, ...PORTFOLIO_ICONS }),
```

## 3. Routes

| Path | Component | Title | Notes |
| --- | --- | --- | --- |
| `""` | `Dashboard` (shell) | `Dashboard \| Jonathan Golimlim` | Always mounted |
| `dashboard` | `DashboardHome` → `Overview` | — | Default destination |
| `timeline` | `Timeline` | — | |
| `profile` | `Profile` | — | Not linked from the sidebar menu |
| `blog` | `Blog` | — | |
| `**` | redirect → `dashboard` | — | Child wildcard |
| ~~`portfolio`~~ | commented out | — | Legacy, see `features/dashboard/bak/**` |

Only the shell route defines a `title`; child routes do not.

## 4. Shell layout

`features/dashboard/shell/dashboard.{ts,html}`

```
<div hlmSidebarWrapper>
  <hlm-sidebar>
    ├─ Header  : avatar + name + subtitle, links to /profile
    ├─ Content : Dashboard / Timeline / Blog menu items
    └─ Footer  : empty
  </hlm-sidebar>

  <main class="w-full">
    <nav class="p-2 border-b sticky top-0 z-10 bg-background">
      <app-navbar [title]="pagename()" />   <!-- sidebar trigger + page title -->
    </nav>
    <section class="grid place-items-center">
      <div class="max-w-300 w-full p-3">
        <router-outlet />
      </div>
    </section>
  </main>
</div>
```

- `title` = "Jonathan Golimlim", `subtitle` = "Software Engineer".
- `pagename` starts as `""` and is set **only** when a sidebar item or the avatar
  is clicked (`onItemClickHandler`), so it is blank on reload/direct navigation.
- Sidebar items come from `core/constants/sidebar-sections.ts`:

| Label | URL | Icon |
| --- | --- | --- |
| Dashboard | `/dashboard` | `lucideLayoutDashboard` |
| Timeline | `/timeline` | `lucideChartGantt` |
| Blog | `/blog` | `lucideRss` |

There is no active-link highlighting (`routerLinkActive` is unused).

## 5. Data layer

### `ApiClient` — `src/app/core/api/api-client.ts`

- Base URL: `environment.portfolioApi` (Azure App Service URL, regenerated from
  `.env` by `scripts/genenv.js`).
- `GET` only, JSON headers, `firstValueFrom(HttpClient.get(...))`.
- No interceptors, retries, timeouts, or error mapping.

### `PortfolioSignalService<T>` — `src/app/shared/services/portfolio-base.service.ts`

Signal state `{ content: T[], loading: boolean, message: string }` with:

- `getState()`
- `setLoading()` — sets `loading: true`, clears content and message
- `getPortfolioResource(endpoint)` — fetch, then replace state
- helper `getContent<T>(endpoint, service)` — `setLoading()` then fetch

### Entity services (all `providedIn: 'root'`)

`OverviewSignalService`, `ExperienceSignalService`, `SkillsSignalService`,
`RecommendationService`, `ProjectSignalService` (used only by dead code).

### Notion service

`NotionSignalService` keeps its own state
`{ content: NotionPageCard[] | null, loading, message }` and fetches
`v1/notion/{pageId}`.

### Endpoints

Live:

| Endpoint | Used by | Response type |
| --- | --- | --- |
| `v1/overview` | Dashboard home | `DashboardItem[]` |
| `v1/experience?includeProjects=true` | Timeline | `ExperienceTimeline[]` |
| `v1/skill` | Profile → Skills | `TechStackItem[]` |
| `v1/recommendation` | Profile → Recommendations | `FeedbackItem[]` |
| `v1/notion/16348b6ae5dd8032b137c4327f9ab77c` | Blog | `NotionPageCard[]` |

Legacy (dead code only): `v1/portfolio/count`, `v1/portfolio/projects`,
`v1/experience/{id}/projects`.

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
- `index.html` hardcodes `class="dark"` on `<html>`; there is no theme toggle.
- `src/styles.css` imports the Spartan Tailwind preset and defines light/dark
  shadcn-style CSS variables (`--background`, `--foreground`, `--card`,
  `--muted`, `--border`, `--sidebar*`, `--radius: 0.625rem`).
- Accent color used throughout: `#912F56`.

## 7. Functional inventory (rewrite checklist)

- [ ] Router shell + lazy children + wildcard redirect to `/dashboard`.
- [ ] Sidebar with three menu items and icons; avatar header linking to `/profile`.
- [ ] Collapsible sidebar on desktop; off-canvas/mobile behavior via the sidebar trigger.
- [ ] Sticky top header with sidebar trigger and current page title.
- [ ] Content wrapper: centered, max-width ~1200px, padding.
- [ ] Skeleton loading state on every data screen.
- [ ] Five GET fetches (four portfolio + one Notion).
- [ ] Dashboard overview header + responsive 3-column metric cards.
- [ ] Timeline experience cards with year badge, role/description, responsibility,
      nested projects, and technology chips.
- [ ] Profile hero (avatar, name, handle, bio), GitHub and CV external links.
- [ ] Recommendations list and skills grid on Profile.
- [ ] Blog list: numbered entries, title, date, external link icon, URL rewrite
      to the public Notion domain, new-tab links.
- [ ] Hover/focus lift transition on blog cards.
- [ ] Hardcoded dark theme.
- [ ] External links use `target="_blank"` + `rel="noopener noreferrer"`.

Not present today: forms, CRUD, auth, search/filter/pagination, dialogs in live
code, toasts, empty/error states, analytics, i18n.
