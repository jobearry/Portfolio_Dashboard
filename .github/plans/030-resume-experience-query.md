# 030 — Align résumé experience request

Status: Done
Owner: agent
Related docs: `.github/docs/current-state.md`, `.github/docs/screens.md`
Builds on: plans 027 and 028

## Goal

Use the documented experience API request on the résumé timeline, matching the
backend contract.

## Scope

In:

- Request `v1/experience?includeProjects=true` from the résumé timeline.
- Assert the exact endpoint and query parameter in the component test.
- Correct the endpoint inventory and résumé screen documentation.

Out:

- No change to dashboard timeline behavior or résumé presentation.

## Affected surface

- Routes: none.
- Components: résumé home timeline.
- Services / models: reuse existing `ExperienceSignalService` and
  `ExperienceTimeline`.
- Endpoints: `GET v1/experience?includeProjects=true`.
- Assets / config: none.
- Tests: résumé timeline component spec.
- Docs: `.github/docs/current-state.md`, `.github/docs/screens.md`.

## Tasks

- [x] Align the résumé request with the experience endpoint query contract.
- [x] Verify endpoint, data rendering, and API states in focused tests.
- [x] Update documentation and plan status.
- [x] Run focused tests, lint, formatting, and production build.

## Risks / decisions

- The backend integration rule lists `includeProjects=true` as the live
  experience endpoint. The dashboard currently requests `false`; its behavior
  is left unchanged.

## Verification

- The résumé request URL is exactly `v1/experience?includeProjects=true`.
- Company, role, and year still render; loading, empty, and retryable error
  states remain intact.

## Validation note

- Focused résumé timeline tests pass (4/4); lint, formatting, production build,
  and `git diff --check` pass.
- The full suite currently fails in the existing Technical Stack spec because
  it expects `/v1/skills` while the service requests `/v1/skill`. That failure
  is unrelated to this experience endpoint change.
