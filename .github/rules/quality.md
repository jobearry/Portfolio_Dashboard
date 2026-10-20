# Rule: Definition of Done

**Status: mandatory.** A change is not complete until every item below is true.

## Verification

- [ ] `npm run build` succeeds with no new warnings.
- [ ] `npm test` passes.
- [ ] `npm run lint` passes once ESLint is added.
- [ ] All live screens still render: `/dashboard`, `/timeline`, `/profile`, `/blog`.
- [ ] Every affected data screen handles loading, empty, and error states.
- [ ] Keyboard navigation and `:focus-visible` states work.
- [ ] Responsive behavior is verified from mobile to desktop.
- [ ] No `@spartan-ng/*` or `libs/ui` imports were added.
- [ ] No `console.log`, commented-out code, or unused imports were introduced.
- [ ] No secrets or environment-specific URLs were committed.

## Process

- [ ] A plan exists in `.github/plans/` and its checklist is satisfied.
- [ ] The plan status is updated (`In progress` → `Done`).
- [ ] `.github/docs/` is updated if routes, endpoints, models, UI behavior, or
  tooling changed.
- [ ] Deviations from the plan are recorded in the plan file.

## Anti-patterns

Do not:

- mark work done while a known failure or stuck loading state remains,
- defer documentation to a follow-up change,
- leave dead code "for later" without a plan,
- add a dependency without recording the reason in the plan,
- claim tooling (ESLint, CI, tests) exists before it is committed.
