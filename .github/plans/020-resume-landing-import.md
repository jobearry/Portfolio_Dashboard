# 020 — Resume landing page imported from web_resume

Status: Draft
Owner: agent
Related docs: `.github/docs/current-state.md`, `.github/docs/screens.md`,
`.github/docs/gaps.md`, `AGENTS.md`, `.github/rules/angular.md`,
`.github/rules/tailwind.md`
Supersedes: plan 019

## Goal

Merge the separate `web_resume` Angular app into this project as two public
screens — `/` (home/CV) and `/projects` — inside the existing app, preserving
`web_resume`'s full git history. One build, one deployment.

## Inspection results (repo: `github.com/jobearry/web_resume`, branch `main`)

88 commits, no tags. Angular **21.1.0**, Tailwind 4.1.12, TypeScript 5.9.2 —
same majors as this project.

| Precondition | Result |
| --- | --- |
| Spartan UI | **None.** No rewrite needed |
| Angular version | Same major — no upgrade |
| Stylesheet format | Plain CSS + Tailwind, `@import "tailwindcss"` |
| Token layer | **Same design system** — identical variable names, both `oklch` |

The two repositories share an ancestor: identical `scripts/genenv.js`,
`vercel.json`, `.postcssrc.json`, `AGENTS.md`, and a `maintenance.ts`.

### Dead code found in the source app

- `<app-heatmap>` is referenced **nowhere**.
- `<app-chart>` appears only inside a **commented-out** line in `heatmap.html`.
- `viewGithubCommits` is dispatched only by `heatmap.ts`, which is never
  instantiated.

Therefore the commit-aggregation effect, the commits state, the pagination
logic, and **ECharts (~1 MB)** are all unreachable. The only live NgRx usage is
one action group and one effect that fetches `user/repos` for the projects
page.

## Decisions

- **Scope:** everything except the heatmap, the ECharts wrapper, and the
  commits pipeline. `/` and `/projects` ship; the GitHub repo list ships; the
  terminal ships.
- **NgRx is removed, not carried.** The one live store slice becomes a
  signal-based service. No `@ngrx/*` dependency is ever added.
- **Repo data comes from the C# backend** through `ApiClient`, not GitHub
  directly. The endpoint does not exist yet — this plan codes against a
  placeholder and records the dependency in `gaps.md`.
- **No new runtime dependencies.** ECharts, NgRx, `@vercel/analytics`, and
  `@angular/forms` are all excluded.
- **Icons convert to `@ng-icons/lucide`.** `lucide-angular` is not added.
- **Theme unifies onto `ThemeService`.** The imported `ThemeToggler` is replaced
  by a component that injects `ThemeService`; the `'theme'` localStorage key
  and the `console.warn` calls go away.

### Rationale: why the token could not be kept

`web_resume`'s `GithubService` sends
`Authorization: Bearer ${environment.githubToken}` from the browser, and
`genenv.js` writes `GITHUB_TOKEN` from `.env` into `environment.ts`, which is
compiled into the public bundle. That is a published secret, not a secret. This
project's own `genenv.js` already declares `githubToken`/`githubURL` without
exporting them — the same conclusion was reached here earlier.

### Route mapping

| Source | Target | Notes |
| --- | --- | --- |
| `''` → redirect `/home` | `''` → Home, `pathMatch: 'full'` | Landing page |
| `projects` | `projects` | Free — no dashboard collision |
| — | `/dashboard`, `/timeline`, `/profile`, `/blog` | Unchanged |

The resume route and `/projects` are declared **above** the dashboard shell
route. Both the resume root and the shell match the empty path; `pathMatch:
'full'` decides it. Do not reorder without re-verifying `/` and `/dashboard`.

### File mapping

| Source (`web_resume`) | Target (this repo) |
| --- | --- |
| `src/app/pages/home/**` | `src/app/features/resume/pages/home/**` |
| `src/app/pages/projects/**` | `src/app/features/resume/pages/projects/**` |
| `src/app/components/{card,footer,marquee,pill,spinner,theme-toggler}` | `src/app/features/resume/components/**` |
| `src/app/components/maintenance.ts` | `src/app/features/resume/components/maintenance.ts` |
| `src/app/features/github/ui/**`, `types/**` | `src/app/features/resume/github/**` |
| `src/app/features/github/store/**` | **replaced** by `src/app/features/resume/github/github.service.ts` |
| `src/app/features/terminal/**` | `src/app/features/resume/terminal/**` |
| `src/app/components/{chart,heatmap}*` | **dropped** |
| `src/app/shared/store.provider.ts` | **dropped** |
| `src/app/app.{ts,html,css}`, `app.config.ts`, `app.routes.ts`, `main.ts`, `index.html`, `angular.json`, `package.json`, `tsconfig*` | **dropped** (scaffolding) |

## Scope

In:

- Import `web_resume` history, then reflow it into `src/app/features/resume/`.
- Convert the single live NgRx slice to a signal-based service.
- Convert Lucide icons to `@ng-icons/lucide`.
- Fold their `--chart-1..5` and `--type-color` tokens into `src/styles.css`.
- Add the two public routes.
- Update `AGENTS.md` and `.github/docs/`.

Out:

- The heatmap, the ECharts wrapper, and the commits pipeline (dead code).
- `@ngrx/*`, `echarts`, `lucide-angular`, `@vercel/analytics`,
  `@angular/forms`.
- Any change to `/dashboard`, `/timeline`, `/profile`, `/blog`, or the wildcard
  redirect.
