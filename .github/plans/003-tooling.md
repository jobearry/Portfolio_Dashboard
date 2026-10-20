# 003 — Tooling guardrails (ESLint, Prettier, tests, CI)

Status: Done
Owner: Jonathan Golimlim
Depends on: 002
Related docs: `.github/docs/gaps.md` (tooling section), `.github/docs/current-state.md`

## Goal

Put a safety net under the risky phases: lint, format, real tests, and CI that
runs on every pull request before the shell and screens are rewritten.

## Scope

**In:**

- ESLint flat config for TypeScript + Angular templates, with `npm run lint`.
- A Prettier config file (removed from `package.json`).
- A real `app.spec.ts` (shell + routing).
- GitHub Actions workflow: install → lint → format check → build → test.

**Out:**

- E2E / Playwright.
- Coverage thresholds.
- Linting `libs/ui` (ignored; it is deleted in 008).
- Pre-commit hooks.
- Formatting non-`src/` files (the repo-wide pass was scoped to `src/`).

## Affected surface

- `package.json` (scripts, devDependencies, inline `prettier` block removed)
- New: `eslint.config.js`, `.prettierrc`, `.prettierignore`
- `src/app/app.spec.ts` (rewritten)
- New: `.github/workflows/ci.yml`
- `src/app/components/sidebar/sidebar.ts` (`onItemClick` → `itemClick` to satisfy
  `@angular-eslint/no-output-on-prefix`)
- `src/app/features/dashboard/shell/dashboard.html` (matching binding)
- `src/app/features/dashboard/pages/home/dashboard-home.ts` (empty lifecycle
  removed)
- `src/app/features/dashboard/core/models/portfolio.ts` (empty interface →
  type alias)
- Whole `src/` reformatted by Prettier (mechanical)

## Decisions

- **ESLint: conservative.** Errors for real defects (unused imports/vars,
  `no-explicit-any`, Angular selector rules, template issues via
  `templateRecommended`). Styling is owned by Prettier via
  `eslint-config-prettier`. No blanket disables; the four violations found were
  fixed in code.
- **Prettier: format `src/` once.** One mechanical diff now so later phase diffs
  stay reviewable. `format:check` is enforced in CI.
- **CI triggers:** every pull request plus pushes to `main`.
- **Tests:** shell + routing only (plus the 002 service/overview specs).
  Component tests for the other screens would be rewritten in 007.
- **Dependencies added (reason):** `eslint` + `@eslint/js` + `typescript-eslint`
  + `angular-eslint` (lint TS and Angular templates),
  `eslint-config-prettier` (stop lint/format conflicts), `prettier` (formatter).
  No runtime dependency added.

## Tasks

- [x] Add devDependencies: `eslint`, `@eslint/js`, `typescript-eslint`,
      `angular-eslint`, `eslint-config-prettier`, `prettier`.
- [x] Add `eslint.config.js`: TS + Angular template configs, ignores `dist/`,
      `.angular/`, `node_modules/`, `libs/ui/**`, `src/environments/**`.
- [x] Add `"lint": "eslint \"src/**/*.{ts,html}\""`.
- [x] Add `.prettierrc` (`printWidth: 100`, `singleQuote: true`, Angular HTML
      parser) and `.prettierignore`; remove the inline `prettier` block from
      `package.json`.
- [x] Add `format` / `format:check` scripts scoped to `src/`.
- [x] Fix existing violations instead of disabling rules:
      unused `CommonModule`, `onItemClick` output name, empty `PortfolioItems`
      interface, empty `DashboardHome.ngOnInit`.
- [x] Replace `app.spec.ts` with shell + routing tests (lazy routes, wildcard
      redirect, all four live routes reachable).
- [x] Add `.github/workflows/ci.yml`: `npm ci` → lint → format check → build →
      test, on PRs and pushes to `main`.
- [x] Keep CI independent of `.env`: `scripts/genenv.js` writes empty values
      when no environment is present, and the build still compiles.

## Verification

- [x] `npm run lint` — passes with no ignored violations.
- [x] `npm run format:check` — all `src/` files match.
- [x] `npm test` — 10 tests pass across 3 spec files.
- [x] `npm run build` — passes.
- [x] Routing tests fail if a route is removed (the four live routes and the
      wildcard redirect are asserted).
- [ ] CI workflow executed on GitHub (first push/PR will confirm).

## Risks / decisions

- **Existing violations:** four were found and fixed in code; no rule needed a
  blanket disable.
- **CI and `.env`:** the workflow never reads `.env`; the generated empty host
  only affects runtime requests, not compilation.
- **`libs/ui` excluded:** it is vendored and deleted in 008, so linting it is
  waste.
- **Formatting churn:** the repo-wide Prettier pass touches most `.ts`/`.html`
  files. This is intentional and should be reviewed as a mechanical commit.

## Exit criteria

Every later phase starts and ends with lint + format + tests + build green,
locally and in CI.
