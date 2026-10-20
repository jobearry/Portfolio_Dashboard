# 006 — Shell in plain Tailwind

Status: Draft
Owner:
Depends on: 004, 005
Related docs: `.github/docs/screens.md` (Shell), `.github/docs/gaps.md`
(Navigation and layout)

## Goal

Replace the Spartan sidebar and navbar with plain Tailwind components, and fix
the navigation defects: route-driven title, active link, mobile off-canvas, and
the avatar dropdown.

## Scope

**In:**

- Sidebar: header (avatar + name + role), menu, footer, desktop collapse.
- Mobile: off-canvas panel, overlay, close on navigate, Escape, trigger.
- Sticky header with sidebar trigger and route-driven page title.
- `routerLinkActive` styling + `aria-current`.
- Avatar dropdown: View profile, Download CV, Theme toggle.
- Per-route `title` values.

**Out:**

- Screen content (007).
- Adding Profile to the sidebar menu (locked decision: dropdown only).
- New pages or routes.

## Affected surface

- New: `src/app/features/dashboard/shell/sidebar/*`,
  `shell/header/*`, `shell/user-menu/*`, `shell/sidebar-state.service.ts`
- Rewrite: `src/app/features/dashboard/shell/dashboard.{ts,html}`
- Delete: `src/app/components/sidebar/sidebar.ts`,
  `src/app/components/navbar/navbar.ts` (update `components/index.ts`)
- `src/app/app.routes.ts` (child `title`s)
- `src/app/core/constants/sidebar-sections.ts` (icons/menu metadata)
- `src/app/app.ts` (icon providers, possibly move to shell)

## Tasks

- [ ] Add `title` to each child route (`Dashboard`, `Timeline`, `Profile`,
      `Blog`) and keep the shell fallback title.
- [ ] Header derives the title from the active route (`ActivatedRoute` data via
      router events, not click handlers). Remove `onItemClickHandler` and the
      `pagename` signal.
- [ ] Build the sidebar with plain Tailwind: fixed/rail widths, scrollable
      content area, footer, borders, spacing.
- [ ] Desktop collapse: toggle between full and icon-rail; persist the choice
      (localStorage) if trivial, otherwise session-only and document it.
- [ ] Mobile: hidden below `md`, slide-in panel + overlay, close on
      `NavigationEnd`, close on overlay click, close on `Escape`, lock body
      scroll while open, return focus to the trigger.
- [ ] Trigger button: `aria-controls`, `aria-expanded`, accessible name.
- [ ] Menu items: `routerLinkActive` with exact matching for `/dashboard`,
      active background/indicator, `aria-current="page"`, visible focus ring.
- [ ] Avatar/name block becomes a real dropdown button (not a link):
      `aria-haspopup="menu"`, `aria-expanded`, Escape to close, outside click,
      ArrowUp/Down + Home/End, focus moves into the menu.
- [ ] Dropdown items:
      - **View profile** → `/profile` (router link, closes menu)
      - **Download CV** → configured CV URL, `target="_blank"`,
        `rel="noopener noreferrer"`
      - **Theme toggle** → `ThemeService.toggle()`, label reflects the next
        action, `aria-pressed` or a clear label.
- [ ] Keep the header sticky with a border and `z-index` above content.
- [ ] Ensure no nested interactive elements (`a` inside `a`, `button` inside
      `button`).
- [ ] Remove the Spartan sidebar/trigger/icon imports from the shell.
- [ ] Update `.github/docs/screens.md` (shell behavior) and `.github/docs/gaps.md`
      (close the navigation gaps).

## Risks / decisions

- **Title source:** route `title` is also used for the document title; the header
  must read the same value from route data so they cannot drift.
- **Mobile breakpoint:** pick one (`md`) and use it consistently in the sidebar,
  header, and overlay. Document it in `screens.md`.
- **Collapse vs. mobile:** two separate signals, not one. Collapsed only applies
  at `md+`; the mobile panel always opens full width.
- **Dropdown implementation:** a small custom menu with `@angular/cdk`
  overlay is acceptable (CDK is already a dependency); avoid pulling in a new UI
  library.
- **Theme toggle placement:** inside the dropdown per locked decision; no
  duplicate header button.

## Verification

- [ ] `npm run build`, `npm test`, `npm run lint`.
- [ ] Title is correct on first load, direct deep link, reload, and
      back/forward for all four routes.
- [ ] Active item is highlighted for the current route; no item highlighted on
      unknown paths after redirect.
- [ ] Avatar dropdown works with mouse and keyboard; Escape and outside click
      close it; focus returns to the trigger.
- [ ] Theme toggle persists and the label is accurate.
- [ ] Mobile (≤ 640px): panel opens, navigation closes it, overlay closes it,
      Escape closes it, background does not scroll while open.
- [ ] Collapse works at desktop widths and does not affect mobile.
- [ ] No horizontal scroll at 320px, 768px, 1280px.
- [ ] `grep -rn "@spartan-ng\|libs/ui" src/app/features/dashboard/shell src/app/components`
      returns nothing for the shell (components dir may still hold Maintenance).
- [ ] No `console.log`.

## Exit criteria

The shell is Spartan-free, route-aware, keyboard-accessible, and correct on
mobile and desktop.
