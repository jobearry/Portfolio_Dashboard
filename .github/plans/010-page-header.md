# 010 — Reusable page header

Status: Done
Owner: agent
Depends on: 007, 009
Related docs: `.github/docs/screens.md`, `.github/docs/current-state.md`

## Goal

Extract the timeline header into a shared `PageHeader` component and use it on
both `/timeline` and `/blog`.

## Scope

**In:**

- Shared `src/app/shared/ui/page-header/page-header.ts` with eyebrow, title, and
  optional description inputs.
- Timeline uses the shared component instead of inline header markup.
- Blog gets a matching header above its entries.
- Component test and docs update.

**Out:**

- Changing Overview or Profile headers.
- Data, routes, or state behavior.

## Tasks

- [x] Build `PageHeader` (`app-page-header`) with `h2` and token styling.
- [x] Use it on Timeline with the existing Career / Experience timeline copy.
- [x] Add it to Blog with Writing / Notes from the journey copy.
- [x] Export from the shared barrel and add a component test.
- [x] Update `screens.md` and `current-state.md`.

## Verification

- [x] Timeline and Blog render the header in light and dark at 320 / 768 / 1280.
- [x] No horizontal overflow; heading order stays `h1` → `h2` → `h3`.
- [x] `npm run lint`, `npm run build`, `npm test` pass.
