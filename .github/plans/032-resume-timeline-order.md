# 032 — Order résumé timeline by start date

Status: Done
Owner: agent
Related docs: `.github/docs/screens.md`
Builds on: plans 027, 028, and 031

## Goal

Display résumé experience entries in descending start-date order, matching the
dashboard timeline.

## Scope

In:

- Sort a copy of the résumé timeline experiences by `startedAt`, newest first.
- Add a test proving ordering without mutating the service response.
- Update résumé screen documentation.

Out:

- No change to the API request, timeline layout, or dashboard ordering.

## Affected surface

- Routes: none.
- Components: résumé home timeline.
- Services / models: reuse existing `ExperienceSignalService` and
  `ExperienceTimeline`.
- Endpoints: unchanged.
- Assets / config: none.
- Tests: résumé timeline component spec.
- Docs: `.github/docs/screens.md`.

## Tasks

- [x] Render experiences newest to oldest by `startedAt`.
- [x] Add focused ordering coverage.
- [x] Update documentation and plan status.
- [x] Run focused tests, lint, formatting, and production build.

## Risks / decisions

- Follow the dashboard's established descending start-date ordering.
- Sort a copied array to avoid mutating shared signal state.

## Verification

- Out-of-order API data appears newest first in the résumé timeline.
- The source array remains in its original API order.
- Existing loading, empty, retry, and endpoint-request tests continue to pass.
