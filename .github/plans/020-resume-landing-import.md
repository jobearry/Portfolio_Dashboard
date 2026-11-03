# 020 — Resume landing page imported from resume-web

Status: Draft
Owner: agent
Related docs: `.github/docs/current-state.md`, `.github/docs/screens.md`,
`.github/docs/gaps.md`, `AGENTS.md`, `.github/rules/angular.md`,
`.github/rules/tailwind.md`
Supersedes: plan 019

## Goal

Merge the separate `resume-web` Angular app into this project as a lazily
loaded landing page served at `/`, preserving `resume-web`'s full git history.
The result is one Angular app, one build, one deployment — not a monorepo.

## Scope

In:

- Import `resume-web` history into a staging folder and merge it with
  `--allow-unrelated-histories`.
- Restructure the imported app into `src/app/features/resume/`, dissolving its
  app-level scaffolding (`main.ts`, `app.config.ts`, `app.routes.ts`,
  `index.html`, root component).
- Add a top-level `''` route with `pathMatch: 'full'` that lazy-loads the resume
  landing page outside the dashboard shell.
- Fold the landing page's global concerns (fonts, meta, favicon) into the
  existing `src/index.html` and `src/styles.css`.
- Remap the landing page's colours onto the existing design tokens.
- Update `AGENTS.md` and `.github/docs/`.

Out:

- npm workspaces, `apps/*` or `projects/*` layout, a second Vercel project —
  see plan 019, superseded.
- Any change to `/dashboard`, `/timeline`, `/profile`, `/blog`, or the wildcard
  redirect.
- Porting `resume-web`'s `package.json` wholesale, its CI config, or its
  lint/test tooling.
- SSR or prerendering. The app stays a static SPA.

## Decisions

- **One app, one route.** The resume is a page, not a deployment boundary. It
  lazy-loads, so it stays out of the initial bundle without needing a separate
  build.
- **Single global stylesheet.** Angular SPA has one `src/styles.css`, so
  tokens cannot be scoped per page. The landing page adopts the dashboard
  tokens rather than shipping a second `@theme` block.
- **Staging import, then reflow.** Import verbatim into `resume-web/`, then
  `git mv` into `src/app/features/resume/`. Two reviewable commits; rename
  detection keeps file-level `git log --follow` working across the reflow.
- **`resume-web` is archived after the merge.** From then on this repository is
  the only source of truth; keeping both live guarantees drift.
- **Route order matters.** The resume route is declared before the shell route;
  both match the empty path, and `pathMatch: 'full'` on the resume route decides
  it. Do not reorder without re-verifying `/` and `/dashboard`.

## Affected surface

- Routes: adds `/` → resume landing page. All existing routes unchanged.
- Components: new `src/app/features/resume/**`.
- Services / models: only if the landing page fetches data — and then it must
  go through `ApiClient` and an entity service, never `HttpClient`.
- Endpoints: expected none. The resume is static CV content.
- Assets / config:
  - `package.json` / `package-lock.json` — any runtime dependency the landing
    page genuinely needs
  - `src/index.html` — title, meta description, fonts, favicon
  - `src/styles.css` — token mappings, only if the landing page needs tokens
    that do not exist yet
  - `tsconfig.json` — unchanged; `rootDir: ./src` still covers the new feature
  - `AGENTS.md`, `.github/docs/current-state.md`, `.github/docs/screens.md`

## Preconditions

Inspect `resume-web` **before** writing the import tasks. Each of these changes
the size of the job:

- [ ] Does it use `@spartan-ng/*`? Forbidden here (non-negotiable 2); means a
      plain-Tailwind rewrite of its UI.
- [ ] Which Angular version? Sub-21 means upgrading standalone APIs and
      `@if`/`@for` control flow before it can merge.
- [ ] Stylesheet format: plain CSS, SCSS (adds `sass`), or Tailwind with its own
      `@theme` (needs remapping onto existing tokens).
- [ ] Runtime dependencies it imports — these join `package.json`.
- [ ] Does it fetch data? If so, what endpoints, and do they belong in
      `src/app/core/models`?
- [ ] What is in its `index.html` — fonts, meta description, favicon, analytics?

## Tasks

### Phase 1 — Import history

