# 013 — Profile skills grid

Status: In progress
Owner: agent
Related docs: `.github/docs/screens.md`

## Goal

Show up to three skill tiles per row on larger screens while preserving the
existing one- and two-column responsive layouts.

## Scope

In:

- Add a larger-screen three-column breakpoint to the Profile skills grid.
- Update the Profile screen documentation.

Out:

- Changing skill content, data, or other Profile layouts.

## Affected surface

- Routes: `/profile`
- Components: `pages/profile/components/skill.ts`
- Services / models: none
- Endpoints: none
- Assets / config: none

## Tasks

- [x] Add three columns at the large-screen breakpoint.
- [x] Update the Profile screen documentation.
- [x] Build and confirm Tailwind generates the `lg` three-column rule.

## Risks / decisions

- Keep the existing two-column `380px` breakpoint and add three columns at `lg`.
- Browser verification was unavailable because permission to open the shared
  browser page was denied; the built CSS confirms the three-column `lg` rule.

## Verification

- [x] `npm run build`
- [ ] Manual: `/profile` at mobile and desktop widths (browser permission denied).
