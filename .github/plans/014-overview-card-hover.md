# 014 — Overview card hover border

Status: In progress
Owner: agent
Related docs: `.github/docs/screens.md`

## Goal

Highlight Overview cards with the existing brand accent border on hover.

## Scope

In:

- Add a smooth hover transition from the neutral card border to the existing
  accent brand color.
- Update the Overview screen documentation.

Out:

- Changing card content, interaction behavior, or other dashboard layouts.

## Affected surface

- Routes: `/dashboard`
- Components: `pages/overview/overview.html`
- Services / models: none
- Endpoints: none
- Assets / config: none

## Tasks

- [x] Add the accent border hover effect.
- [x] Update the Overview screen documentation.
- [ ] Build and verify the generated hover CSS.

## Risks / decisions

- Use the existing `accent-brand` token; retain `border-border` as the resting
  border color.

## Verification

- [ ] `npm run build`
- [ ] Confirm generated CSS uses the accent token on hover.
