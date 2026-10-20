# 006 — Shell in plain Tailwind

Status: Done
Owner: Jonathan Golimlim
Depends on: 004, 005
Related docs: `.github/docs/screens.md` (Shell), `.github/docs/gaps.md`
(Navigation and layout), `.github/docs/current-state.md` (sections 3–4)

## Goal

Replace the Spartan sidebar and navbar with plain Tailwind components, and fix
the navigation defects: route-driven title, active link, mobile off-canvas, and
the avatar dropdown.

## Scope

**In:**

- Sidebar: user menu header, menu, footer, desktop collapse.
- Mobile: off-canvas panel, overlay, close on navigate, Escape, trigger.
- Sticky header with sidebar trigger and route-driven page title.
- `routerLinkActive` styling + `aria-current`.
- Avatar dropdown: View profile, Download CV, theme toggle.
- Per-route document titles + header titles.

**Out:**

- Screen content (007).
- Adding Profile to the sidebar menu (locked decision: dropdown only).
- New pages or routes.

## Affected surface

- New: `shell/sidebar/sidebar.ts`, `shell/header/header.ts`,
  `shell/user-menu/user-menu.ts`, `shell/shell-state.service.ts`,
  plus `sidebar.spec.ts` and `user-menu.spec.ts`.
- Rewritten: `shell/dashboard.{ts,html}`.
- Deleted: `components/sidebar/sidebar.ts`, `components/navbar/navbar.ts`
  (barrel updated).
- `app.routes.ts` (child `title` + `data.pageTitle`, empty-path redirect).
- `app.spec.ts` (new shell assertions).

## Decisions

- **Custom Tailwind popover**, not CDK menu/overlay. It is a small
  signal-driven menu with document pointerdown, Escape, arrow/Home/End, and
  focus return — no extra positioning machinery for a static header anchor.
- **Desktop collapse persists** under `portfolio-sidebar-collapsed`
  (`localStorage`), same pattern as the theme.
- **Breakpoint is `md` (48rem/768px).** `ShellStateService` tracks
  `matchMedia('(min-width: 48rem)')` so the sidebar can decide between desktop
  and mobile semantics in TypeScript (visibility, focus, labels) instead of
  mixing conflicting responsive utilities.
- **Widths via one CSS variable.** The host sets
  `--shell-sidebar-width` (`16rem` / `4.5rem`); the aside and content padding
  both read it, so the transition stays in sync.
- **Titles come from route data.** A `page(label)` helper in `app.routes.ts`
  sets both `title` (`Label | Name`, for the tab) and `data.pageTitle` (for the
  `h1`), so they cannot drift.
- **Two independent signals:** `collapsed` (desktop rail) and `mobileOpen`
  (off-canvas), never one shared boolean.
- **Focus into the panel** is scheduled with `requestAnimationFrame`: the panel
  is `visibility: hidden` while closed, so focusing before the class change is
  applied silently fails.
- **Scroll lock via an effect** with cleanup, not a class toggled by hand.
- **Icons stay `@ng-icons/lucide`**; each shell component registers only what it
  uses. The `HlmIcon` wrapper is gone from the shell.

## Tasks

- [x] Add `title` + `data.pageTitle` to each child route; explicit `/`
      redirect; keep the shell fallback title.
- [x] Header derives the `h1` from the deepest route data (no click handlers,
      no `pagename` signal).
- [x] Plain Tailwind sidebar: user menu, nav, footer, borders, scroll area.
- [x] Desktop collapse between 16rem and 4.5rem, persisted.
- [x] Mobile: hidden below `md`, slide-in panel + overlay, close on
      `NavigationEnd`, overlay click, Escape; body scroll lock; focus into the
      panel and back to the trigger.
- [x] Trigger has `aria-controls` and `aria-expanded`, plus an accessible name.
- [x] Menu items: exact `routerLinkActive`, active background, `aria-current`,
      visible focus ring, `sr-only` labels in the rail.
- [x] Avatar block is a dropdown `button` (`aria-haspopup="menu"`,
      `aria-expanded`, `aria-controls`), with outside click, Escape, arrow keys,
      Home/End, and focus return.
- [x] Dropdown items: View profile, Download CV (new tab, `noopener`), theme
      toggle labelled with the next action.
- [x] Sticky header with border and `z-30`.
- [x] No nested interactive elements.
- [x] Remove Spartan sidebar/trigger/icon imports; delete the old components.
- [x] Update `screens.md`, `gaps.md`, `current-state.md`, `spartan-inventory.md`.

## Verification

- [x] `npm run lint`, `npm run format:check`, `npm run build` pass.
- [x] `npm test` — 22 tests pass (shell routing/title/active link, user menu,
      sidebar focus, shell state, theme).
- [x] Header title correct on direct load and navigation for all four routes;
      document titles are `Label | Jonathan Golimlim`.
- [x] Active link highlighted with `aria-current="page"` (Timeline, Blog).
- [x] Empty path and unknown paths redirect to `/dashboard`.
- [x] Dropdown opens/closes with mouse; keyboard ArrowDown opens and focuses the
      first item; ArrowDown/Up cycle; Escape closes and returns focus.
- [x] Theme item switches light/dark and closes the menu; label flips between
      "Switch to light mode" and "Switch to dark mode".
- [x] Collapse to the rail hides labels, keeps accessible names, and survives a
      reload; expand restores it.
- [x] Mobile (390×844): panel closed → hidden; open → visible, scroll locked,
      `aria-expanded="true"`; Escape → hidden, focus on the trigger; navigating
      to Blog closes the panel and restores scrolling.
- [x] No horizontal scroll at 320, 768, or 1280 px.
- [x] `grep -rn "@spartan-ng\|libs/ui"` is clean for
      `features/dashboard/shell`; `components/` still has `Maintenance` and
      `SkeletonItem` by design (008).
- [x] No `console.log`.

## Known follow-ups

- Screen content, loading/empty/error polish, and the profile badges are 007.
- `Maintenance` and `SkeletonItem` still import Spartan until 008.
- Theme toggle exists only in the dropdown (locked decision).

## Exit criteria

The shell is Spartan-free, route-aware, keyboard-accessible, and correct on
mobile and desktop.