- Their `index.html` global font stack (`system-ui, Avenir`), which would
  override this project's `--font-sans`.
- SSR or prerendering. The app stays a static SPA.
- A backend GitHub endpoint — planned separately.

## Affected surface

- Routes: adds `/` and `/projects`. All existing routes unchanged.
- Components: new `src/app/features/resume/**`.
- Services / models: one new signal-based `GithubService`; repo model to
  `src/app/core/models`.
- Endpoints: **one new backend dependency** (GitHub repo list), not yet
  available.
- Assets / config: `package.json` (no new runtime deps; dev tooling unchanged),
  `src/styles.css` (tokens), `AGENTS.md`, `.github/docs/*`.

## Tasks

### Phase 1 — Import history

- [ ] Clone outside the working tree:
      `git clone https://github.com/jobearry/web_resume.git /tmp/opencode/resume-import`
- [ ] Rewrite paths in the clone (no `--force`):
      `git filter-repo --to-subdirectory-filter resume-web`
- [ ] Verify: all paths under `resume-web/`, 88 commits preserved.
- [ ] Add a temporary remote, fetch `main` only, without tags.
- [ ] `git merge --allow-unrelated-histories resume-import/main`
- [ ] Remove the temporary remote.
- [ ] Drop the now-inert `resume-web/.github/` in its own commit.

### Phase 2 — Reflow into the feature folder

- [ ] `git mv` per the file-mapping table above.
- [ ] Delete dropped files: `chart*`, `heatmap*`, `store.provider.ts`,
      `features/github/store/**`, and all app scaffolding.
- [ ] Delete the empty `resume-web/` staging folder.

### Phase 3 — NgRx to signals

- [ ] Add the repo model to `src/app/core/models`.
- [ ] Write `GithubService` with `inject(ApiClient)`, a `signal` for the repos,
      and a `loading`/`error` signal. Follow the existing entity-service
      pattern; no `HttpClient` in the service, no `any`.
- [ ] Rewrite `projects.ts`: remove `Store`, `State`, `GithubAPIActions`, and
      the `Observable`; read signals directly.
- [ ] Rewrite `projects.html`: replace `projectState$ | async` with signal
      reads; handle loading, empty, and error states.
- [ ] Leave the endpoint path as a named constant with a TODO and record the
      missing endpoint in `gaps.md`.

### Phase 4 — Icons, theme, and tokens

- [ ] Convert every `<lucide-icon>` / `<lucide-angular>` to `<ng-icon>` with
      `provideIcons` per component, matching the dashboard's pattern.
- [ ] Replace their `ThemeToggler` internals with `inject(ThemeService)`;
      keep the bulb visual.
- [ ] Add `--type-color` and, if still referenced, the `--chart-*` tokens to
      `src/styles.css`; remove references that are only used by dropped code.
- [ ] Normalise `html[data-theme=...]` selectors to the existing `.dark`
      convention, or extend `ThemeService` and the `index.html` bootstrap to
      set `data-theme`. Choose one and record it.
- [ ] Keep their footer; do not import their global `:root` font/line-height
      rules.

### Phase 5 — Routes and docs

- [ ] Add `/` and `/projects` above the dashboard shell route, with
      `title` values from `site.config`.
- [ ] Confirm the public pages render without the dashboard shell.
- [ ] `AGENTS.md`: routes, repository map, landmines.
- [ ] `.github/docs/current-state.md`, `screens.md`, `gaps.md`.
- [ ] Mark this plan `Done`.

## Risks / decisions

- **Missing backend endpoint.** The projects page cannot show live repos until
  the C# API exposes one. Ship the page with the static
  `PROJECT_HIGHLIGHT` list working and the GitHub block in its empty state.
- **Two `Maintenance` components** will exist (dashboard's and the imported
  one). Keep both under their own feature folders; unify later if convenient.
- **Bundle budgets.** `angular.json` warns at 500 kB and errors at 1 MB
  initial. The new routes are lazy, and ECharts is gone, so this should be a
  net improvement — verify.
- **Global stylesheet.** Imported styles are global. Scope with component
  styles and wrapper classes; never edit shared tokens in a way that changes
  the dashboard.
- **`window` access at field-initialiser time** (`home.ts` uses
  `window.innerHeight`) is SSR-unsafe but harmless here, since there is no SSR.
- **Do not** run `filter-repo` in this working tree — only in
  `/tmp/opencode/resume-import`.
- **Rollback.** All work is on the feature branch; `main` is untouched until
  merged.

## Verification

- [ ] `git log --oneline --graph --all` shows one merge joining both histories.
- [ ] `git log --follow -- src/app/features/resume/pages/home/ui/home.ts` shows
      the imported history through the reflow.
- [ ] `npm run build` and `npm run build:prod` succeed; budgets not exceeded.
- [ ] `npm test` passes.
- [ ] `npm run lint` passes — no `any`, no `console.*`.
- [ ] `grep -r "@ngrx\|echarts\|lucide-angular" src` returns nothing.
- [ ] Manual: `/` renders the CV landing page with no dashboard chrome.
- [ ] Manual: `/projects` renders highlights, the repo block, and its empty and
      error states.
- [ ] Manual: `/dashboard`, `/timeline`, `/profile`, `/blog` unchanged.
- [ ] Manual: wildcard still redirects to `/dashboard`.
- [ ] Responsive at mobile, tablet, and desktop widths.
- [ ] Keyboard: focus visible, landmarks present, heading order correct,
      icon-only controls labelled.
- [ ] Theme toggle on `/` and in the dashboard share one stored preference.
