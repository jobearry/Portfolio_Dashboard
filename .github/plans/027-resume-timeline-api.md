# 027 — Load résumé timeline from the API

Status: Done
Owner: agent
Related docs: `.github/docs/current-state.md`, `.github/docs/screens.md`
Builds on: plans 020, 025, and 026

## Goal

Replace the résumé site's static timeline with the `v1/experience` API response,
displaying only each company's name and role.

## Scope

In:

- Reuse the dashboard `ExperienceTimeline` model and `ExperienceSignalService`.
- Fetch from `v1/experience`.
- Render only company and role in the résumé timeline.
- Show loading, empty, and retryable error states.
- Remove the now-unused static timeline data and update docs.

Out:

- No change to the dashboard Timeline screen or its endpoint query.
- No display of dates, descriptions, responsibilities, or nested projects in
  the résumé timeline.

## Affected surface

- Routes: none.
- Components: résumé home timeline component.
- Services / models: reuse `ExperienceSignalService` and `ExperienceTimeline`.
- Endpoints: `GET v1/experience`.
- Assets / config: none.
- Tests: focused résumé timeline component spec.
- Docs: `.github/docs/current-state.md`, `.github/docs/screens.md`.

## Tasks

- [x] Load and render API experiences with company and role only.
- [x] Add focused success, empty, loading, and error/retry coverage.
- [x] Update documentation and plan status.
- [x] Run tests, lint, formatting, and build.

## Risks / decisions

- Reuse the existing typed `ExperienceTimeline` API model; no inline response
  shape or model duplication.
- Keep the dashboard Timeline's existing query and behavior unchanged.

## Verification

- The résumé timeline requests exactly `v1/experience`.
- Each rendered row includes the company and role, without other experience
  fields.
- Loading, empty, and retryable error states render.
