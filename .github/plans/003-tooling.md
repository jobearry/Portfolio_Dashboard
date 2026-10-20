# 003 — Tooling guardrails (ESLint, Prettier, tests, CI)

Status: Draft
Owner:
Depends on: 002
Related docs: `.github/docs/gaps.md` (tooling section)

## Goal

Put a safety net under the risky phases: lint, format, real tests, and CI that
runs on every push/PR before the shell and screens are rewritten.

## Scope

**In:**

- ESLint flat config for TypeScript + Angular templates, with `npm run lint`.
- A Prettier config file (config currently lives inside `package.json`).
- A real `app.spec.ts` (shell + routing), replacing the stale assertion.
- GitHub Actions workflow: install → lint → build → test.

**Out:**

- E2E / Playwright.
- Coverage thresholds.
- Linting `libs/ui` (ignored; it is deleted in 008).
- Pre-commit hooks (optional follow-up, not required).

## Affected surface

- `package.json` (scripts, devDependencies, remove the inline `prettier` block)
- New: `eslint.config.js`, `.prettierrc`, `.prettierignore`
- `src/app/app.spec.ts` (rewrite)
- New: `src/app/features/dashboard/shell/dashboard.spec.ts`, routing spec
- New: `.github/workflows/ci.yml`
- `angular.json` (only if `ng lint` wiring is chosen over raw `eslint`)

## Tasks

- [ ] Add devDependencies: `eslint`, `@eslint/js`, `typescript-eslint`,
      `angular-eslint`, `@angular-eslint/template-parser`,
      `eslint-config-prettier`, `prettier`. Record the reason in this plan
      (required by `.github/rules/quality.md`).
- [ ] Add `eslint.config.js`: typescript-eslint recommended, angular-eslint
      template rules, ignore `dist/`, `.angular/`, `libs/ui/**`.
- [ ] Add `"lint": "eslint \"src/**/*.{ts,html}\""` (no `ng lint` builder needed).
- [ ] Add `.prettierrc` with `printWidth: 100`, `singleQuote: true`, and the
      Angular HTML parser override; remove the `prettier` block from
      `package.json`.
- [ ] Add `.prettierignore` (`dist`, `.angular`, `libs/ui`, `src/environments`).
- [ ] Fix existing lint errors rather than disabling rules wholesale; if a rule
      must be deferred, record it in this plan with a follow-up reference.
- [ ] Replace `app.spec.ts`: mount `App` with the real `routes`, assert the shell
      renders, assert wildcard redirects to `/dashboard`, assert unknown route
      does not blow up.
- [ ] Add a routing test that each child route resolves its lazy component (can
      assert the router URL after navigation).
- [ ] Add `.github/workflows/ci.yml`:
      `actions/checkout` → `actions/setup-node` (Node 22, npm cache) →
      `npm ci` → `npm run lint` → `npm run build` → `npm test`.
- [ ] CI note: `npm run build` runs `scripts/genenv.js`, which needs no `.env`
      to succeed (it writes empty values). Do **not** commit `.env`; if a real
      API host is needed for a build check, pass `PORTFOLIO_API_HOST` from a
      repository variable, never a secret in plain text.
- [ ] Confirm the CI badge/instructions are noted in `README.md` only if the
      repo already documents commands there.

## Risks / decisions

- **Timing:** lint is added before the big rewrites so every later phase is
  checked. Expect a burst of existing violations in this phase; fix them here,
  not with blanket disables.
- `libs/ui` is excluded from lint. It is deleted in 008, so linting it is waste.
- Tests use Vitest via `@angular/build:unit-test` + jsdom (already configured).
  Do not introduce Karma/Jest.
- CI must not require the private `.env`; build with empty env is acceptable for
  compile checks.

## Verification

- [ ] `npm run lint` passes locally on a clean tree.
- [ ] `npx prettier --check .` passes (or `npm run format:check` if added).
- [ ] `npm test` passes; the new specs fail if the router is broken (sanity
      check by temporarily breaking a route, then reverting).
- [ ] `npm run build` passes.
- [ ] Push/PR runs the workflow and it is green.
- [ ] No lint rule is disabled inline more than the recorded exceptions.

## Exit criteria

Every later phase starts and ends with lint + tests + build green, locally and in
CI.
