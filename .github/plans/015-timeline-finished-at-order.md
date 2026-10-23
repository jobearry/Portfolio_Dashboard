# 015 — Timeline start-date ordering

Status: In progress
Owner: agent
Related docs: `.github/docs/screens.md`

## Goal

Display timeline experiences by `startedAt` descending.

## Scope

In:

- Sort a copied timeline list in the Timeline component for display.
- Add focused coverage for descending start-date order.
- Document the timeline ordering.

Out:

- Changing API ordering or shared service state.
- Changing other screens.

## Affected surface

- Routes: `/timeline`
- Components: `pages/timeline/timeline.ts`
- Services / models: none
- Endpoints: none
- Assets / config: none

## Tasks

- [x] Derive timeline display order by `startedAt` descending.
- [x] Test sorting behavior without mutating fetched state.
- [x] Update the timeline screen documentation.
- [x] Run the focused Timeline tests and application build.

## Risks / decisions

- Keep API response order intact in the shared signal service; apply ordering
  only to the Timeline view.
- `startedAt` is required by the timeline model, so ordering uses its parsed
  date value directly.
- The full test suite has one failing, unrelated Overview test
  (`overview.spec.ts:73`) asserting a card class; the focused Timeline tests
  pass, and the Overview test was not changed.

## Verification

- [x] `npm run build`
- [ ] `npm test` (one unrelated Overview test currently fails)
- [ ] Manual: `/timeline` ordering and loading, empty, and error states
- [ ] Responsive and keyboard checks
