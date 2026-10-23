# 011 — Overview item rendering

Status: In progress
Owner: agent
Related docs: `.github/docs/screens.md`, `.github/docs/current-state.md`

## Goal

Keep overview metric labels dynamic by rendering the API-provided `key` in
uppercase, with `OverviewItem` focused only on the response fields.

## Scope

In:

- Render the API-backed count and uppercase key in Overview.
- Cover API-provided keys in Overview tests.
- Update the current-state and screen documentation.

Out:

- Changing the overview endpoint or its response shape.
- Changing other dashboard routes or card interactions.

## Affected surface

- Routes: `/dashboard`
- Components: `pages/overview`
- Services / models: `OverviewItem`
- Endpoints: `GET v1/overview` (unchanged)
- Assets / config: none

## Tasks

- [x] Keep the API model focused on `key` and `count`.
- [x] Render overview cards with uppercase API keys.
- [x] Update Overview tests to cover dynamic keys.
- [x] Update current-state and screen documentation.

## Risks / decisions

- The API key set is not documented in this repository; display the backend
  value as-is except for uppercasing, avoiding a client-side list of known keys.
- Angular compilation is currently blocked by unrelated pre-existing model
  mismatches in the modified Profile and Timeline files in the worktree; tests
  and the build fail before validating Overview.

## Verification

- [ ] Focused Overview tests.
- [ ] `npm run build`
- [ ] `npm test`
- [ ] Manual: `/dashboard` loading, empty, error, responsive, and keyboard states.
- [x] Focused ESLint and Prettier checks.
