# 001 — Tailwind Rewrite (Spartan-free)

Status: Draft
Related docs: `.github/docs/current-state.md`, `.github/docs/screens.md`,
`.github/docs/spartan-inventory.md`, `.github/docs/gaps.md`
Related rules: `.github/rules/angular.md`, `.github/rules/tailwind.md`,
`.github/rules/backend.md`, `.github/rules/quality.md`

## Goal

Rebuild the UI layer with **plain Tailwind CSS**, removing Spartan UI and
`libs/ui` while preserving every current feature and fixing the baseline defects
that prevent the app from working reliably.

This plan records the agreed approach and locked product decisions. They are
binding until explicitly changed.

## Scope

**In:**

- Fix the runtime baseline (missing `provideHttpClient`, stuck loading states,
  no error handling).
- Rebuild the shell (sidebar, header, avatar dropdown, theme toggle) in Tailwind.
- Rebuild the four live screens in Tailwind.
- Add route-driven header titles and active-link states.
- Centralize personal/profile content in one typed config module.
- Add ESLint, Prettier config, GitHub Actions CI, and meaningful tests.
- Remove Spartan incrementally, then fully uninstall and delete `libs/ui`.

**Out:**

- Restoring the legacy `bak/**` Portfolio / Experience / Project screens or
  `ProjectDialog` (dropped permanently).
