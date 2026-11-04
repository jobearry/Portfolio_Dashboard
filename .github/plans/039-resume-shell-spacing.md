# 039 — Add résumé shell spacing

Status: In progress
Owner: agent
Related docs: `.github/docs/screens.md`

## Goal

Give the résumé landing page more breathing room, especially on desktop, while
preserving its responsive two-column layout.

## Scope

In:

- Center the résumé page in a max-width container.
- Increase responsive page padding and spacing between page sections.
- Add a desktop gutter between the résumé's side and main columns.
- Update screen documentation and layout coverage.

Out:

- No change to routes, content, or API behavior.
- No change to dashboard shell spacing.

## Affected surface

- Routes: résumé landing `/`.
- Components: résumé home page layout.
- Services / models: none.
- Endpoints: none.
- Assets / config: none.
- Tests: app route spec.
- Docs: `.github/docs/screens.md`.

## Tasks

- [x] Add a centered max-width layout with larger desktop padding and column gap.
- [x] Verify the résumé route retains responsive blocks and new spacing classes.
- [x] Update screen documentation and plan status.
- [x] Run focused tests, lint, formatting, and production build.

## Risks / decisions

- Use Tailwind responsive utilities so mobile spacing remains compact.
- Cap the public page width to prevent excessive line and column width on large
  monitors.

## Verification

- The résumé page is centered and width-capped.
- Desktop padding and column spacing exceed the current compact spacing.
- Existing page content, responsive breakpoints, and navigation remain.
