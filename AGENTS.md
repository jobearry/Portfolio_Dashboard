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

The UI is **plain Tailwind CSS**; the Spartan-to-Tailwind rewrite completed in
008. The agreed approach and locked decisions are in `.github/plans/`.

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
2. **No Spartan UI.** It was removed in 008. Do not reintroduce `@spartan-ng/*`,
   a vendored `libs/ui`, or a Spartan Tailwind preset; build with plain Tailwind.
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

These are real constraints and intentional gaps, not hypotheticals:

- `Maintenance` is retained but unrouted; it is plain Tailwind, not a route.
- Blog intentionally has no pagination, search, or excerpts.
- `scripts/genenv.js` requires `.env` (`dotenv` is explicit); running
  `npm run build` rewrites `src/environments/*.ts`.

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
src/app/core/            # ApiClient, site config, theme, sidebar menu
src/app/features/dashboard/
  shell/                 # sidebar + header + router outlet
  pages/                 # overview, timeline, profile, blog
  core/                  # models
src/app/shared/          # services, signal state, utils
src/app/components/      # Maintenance placeholder (unrouted)
src/environments/        # generated by scripts/genenv.js — do not edit
public/                  # static assets
.github/docs/            # current state
.github/rules/           # mandatory rules
.github/plans/           # implementation plans
```
