# 026 — Load résumé skills from the API

Status: Done
Owner: agent
Related docs: `.github/docs/current-state.md`, `.github/docs/screens.md`,
Builds on: plans 020, 025

## Goal

Replace the résumé site's hardcoded Technical Stack list with skills returned by
`v1/skills`.

## Scope

In:

- Fetch skill items through the existing API client/service pattern.
- Reuse the typed `TechStackItem` model and group/display returned skills by
  their API category.
- Show loading, empty, and retryable error states.
- Add focused tests and update endpoint/screen documentation.

Out:

- No change to the parked dashboard Profile page or its legacy `v1/skill` call.
- No change to the résumé layout beyond dynamic skill data and its states.

## Affected surface

- Routes: none.
- Components: résumé home Technical Stack component.
- Services / models: reuse `SkillsSignalService` and `TechStackItem`.
- Endpoints: `GET v1/skills`.
- Assets / config: none.
- Tests: new Technical Stack component spec.
- Docs: `.github/docs/current-state.md`, `.github/docs/screens.md`,

## Tasks

- [x] Implement dynamic Technical Stack categories from the skills endpoint.
- [x] Add focused loading, success/grouping, empty, and error/retry coverage.
- [x] Update documentation and plan status.
- [x] Run focused tests, lint, formatting, and build.

## Risks / decisions

- The existing typed `TechStackItem` shape is `{ id, category, createdAt,
imgSrc, stackName }`; use `stackName` as the skill label and `category` as
  the group heading.
- The parked dashboard Profile still calls the separate legacy singular
  `v1/skill` endpoint.

## Verification

- [x] The résumé home requests `v1/skills`.
- [x] Skill labels and category groups come from the API response.
- [x] Loading, empty, and retryable error states render.
- [x] Focused Technical Stack tests (3 tests)
- [x] Full test suite (53 tests)
- [x] `npm run lint`
- [x] `npm run format:check` and Prettier doc checks
- [x] Development build
