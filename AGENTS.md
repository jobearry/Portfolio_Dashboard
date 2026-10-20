# AGENTS.md

Entry point for AI agents and contributors. This file is intentionally short:
**facts here, rules in `.github/rules/`, current state in `.github/docs/`, work
plans in `.github/plans/`.** When this file and a rule disagree, the rule wins.

## 1. What this is

A portfolio and résumé dashboard for a software engineer (Jonathan Golimlim).
It shows an overview, career timeline, profile with recommendations/skills, and
a Notion-backed blog. The app is **read-only**.

Angular SPA that consumes an external **C# / .NET REST API**; no server code
lives in this repository.

The UI is mid-migration from **Spartan UI to plain Tailwind CSS**. The agreed
approach and locked decisions are in the latest plan under `.github/plans/`.

## 2. Stack and commands

| Concern | Choice |
| --- | --- |
| Framework | Angular 21 — standalone, signals, lazy routes |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS v4 (PostCSS), dark by default |
| Icons | `@ng-icons/core` + `@ng-icons/lucide` |
| Tests | Vitest via `@angular/build:unit-test` |
| Hosting | Vercel |
| Backend | C# / .NET REST API at `environment.portfolioApi` |

```bash
npm start          # generate env + dev server (development)
npm run start:prod # generate env + dev server (production)
npm run build      # generate env + development build
npm run build:prod # generate env + production build (Vercel)
npm test           # unit tests
```

`npm start` / `npm run build*` run `scripts/genenv.js`, which **overwrites**
`src/environments/environment*.ts` from `.env`. Edit `.env`, never the generated
files. Never commit secrets.

## 3. Read before changing anything

- **Current state:** `.github/docs/`
  - `current-state.md` — architecture, routing, data layer, endpoints
  - `screens.md` — screen-by-screen behavior
  - `spartan-inventory.md` — Spartan surface and replacement scope
  - `gaps.md` — bugs, dead code, missing states

- **Mandatory rules:** `.github/rules/`
  - [`angular.md`](./.github/rules/angular.md) — components, signals, HTTP,
    routing, templates, accessibility
  - [`tailwind.md`](./.github/rules/tailwind.md) — tokens, theme, responsive
    design, Spartan migration constraints
  - [`backend.md`](./.github/rules/backend.md) — .NET API contract and
    integration
  - [`quality.md`](./.github/rules/quality.md) — definition of done
  - [`plans.md`](./.github/rules/plans.md) — planning requirement and template
  - [`documentation.md`](./.github/rules/documentation.md) — documentation rules

- **Work plans:** `.github/plans/` — read the latest numbered plan. Individual
  plans are not linked here on purpose; the directory is the source of truth.

## 4. Non-negotiables

1. **Plan first.** Every feature, refactor, or bug fix needs a numbered plan in
   `.github/plans/` before code is written.
2. **No new Spartan UI.** Do not add `@spartan-ng/*` imports, scaffold into
   `libs/ui`, or import the Spartan Tailwind preset. Replace incrementally with
   plain Tailwind; full removal happens at the end of the rewrite.
3. **Angular conventions.** Standalone components only; `inject()`; signals;
   `input()`/`output()`; `OnPush`; built-in control flow with `track`.
4. **Respect the HTTP boundary.** All requests go through `ApiClient` and
   entity services — never `HttpClient` in a component. `provideHttpClient()`
   must be registered.
5. **Type everything.** API responses live in `core/models`; no `any`, no inline
   response shapes. Handle loading, empty, and error states — never leave a
   skeleton running forever.
6. **Keep the routes.** `/dashboard`, `/timeline`, `/profile`, `/blog`, and
   wildcard → `/dashboard`. Titles and active states come from the router.
7. **Tailwind only.** Reuse design tokens; accent `#912F56`; never build class
   names dynamically (`bg-${color}`); mobile-first.
8. **Accessibility and valid HTML.** Landmarks, heading order, `aria-label` on
   icon-only controls, visible focus, no nested interactive elements.
9. **No secrets, no generated-file edits, no `console.log`.**
10. **Update the docs.** If behavior, routes, endpoints, models, or tooling
    change, update `.github/docs/` in the same change.

## 5. Known landmines

These are real defects in the current code, not hypotheticals:

- The header title is set by click handlers, not the route; it is blank on load.
- Profile is not in the sidebar menu (avatar only).
- Notion page ID and public domain are hardcoded.
- `components/skeletons/item` and `Maintenance` still use Spartan; several
  unused Spartan-tied components remain until the cleanup phase.
- Some unused constants/icons and the `common.styles.ts` vs
  `portfolio.styles.ts` overlap are still present.

See `.github/docs/gaps.md` for the full list.

## 6. Workflow

1. Read `.github/docs/` for the area you are touching.
2. Confirm or create the plan in `.github/plans/` (sequential numbering).
3. Implement in small steps; keep the plan updated.
4. Verify: `npm run build`, `npm test`, manual check of every affected route,
   loading/empty/error states, responsive and keyboard behavior.
5. Update `.github/docs/` and mark the plan `Done`.

The full definition of done is in `.github/rules/quality.md`.

## 7. Repository map

```
src/app/core/            # ApiClient, constants, shared styles
src/app/features/dashboard/
  shell/                 # sidebar + header + router outlet
  pages/                 # overview, timeline, profile, blog
  core/                  # models, styles
  constants/             # icon registry
src/app/shared/          # services, signal state, utils
src/app/components/      # reusable UI (being replaced)
src/environments/        # generated by scripts/genenv.js — do not edit
public/                  # static assets
.github/docs/            # current state
.github/rules/           # mandatory rules
.github/plans/           # implementation plans
```

Do not modify vendored `libs/ui/**` for new features; it is slated for removal.
