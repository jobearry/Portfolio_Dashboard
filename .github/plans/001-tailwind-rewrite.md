# 001 — Tailwind Rewrite (Spartan-free) — umbrella

Status: In progress
Owner: Jonathan Golimlim
Related docs: `.github/docs/current-state.md`, `.github/docs/screens.md`,
`.github/docs/spartan-inventory.md`, `.github/docs/gaps.md`
Related rules: `.github/rules/angular.md`, `.github/rules/tailwind.md`,
`.github/rules/backend.md`, `.github/rules/quality.md`, `.github/rules/plans.md`

## Goal

Rebuild the UI layer with **plain Tailwind CSS**, removing Spartan UI and
`libs/ui` while preserving every current feature and fixing the baseline defects
that prevent the app from working reliably.

This file is the umbrella: goal, scope, locked decisions, and the phase map.
The executable detail lives in the phase plans 002–008. When a phase plan and
this file disagree, the phase plan wins for that phase's tasks; the locked
decisions below always win.

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
   `Item`, `SectionButton`, `SkeletonCard` are deleted. Keep `Maintenance` for
   now. **Deleted in 002, not at the end.**
3. **Spartan removal:** incremental during the rewrite; full uninstall/cleanup
   in 008.
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
13. **Config before screens:** site/profile config (005) lands before the shell
    and screen rebuilds so templates are written once.
14. **Notion configuration:** the page ID and public domain live in the typed
    config module (decided 2026-10-20). They are public content values, not
    deployment secrets, so `scripts/genenv.js`, CI, and Vercel stay untouched.

## Phase map

| #   | Plan                         | Goal                                              | Gate (what you can trace)                                            |
| --- | ---------------------------- | ------------------------------------------------- | -------------------------------------------------------------------- |
| 0   | `002-baseline-runtime.md`    | Make the app work end to end and delete dead code | All 4 routes render data **or** an error; no skeleton can hang       |
| 1   | `003-tooling.md`             | Add lint, format, tests, CI                       | `lint` + `test` + `build` green locally and in CI                    |
| 2   | `004-design-tokens-theme.md` | Own tokens, light/dark, no Spartan preset         | No preset import; both themes legible; parity in dark                |
| 3   | `005-site-config.md`         | Typed site/profile config                         | No hardcoded personal strings in templates                           |
| 4   | `006-shell.md`               | Sidebar, header, mobile, dropdown, route titles   | Title + active link correct on load, reload, deep link, back/forward |
| 5   | `007-screens.md`             | Rebuild the four screens                          | `screens.md` checklist passes in both themes                         |
| 6   | `008-spartan-removal.md`     | Delete Spartan, `libs/ui`, dead code              | `grep -r "@spartan-ng\|libs/ui" src/` is empty                       |

Each phase is one commit / PR. Do not start phase N+1 until phase N's
verification checklist and exit criteria pass.

Progress: **002–007 Done.** 008 Draft.

## Cross-phase verification (run at the end of every phase)

- [ ] `npm run build` succeeds with no new warnings.
- [ ] `npm test` passes.
- [ ] `npm run lint` passes (from 003 onward).
- [ ] All four routes render: `/dashboard`, `/timeline`, `/profile`, `/blog`.
- [ ] Loading, empty, and error states behave (no stuck skeleton).
- [ ] Keyboard focus is visible; no nested interactive elements.
- [ ] Mobile (≤ 640px) and desktop layouts both work.
- [ ] `.github/docs/` is updated for any behavior, route, model, or tooling
      change.
- [ ] Phase plan status moved `Draft` → `In progress` → `Done`.

## Risks and mitigations

| Risk                                            | Mitigation                                                                                        |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Sidebar collapse/mobile behavior regressions    | Build behavior in 006 with explicit keyboard, overlay, and resize checks.                         |
| Theme flash or unreadable colors                | Define tokens before shell/screens; pre-bootstrap theme script; test both themes on every screen. |
| Losing a feature during the rewrite             | Use `.github/docs/screens.md` as the acceptance checklist.                                        |
| API failures leaving stuck skeletons            | 002 error/empty states land before UI work.                                                       |
| Accidental new Spartan usage                    | Enforced by `.github/rules/tailwind.md` and the 008 grep gate.                                    |
| Breaking routes/links                           | Keep URLs unchanged; verify all four routes plus wildcard.                                        |
| Deleting dead code breaks a hidden import       | 002: grep imports, then build; barrels updated in the same commit.                                |
| Preset removal breaks the not-yet-rebuilt shell | 004 must define the same token variable names the live Spartan components use.                    |

## Pending questions

1. **API docs:** Swagger/OpenAPI is not exposed today; the owner will fix it
   later. Until then, `environment.portfolioApi` plus `core/models` is the
   contract.
2. **Deployment:** confirm CORS, auth, and environment-variable requirements for
   Vercel and the .NET API.
3. **ESLint sequencing:** confirmed useful before the shell/screen rewrites
   (006/007), configured conservatively; the exact placement is settled when
   003 starts.

## Global verification (end of rewrite)

- [ ] `npm run build`, `npm run lint`, `npm test` pass.
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
- [ ] `libs/ui` and `components.json` are gone; dependencies uninstalled.
- [ ] `.github/docs/` reflects the post-rewrite state.