- [ ] Record the repo URL and default branch here.
- [ ] Clone outside the working tree:
      `git clone <resume-url> /tmp/opencode/resume-import`
- [ ] Rewrite paths in the clone (no `--force`):
      `git filter-repo --to-subdirectory-filter resume-web`
- [ ] Verify: all paths under `resume-web/`, commit count unchanged.
- [ ] Add a temporary remote, fetch the default branch only:
      `git remote add resume-import /tmp/opencode/resume-import`
      then `git fetch --no-tags resume-import <branch>`
- [ ] Merge: `git merge --allow-unrelated-histories resume-import/<branch>`
- [ ] Remove the temporary remote.
- [ ] Drop the now-inert `resume-web/.github/` in its own commit.

### Phase 2 — Reflow into the feature folder

- [ ] Decide the file mapping between `resume-web/src/app/**` and
      `src/app/features/resume/**`; record it here before moving.
- [ ] `git mv` components, templates, and styles into
      `src/app/features/resume/`.
- [ ] Delete scaffolding that has no meaning in a feature: `main.ts`,
      `app.config.ts`, `app.routes.ts`, `index.html`, `package.json`,
      `angular.json`, `tsconfig*.json`.
- [ ] Resolve name collisions with existing dashboard components and the
      `app` selector prefix (non-negotiable rules: prefix stays `app`,
      kebab-case).
- [ ] Delete the now-empty `resume-web/` staging folder.

### Phase 3 — Route and styling

- [ ] Add the `''` / `pathMatch: 'full'` route lazy-loading the resume page,
      declared above the shell route.
- [ ] Confirm the landing page renders without the dashboard shell and without
      the dashboard's `PageHeader`.
- [ ] Merge landing fonts and meta into `src/index.html`; set per-route `title`.
- [ ] Remap landing colours onto existing tokens; no hard-coded hex values, no
      dynamic class names, no second `@theme`.
- [ ] Confirm the landing page is mobile-first and keyboard navigable.

### Phase 4 — Docs

- [ ] `AGENTS.md`: add the resume route to the route list and the repository
      map; note that `resume-web` is archived.
- [ ] `.github/docs/current-state.md`: routes, feature layout, data layer.
- [ ] `.github/docs/screens.md`: document the `/` screen.
- [ ] `.github/docs/gaps.md`: record anything deliberately left out.
- [ ] Mark this plan `Done`; keep 019 as the superseded record.

## Risks / decisions

- **Spartan UI in the source app** would require a full UI rewrite, as in plan
  008. If found, stop and re-scope before importing.
- **Angular version gap** means the import cannot compile until migrated. Prefer
  upgrading in the `resume-web` clone before the merge, so the merge commit is
  the only place the two codepaths meet.
- **Single stylesheet.** Landing-page styles are global once imported; scope
  them with component styles and wrapper classes, never by editing shared
  tokens in a way that changes the dashboard.
- **Bundle budgets.** `angular.json` warns at 500 kB and errors at 1 MB for the
  initial bundle. The resume is lazy-loaded so it should not affect the initial
  budget, but shared dependencies would. Check `npm run build:prod` output.
- **Landing page is unauthenticated public content.** No secrets, no API keys,
  no `console.log`.
- **Do not** run `filter-repo` in this working tree — only in
  `/tmp/opencode/resume-import`.
- **Rollback.** All work happens on the feature branch; `main` is untouched
  until merge.

## Verification

- [ ] `git log --oneline --graph --all` shows one merge joining both histories.
- [ ] `git log --follow -- src/app/features/resume/<a-moved-file>` shows the
      imported history through the reflow.
- [ ] `npm run build` and `npm run build:prod` succeed; budgets not exceeded.
- [ ] `npm test` passes (existing 38 tests plus any new ones).
- [ ] `npm run lint` passes.
- [ ] Manual: `/` renders the landing page with no sidebar or dashboard chrome.
- [ ] Manual: `/dashboard`, `/timeline`, `/profile`, `/blog` unchanged.
- [ ] Manual: `/` and unknown paths still resolve as before; wildcard still
      redirects to `/dashboard`.
- [ ] Loading, empty, and error states for any data the landing page fetches.
- [ ] Responsive at mobile, tablet, and desktop widths.
- [ ] Keyboard: focus visible, landmarks present, heading order correct,
      icon-only controls labelled.
