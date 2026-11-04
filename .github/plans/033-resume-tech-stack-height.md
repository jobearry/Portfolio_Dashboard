# 033 — Match résumé Technical Stack height

Status: Done
Owner: agent
Related docs: `.github/docs/screens.md`

## Goal

Give Technical Stack and Recent Projects equal-height content areas on the
résumé home page. Defer a View more link until a destination is defined.

## Scope

In:

- Apply the same fixed content height and overflow behavior to both sections.
- Keep all skills accessible by scrolling within the Technical Stack section.
- Ensure the skills request matches the documented `v1/skills` endpoint.
- Update focused tests and résumé screen documentation.

Out:

- No new page or route.
- No View more link until its destination/action is defined.

## Affected surface

- Routes: none.
- Components: résumé home Recent Projects and Technical Stack.
- Services / models: none.
- Endpoints: résumé skills uses `GET v1/skills` (corrected to match the
  documented endpoint).
- Assets / config: none.
- Tests: Technical Stack and Recent Projects component specs.
- Docs: `.github/docs/screens.md`.

## Tasks

- [x] Apply identical content-area sizing to both sections.
- [x] Verify skills remain scrollable and no View more link is rendered.
- [x] Verify the skills request uses `v1/skills`.
- [x] Update documentation and plan status.
- [x] Run focused tests, lint, formatting, and production build.

## Risks / decisions

- Use a shared fixed height with vertical scrolling so response length does not
  cause the sections to diverge.
- Omit View more for now, per user direction; do not create a destination page.

## Verification

- Both content sections use the same height utility.
- All skill groups remain in the DOM and can be reached by scrolling.
- No new route is introduced.