- CRUD/write features; the app stays read-only for now.
- Backend changes (C# / .NET API is a separate repository).
- Full visual redesign; only a light refresh is allowed.

## Locked decisions

1. **Visual scope:** light refresh only. Keep screens, flow, routes, and
   features; improve spacing, typography, and card styling.
2. **Legacy screens:** `features/dashboard/bak/**`, `ProjectDialog`, `Card`,
   `Item`, `SectionButton`, `SkeletonCard` are deleted. Keep `Maintenance` for now
3. **Spartan removal:** incremental during the rewrite; full uninstall/cleanup
   at the end.
4. **Overview cards:** remove the inert "View Details →" buttons; cards are
   informational only.
5. **Header title:** derive from the active route; highlight the active sidebar
   item.
6. **Sidebar header:** the avatar becomes a dropdown containing **View profile**,
   **Download CV**, and **Theme toggle**. Profile is not a separate menu item.
7. **Icons:** keep `@ng-icons/core` + `@ng-icons/lucide`; replace the `HlmIcon`
   wrapper with plain Tailwind sizing/alignment.
8. **Personal content:** name, handle, bio, GitHub, CV, and avatar paths move to
   a single typed config module.
9. **Backend writes:** read-only. Do not build CRUD UI in this rewrite.
10. **Theme:** dark is the default; a persisted light/dark toggle respects
    `prefers-color-scheme` on first load.
11. **Tooling:** ESLint, Prettier config, GitHub Actions CI, real tests.
12. **Plans:** sequential numbering in `.github/plans/`.

## Affected surface

- **Routes:** `/dashboard`, `/timeline`, `/profile`, `/blog`, wildcard →
  `/dashboard` (unchanged URLs).
- **Shell:** `features/dashboard/shell/dashboard.*`, new sidebar and header
  components, theme service.
- **Screens:** `pages/overview`, `pages/timeline`, `pages/profile` (+
  `recommendations`, `skill`), `pages/blog`.
- **Shared:** `shared/services/*`, `shared/store/*`, `shared/utils/*`,
  `core/api/api-client.ts`, `core/constants/*`.
- **Styles:** `src/styles.css` design tokens and Tailwind theme.
- **Config:** new typed profile/site config module.
- **Assets:** `public/grad_1.jpeg`, `public/jg-profile.png`.
- **Endpoints:** no changes; five live GET endpoints.
- **Tooling:** `package.json`, ESLint/Prettier configs, `.github/workflows/`,
  `src/app/app.spec.ts`.
- **Removal:** `libs/ui/**`, `components.json`, `@spartan-ng/*` dependencies, the
  Spartan preset import, `features/dashboard/bak/**`, unused components.

## Tasks

### Phase 0 — Baseline fixes

- [ ] Add `provideHttpClient(withFetch())` to `app.config.ts`.
- [ ] Fix `PortfolioSignalService` so failures exit the loading state and expose
      an error message.
- [ ] Add a shared error and empty state pattern for data screens.
- [ ] Remove `console.log` from services and the shell.
- [ ] Remove the overview "View Details →" buttons and fix the nested-button HTML.

### Phase 1 — Tooling

- [ ] Add ESLint (Angular/TypeScript recommended) and `npm run lint`.
- [ ] Add a Prettier config file; keep `printWidth: 100`, `singleQuote: true`.
- [ ] Replace the stale `app.spec.ts` with shell/routing tests.
- [ ] Add GitHub Actions CI: install → lint → build → test.

### Phase 2 — Design tokens and theme

- [ ] Replace the Spartan preset import with Tailwind v4 `@theme` / CSS
      variables.
- [ ] Define both light and dark token sets, including `color-scheme`.
- [ ] Add a theme service that persists the choice and respects
      `prefers-color-scheme` on first load.
- [ ] Verify all existing colors remain legible in both themes.

### Phase 3 — Shell

- [ ] Rebuild the sidebar in plain Tailwind: header, menu, footer, collapse.
- [ ] Implement mobile off-canvas behavior (overlay, close on navigate, Escape).
- [ ] Build the sticky header with sidebar trigger and route-driven page title.
- [ ] Add active-link styling with `routerLinkActive`.
- [ ] Replace the avatar link with a dropdown: View profile, Download CV, Theme
      toggle. Include keyboard and outside-click behavior.

### Phase 4 — Screens

- [ ] Rebuild the overview: header, responsive metric cards, no action buttons.
- [ ] Rebuild the timeline: career section, experience cards, year badge,
      nested projects, tech chips.
- [ ] Rebuild the profile: hero, GitHub/CV links, recommendations, skills.
- [ ] Rebuild the blog: numbered entries, external links, URL rewrite, hover
      lift, dark/light support.
- [ ] Replace `SkeletonItem` with Tailwind-only skeleton primitives.
- [ ] Verify loading, empty, and error states on every screen.

### Phase 5 — Configuration

- [ ] Create a typed config module for profile/site content (name, handle, bio,
      GitHub, CV, avatar paths).
- [ ] Move the Notion page ID and public domain out of components (config module
      or environment; decide during this phase).
- [ ] Remove hardcoded personal strings from templates.

### Phase 6 — Spartan cleanup

- [ ] Remove remaining `@spartan-ng/*` imports and Brain services.
- [ ] Delete `libs/ui/**` and `components.json`.
- [ ] Uninstall `@spartan-ng/brain` and `@spartan-ng/cli`.
- [ ] Remove the Spartan preset import and unused dependencies
      (`class-variance-authority`, `clsx`, `tailwind-merge` if unreferenced).
- [ ] Delete `features/dashboard/bak/**` and the unused components listed above.
- [ ] Confirm no `@spartan-ng` or `libs/ui` references remain.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Sidebar collapse/mobile behavior regressions | Build behavior in Phase 3 with explicit keyboard, overlay, and resize checks. |
| Theme flash or unreadable colors | Define tokens before screens; test both themes on every screen. |
| Losing a feature during the rewrite | Use `.github/docs/screens.md` as the acceptance checklist. |
| API failures leaving stuck skeletons | Phase 0 error/empty states before UI work. |
| Accidental new Spartan usage | Enforced by `.github/rules/tailwind.md` and final grep check. |
| Breaking routes/links | Keep URLs unchanged; verify all four routes plus wildcard. |

## Pending questions

1. **Notion configuration:** central config module vs. environment variables.
2. **API docs:** Swagger/OpenAPI is not exposed today; the owner will fix it
   later. Until then, `environment.portfolioApi` plus `core/models` is the
   contract.
3. **Deployment:** confirm CORS, auth, and environment-variable requirements for
   Vercel and the .NET API.

## Verification

- [ ] `npm run build` succeeds with no new warnings.
- [ ] `npm test` passes.
- [ ] `npm run lint` passes.
- [ ] `/dashboard`: overview loads, no action buttons, counts render.
- [ ] `/timeline`: experiences and nested projects render.
- [ ] `/profile`: hero, links, recommendations, and skills render.
- [ ] `/blog`: entries render and open the correct public Notion URLs.
- [ ] Header title matches the active route on load, navigation, and reload.
- [ ] Active sidebar item is highlighted.
- [ ] Avatar dropdown works with mouse and keyboard; theme choice persists.
- [ ] Mobile sidebar opens, navigates, and closes correctly.
- [ ] Both light and dark themes render correctly on every screen.
- [ ] `grep -r "@spartan-ng\|libs/ui" src/` returns nothing.
- [ ] `.github/docs/` reflects the post-rewrite state.
