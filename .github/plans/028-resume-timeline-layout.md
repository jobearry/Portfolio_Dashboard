# 028 — Restore résumé timeline layout

Status: Done
Owner: agent
Related docs: `.github/docs/screens.md`
Builds on: plan 027

## Goal

Keep the résumé timeline's original visual layout while using the experience
API, and style the year with the theme accent token.

## Scope

In:

- Restore the original year badge, timeline line, and company/role arrangement.
- Derive the displayed year from the experience `startedAt` value.
- Use the theme accent color for the year badge.
- Update focused tests and screen documentation.

Out:

- No change to the API endpoint or dashboard timeline.
- No additional experience fields beyond year, company, and role.

## Affected surface

- Routes: none.
- Components: résumé home timeline.
- Services / models: reuse existing `ExperienceSignalService` and
  `ExperienceTimeline`.
- Endpoints: `GET v1/experience` (unchanged).
- Assets / config: none.
- Tests: résumé timeline component spec.
- Docs: `.github/docs/screens.md`.

## Tasks

- [x] Restore the prior timeline presentation and accent year.
- [x] Verify rendered year, company, and role along with loading, empty, and
      error/retry states.
- [x] Update screen documentation and plan status.
- [x] Run tests, lint, formatting, and build.

## Risks / decisions

- Use the year from `startedAt`; retain the previous single-year presentation.
- Keep the theme token static in Tailwind classes.

## Verification

- The timeline preserves the original year badge and vertical list layout.
- The year uses the `accent-brand` theme token.
- The API still requests exactly `v1/experience`.
