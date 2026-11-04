# 031 — Disable nested experience and project data

Status: Done
Owner: agent
Related docs: `.github/docs/current-state.md`, `.github/docs/screens.md`
Builds on: plans 023 and 030

## Goal

Request experience and project lists with nested data disabled while keeping the
résumé pages resilient when those nested collections are omitted.

## Scope

In:

- Set `includeProjects=false` for the résumé experience request.
- Set `includeTools=false` for résumé client projects.
- Safely render projects when the API omits tool collections.
- Update focused tests and current endpoint documentation.

Out:

- No change to dashboard timeline behavior.
- No change to visible project or timeline layout.

## Affected surface

- Routes: none.
- Components: résumé home timeline and projects page data mapping.
- Services / models: `ResumeProjectSignalService`; project model optional tools.
- Endpoints: `GET v1/experience?includeProjects=false`,
  `GET v1/project?includeTools=false`.
- Assets / config: none.
- Tests: résumé timeline, project service, and projects page specs.
- Docs: backend rule and current-state/screen docs.

## Tasks

- [x] Switch both API query parameters to `false`.
- [x] Handle omitted project tool collections safely and adjust tests.
- [x] Update endpoint documentation.
- [x] Run focused tests, lint, formatting, and production build.

## Risks / decisions

- `includeTools=false` can omit the tool collection; project rendering must not
  assume `techStackSpecs` is present.

## Verification

- Both services request the exact false-valued query parameters.
- Projects render without tool data, while timeline company/role/year and
  loading, empty, and retryable error states remain.
