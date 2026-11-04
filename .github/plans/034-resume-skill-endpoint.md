# 034 — Use singular résumé skill endpoint

Status: Done
Owner: agent
Related docs: `.github/docs/current-state.md`, `.github/docs/screens.md`
Builds on: plans 026 and 033

## Goal

Use the requested `v1/skill` endpoint for the résumé Technical Stack.

## Scope

In:

- Change the Technical Stack request and test to `v1/skill`.
- Correct current endpoint and screen documentation.

Out:

- No change to skill presentation, service/model, or dashboard profile behavior.

## Affected surface

- Routes: none.
- Components: résumé home Technical Stack.
- Services / models: reuse `SkillsSignalService` and `TechStackItem`.
- Endpoints: `GET v1/skill`.
- Assets / config: none.
- Tests: Technical Stack component spec.
- Docs: `.github/docs/current-state.md`, `.github/docs/screens.md`.

## Tasks

- [x] Switch the endpoint and test assertion to `v1/skill`.
- [x] Update current endpoint documentation.
- [x] Run focused tests, lint, formatting, and production build.

## Risks / decisions

- Follow the user's explicit endpoint choice; `.github/rules/backend.md` already
  identifies `v1/skill` as live.

## Verification

- Technical Stack requests exactly `v1/skill`.
- Existing success, grouping, empty, retry, and section sizing behavior remains.
