# 009 — Timeline header

Status: Done (superseded by 010 for the shared component)
Owner: agent
Depends on: 007
Related docs: `.github/docs/screens.md`

## Goal

Replace the lone `CAREER` label on `/timeline` with a simple page header that
gives the list context, without changing data or behavior.

## Scope

**In:**

- An eyebrow, heading, and short caption above the experience list.
- Keep the existing heading hierarchy (`h2` → `h3` → `h4` → `h5`).

**Out:**

- Timeline data, filters, dialogs, or route changes.
- Header changes on other screens.

## Tasks

- [x] Replace the label-only header with eyebrow + `h2` + caption.
- [x] Keep the loading, empty, and error branches unchanged.
- [x] Update `screens.md`.

## Verification

- [x] `/timeline` renders the header in light and dark at 320 / 768 / 1280.
- [x] No horizontal overflow; heading order remains valid.
- [x] `npm run lint`, `npm run build`, `npm test` pass.
