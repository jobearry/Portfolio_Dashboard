# Hide résumé maintenance placeholder

Status: Done
Owner: agent
Related docs: `.github/docs/screens.md`, `.github/docs/gaps.md`

## Goal

Stop rendering the résumé Maintenance placeholder without deleting its component.

## Scope

In:

- Remove Maintenance from the résumé landing page's rendered block list.
- Keep the Maintenance component source available for future use.
- Update résumé screen and gap documentation.
- Verify the résumé route does not render the placeholder.

Out:

- No changes to the dashboard Maintenance component.
- No routes, API behavior, or other résumé blocks changed.

## Affected surface

- Routes: résumé landing `/`.
- Components: résumé home block configuration; résumé Maintenance remains available.
- Services / models: none.
- Endpoints: none.
- Assets / config: none.
- Tests: résumé route coverage.
- Docs: `.github/docs/screens.md`, `.github/docs/gaps.md`.

## Tasks

- [x] Remove the Maintenance block from the résumé page configuration.
- [x] Add regression coverage that the résumé page does not render it.
- [x] Update documentation.
- [x] Run focused tests, lint, formatting, and production build.

## Risks / decisions

- Remove only the résumé's configuration reference; preserve the component file.

## Verification

- The résumé route no longer renders `app-maintenance`.
- The Maintenance component remains in the codebase.
- Existing résumé content and route behavior remain intact.
