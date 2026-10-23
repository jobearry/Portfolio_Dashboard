# 012 — Overview card width and subtitles

Status: In progress
Owner: agent
Related docs: `.github/docs/screens.md`, `.github/docs/current-state.md`

## Goal

Keep Overview metric cards compact on wide screens and add explanatory subtitles
that correspond to each metric key.

## Scope

In:

- Constrain the Overview metric grid width while preserving its responsive layout.
- Show a locally defined subtitle for known metric keys and a useful fallback
  for unrecognized keys.
- Cover subtitle and card layout classes in Overview tests and update the screen
  documentation.

Out:

- Changing the `v1/overview` endpoint or response model.
- Changing other dashboard routes or their layout.

## Affected surface

- Routes: `/dashboard`
- Components: `pages/overview`
- Services / models: none
- Endpoints: `GET v1/overview` (unchanged)
- Assets / config: none

## Tasks

- [x] Add matching subtitles for the known overview metric keys.
- [x] Limit the metric grid width to `56rem` on desktop and preserve the mobile layout.
- [x] Add focused coverage for subtitles and constrained grid layout.
- [x] Update current-state and screen documentation.
- [x] Build the app and verify desktop/mobile grid sizing in the browser.
- [x] Run focused lint and formatting checks.
- [ ] Run focused Overview tests and the full test suite.

## Risks / decisions

- The API may return keys beyond the currently visible metrics; unknown keys
  retain their API-provided title and receive generic supporting copy.
- The focused test command is blocked before executing tests by existing
  TypeScript errors in `timeline.spec.ts` against `ExperienceTimeline`.
- A duplicate metric loop was observed in the worktree during validation and
  left unchanged at the user's direction.

## Verification

- [ ] Focused Overview tests and `npm test` (blocked by the Timeline spec errors above).
- [x] `npm run build`
- [x] Focused ESLint and Prettier checks.
- [x] Manual: `/dashboard` grid sizing on desktop and mobile.
- [ ] Manual: loading, empty, error, and keyboard states.
