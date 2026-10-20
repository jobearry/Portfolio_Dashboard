# 007 — Screens in plain Tailwind

Status: Draft
Owner:
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

- [ ] Header block: eyebrow, `h1`, caption; use explicit text classes instead of
      `HlmH1`.
- [ ] Metric cards in a responsive grid (`sm:grid-cols-3`), informational
      `<article>` elements (no buttons).
- [ ] Numbers, labels, dividers, and description spacing per the light-refresh
      rule.
- [ ] Empty state when the API returns zero items.
- [ ] Delete `dashboard-home` if it only re-wraps `overview`; point the route at
      `overview` directly.

### Timeline

- [ ] `CAREER` section label and vertical list of experience cards.
- [ ] Company name, start-year pill (guard non-date strings; show nothing rather
      than `Invalid Date`), role + description, responsibility.
- [ ] Nested `PROJECTS` block only when projects exist; tech chips per
      `techStackSpecs[].toolName`.
- [ ] Empty message when the experience list is empty; no empty nested block.

### Profile

- [ ] Hero: avatar, name, handle, bio — all from `site.config`.
- [ ] GitHub + CV links: real anchors with visible focus; decide whether to keep
      the shields.io images or replace with styled text/icon links (ledger the
      choice in this plan; offline rendering is the argument for replacing).
- [ ] Recommendations: `FEEDBACK` heading with accent dot, cards with
      `personName`, `careerPosition.value`, quoted `description`; empty state.
- [ ] Skills: `SKILL` heading, 3-column tile grid with `stackName` + `category`;
      empty state.
- [ ] Remove the unused `HlmH3` import from `skill.ts`.

### Blog

- [ ] Numbered grid (2 columns from `lg`), two-digit index, title, date,
      external-link icon.
- [ ] Keep `convertNotionUrl` behavior, including the parse-failure fallback.
- [ ] Hover/focus lift via Tailwind classes; remove `TRANSITION_MOVE_UP`.
- [ ] Empty state when content is `null` or `[]`; error state on failure.
- [ ] Links: `target="_blank"`, `rel="noopener noreferrer"`, accessible name.

### Shared

- [ ] Build a Tailwind skeleton primitive (`animate-pulse` blocks) and replace
      `SkeletonItem`; delete the old component and barrel entry.
- [ ] Confirm the shared state component from 002 is used consistently.
- [ ] Delete unused style constants and unused icon registrations
      (`lucideInfo`, `lucideToolCase`, `lucideLibraryBig`, `lucideDrill`,
      `lucideFileDown`; deduplicate `lucideUserCircle`).
- [ ] Update `.github/docs/screens.md` and `.github/docs/gaps.md`.

## Risks / decisions

- **Skeleton shape:** skeletons must match the final layout (card grid, list,
  hero) or the swap will jump. Build the skeleton after the real layout.
- **Shields.io badges:** they fail offline and in strict CSP environments. If
  replaced, keep the same labels and destinations; record the decision.
- **Timeline dates:** `DatePipe` on a non-date string throws or renders empty.
  Normalize/guard in the component, not the template.
- **Blog null content:** treat `null` and `[]` the same and show the empty state.
- **No behavioral additions:** if a "nice to have" appears, it goes into a new
  plan, not this one.

## Verification

Per screen, in **both themes**, at 320px / 768px / 1280px:

- [ ] `/dashboard`: header, 3-up cards, counts; no action buttons; empty state.
- [ ] `/timeline`: experiences, year pills, nested projects, tech chips; empty
      state.
- [ ] `/profile`: hero, links, recommendations, skills; both empty states.
- [ ] `/blog`: entries, numbering, dates, icons, correct Notion URLs; empty and
      error states.
- [ ] Loading shows the skeleton, success replaces it, failure shows the error,
      empty shows the empty message — no path leaves a skeleton running.
- [ ] Keyboard: tab order is sensible, focus visible on every link/control.
- [ ] `grep -rn "@spartan-ng\|libs/ui" src/app/features/dashboard/pages` returns
      nothing.
- [ ] `npm run build`, `npm test`, `npm run lint`.

## Exit criteria

All four screens are Spartan-free, fully stateful, responsive, and match
`screens.md` feature-for-feature.
