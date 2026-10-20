# 007 — Screens in plain Tailwind

Status: Done
Owner: agent
Depends on: 002, 004, 005, 006
Related docs: `.github/docs/screens.md` (source of truth for behavior),
`.github/docs/spartan-inventory.md` (sections 3 and 7)

## Goal

Rebuild the four live screens with plain Tailwind, preserving every current
feature and finishing the loading / empty / error treatment started in 002.
`SkeletonItem` (Spartan) is replaced with Tailwind skeleton primitives.

## Scope

**In:**

- Overview, timeline, profile (with recommendations + skills), blog.
- Shared skeleton primitive; delete `SkeletonItem`.
- Retire the `TRANSITION_MOVE_UP` / `PORTFOLIO_CARD_FOOTER_STYLES` string
  constants in favor of Tailwind classes.
- Loading, empty, error states on every screen.

**Out:**

- New features, filters, pagination, search, CRUD.
- Restoring dialogs or legacy screens.
- Shell work (006).

## Affected surface

- `src/app/features/dashboard/pages/home/dashboard-home.{ts,html}` →
  `pages/overview/overview.{ts,html}`
- `pages/timeline/timeline.ts` (inline template today)
- `pages/profile/profile.ts`, `pages/profile/components/{recommendations,skill}.ts`
- `pages/blog/blog.{ts,html}`
- New: `src/app/shared/ui/skeleton/skeleton.ts`
- Delete: `src/app/components/skeletons/item/skeleton-item.ts` and its barrel
  export
- `src/app/core/styles/common.styles.ts`,
  `features/dashboard/core/styles/portfolio.styles.ts` (trim dead constants)
- `src/app/features/dashboard/constants/portfolio.constant.ts` (unused icons)

## Tasks

### Overview

- [x] Header block: eyebrow, heading, caption; use explicit text classes instead
      of `HlmH1`. The section uses `h2` because the shell owns the page `h1`.
- [x] Metric cards in a responsive grid (`sm:grid-cols-3`), informational
      `<article>` elements (no buttons).
- [x] Numbers, labels, dividers, and description spacing per the light-refresh
      rule.
- [x] Empty state when the API returns zero items.
- [x] Delete `dashboard-home` if it only re-wraps `overview`; point the route at
      `overview` directly.

### Timeline

- [x] `CAREER` section label and vertical list of experience cards.
- [x] Company name, start-year pill (guard non-date strings; show nothing rather
      than `Invalid Date`), role + description, responsibility.
- [x] Nested `PROJECTS` block only when projects exist; tech chips per
      `techStackSpecs[].toolName`.
- [x] Empty message when the experience list is empty; no empty nested block.

### Profile

- [x] Hero: avatar, name, handle, bio — all from `site.config`.
- [x] GitHub + CV links: real anchors with visible focus. Decision: replace the
      shields.io images with icon + text buttons (outline GitHub, accent CV) so
      they render offline and follow theme tokens.
- [x] Recommendations: `FEEDBACK` heading with accent dot, cards with
      `personName`, `careerPosition.value`, quoted `description`; empty state.
- [x] Skills: `SKILL` heading, tile grid with `stackName` + `category`; empty
      state. Decision: one column below `380px`, two above (not three) to avoid
      clipping long names such as TailwindCSS.
- [x] Remove the unused `HlmH3` import from `skill.ts`.

### Blog

- [x] Numbered grid (2 columns from `lg`), two-digit index, title, date,
      external-link icon.
- [x] Keep `convertNotionUrl` behavior, including the parse-failure fallback.
- [x] Hover/focus lift via Tailwind classes; remove `TRANSITION_MOVE_UP`.
- [x] Empty state when content is `null` or `[]`; error state on failure.
- [x] Links: `target="_blank"`, `rel="noopener noreferrer"`, accessible name.

### Shared

- [x] Build a Tailwind skeleton primitive (`animate-pulse` blocks) and replace
      `SkeletonItem`; delete the old component and barrel entry.
- [x] Confirm the shared state component from 002 is used consistently.
- [x] Delete unused style constants and unused icon registrations
      (`lucideInfo`, `lucideToolCase`, `lucideLibraryBig`, `lucideDrill`,
      `lucideFileDown`; deduplicate `lucideUserCircle`).
- [x] Update `.github/docs/screens.md` and `.github/docs/gaps.md`.

## Risks / decisions

- **Skeleton shape:** skeletons must match the final layout (card grid, list,
  grid, entries) or the swap will jump. Implemented as one shared `app-skeleton`
  with variants and an optional `rows` count; no hero variant because the
  profile hero is static.
- **Overview greeting:** derived from `site.profile.name` instead of the old
  hardcoded "Than".
- **Heading levels:** the shell renders the page `h1`; screens start at `h2`
  (timeline/blog entries, profile name) and nest from there.
- **Shields.io badges:** replaced with themed icon + text buttons; labels and
  destinations are unchanged.
- **Timeline dates:** parse `startedAt` in the component and hide the pill for
  missing/invalid values; no `DatePipe`.
- **Blog null content:** `null` and `[]` both show the empty state.
- **No behavioral additions:** if a "nice to have" appears, it goes into a new
  plan, not this one.

## Verification

Per screen, in **both themes**, at 320px / 768px / 1280px:

- [x] `/dashboard`: header, 3-up cards, counts; no action buttons; empty state.
- [x] `/timeline`: experiences, year pills, nested projects, tech chips; empty
      state.
- [x] `/profile`: hero, links, recommendations, skills; both empty states.
- [x] `/blog`: entries, numbering, dates, icons, correct Notion URLs; empty and
      error states.
- [x] Loading shows the skeleton, success replaces it, failure shows the error,
      empty shows the empty message — no path leaves a skeleton running.
- [x] Keyboard: tab order is sensible, focus visible on every link/control.
- [x] `grep -rn "@spartan-ng\|libs/ui" src/app/features/dashboard/pages` returns
      nothing.
- [x] `npm run build`, `npm test`, `npm run lint`.

## Exit criteria

All four screens are Spartan-free, fully stateful, responsive, and match
`screens.md` feature-for-feature.
