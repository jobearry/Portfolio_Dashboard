# Rule: Planning Before Implementation

**Status: mandatory.** This rule overrides convenience. Do not write code first
and document later.

## Requirement

Every unit of work — feature, refactor, migration step, bug fix, tooling change —
must have a plan file in `.github/plans/` **before** implementation begins.

- No plan → no implementation.
- One plan per unit of work. Split large efforts into sequential plans.
- Plans live in `.github/plans/`; rules live in `.github/rules/`; current-state
  documentation lives in `.github/docs/`. Do not mix their contents.

## Naming

Sequential, zero-padded, kebab-case. Find the highest existing number and
increment it:

```
001-tailwind-rewrite.md
002-error-states.md
003-ci-pipeline.md
```

Never renumber or reuse an existing plan number.

## Required structure

```md
# <Plan title>

Status: Draft | In progress | Done
Owner:
Related docs: `.github/docs/...`

## Goal

## Scope

In:
Out:

## Affected surface

- Routes:
- Components:
- Services / models:
- Endpoints:
- Assets / config:

## Tasks

- [ ] ...

## Risks / decisions

## Verification

- [ ] `npm run build`
- [ ] `npm test`
- [ ] Manual: /dashboard, /timeline, /profile, /blog
```

## Lifecycle

1. Create the plan as `Draft`.
2. Set `In progress` when work starts.
3. Check off tasks as they land; record deviations and decisions in the plan.
4. Set `Done` when verification passes.
5. **Never delete a shipped plan.** Plans are part of the repository history.

## Verification is part of the plan

A plan is not complete until its verification checklist passes. Include, at
minimum:

- production build
- unit tests
- manual check of every affected route
- loading, empty, and error states when data fetching is involved
- responsive and keyboard checks when UI is involved
