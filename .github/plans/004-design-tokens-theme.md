# 004 — Design tokens and theme

Status: Done
Owner: Jonathan Golimlim
Depends on: 002, 003
Related docs: `.github/docs/spartan-inventory.md` (sections 2 and 7)

## Goal

Replace the Spartan Tailwind preset with our own Tailwind v4 tokens, define a
real light/dark theme, and add a persisted theme service — without changing how
the app looks in dark mode.

The shell is still Spartan in this phase, so the token variable names had to
match what the live templates use. This phase is parity, not redesign.

## Scope

**In:**

- Remove `@import "@spartan-ng/brain/hlm-tailwind-preset.css"`.
- Own `@theme inline` mapping + light/dark variables with matching names.
- `color-scheme` for both themes.
- `ThemeService`: `light` | `dark`, persisted, initial value from
  `prefers-color-scheme`.
- Apply the theme before Angular boots (no flash).
- Remove the hardcoded `class="dark"` from `index.html`.
- Replace dark-only neutral classes so light mode is legible.

**Out:**

- The visible theme toggle control (lands with the avatar dropdown in 006).
- Full palette redesign.
- Per-screen layout work (007).

## Affected surface

- `src/styles.css`
- `src/index.html`
- `src/app/core/theme/theme.service.ts` + `theme.service.spec.ts` (new)
- `src/app/core/theme/index.ts`, `src/app/core/index.ts`
- `src/app/app.config.ts` (`provideAppInitializer`)
- Templates that used dark-only grays (`overview`, `timeline`, `profile`,
  `recommendations`, `skill`, `blog`, `sidebar`, `maintenance`)

## Decisions

- **Keep the existing token names** (`--background`, `--foreground`, `--card`,
  `--muted`, `--border`, `--sidebar-*`). Renaming would break the still-Spartan
  shell and turn 004 into a visual-risk phase.
- **Keep two dependencies at the CSS level:** `@angular/cdk/overlay-prebuilt.css`
  and `tw-animate-css` were imported by the preset. Spartan's mobile sheet and
  animations still need them until 008; 008 removes them with the UI.
- **Class-based dark mode** via `@custom-variant dark (&:is(.dark *))`. Without
  it, `dark:` utilities would follow the OS instead of the stored choice.
- **Keep the `data-*` variants** the preset defined. Only `data-disabled:` is
  currently used, but the full set is kept until the vendored UI is deleted.
- **Accent stays `#912f56`** in both themes (locked), exposed as
  `--color-accent-brand` so templates stop repeating the hex.
- **`@theme` radius scale** mirrors the preset (`sm` … `4xl` off `--radius`) so
  rounded corners do not change.
- **First-load rule:** stored theme wins; otherwise
  `prefers-color-scheme: light` → light; no preference → dark.
- **Template neutrals replaced in this phase** (`text-gray-300/70` →
  `text-muted-foreground`, `bg-zinc-900/50` → `bg-muted/50`, etc.). Without it,
  light mode rendered near-invisible text. This is a legibility fix, not a
  redesign; 007 still owns layout.

## Tasks

- [x] Inventory tokens consumed by live templates and `libs/ui` (colors, radius,
      sidebar widths, variants, animations).
- [x] Replace the preset import with own `@theme inline` mapping.
- [x] Define light (`:root`) and dark (`:root.dark`) token sets with
      `color-scheme`.
- [x] Add `--color-accent-brand`.
- [x] Add `ThemeService` (signal, `localStorage` key `portfolio-theme`,
      `toggle()`, `set()`), and initialize it with `provideAppInitializer`.
- [x] Add the inline pre-paint script to `index.html`; remove `class="dark"`.
- [x] Replace dark-only neutral classes with semantic tokens.
- [x] Add `theme.service.spec.ts` covering OS preference, stored override,
      dark fallback, and toggle persistence.
- [x] Update `current-state.md`, `gaps.md`, `screens.md`.

## Verification

- [x] `npm run lint`, `npm run format:check`, `npm run build` pass.
- [x] `npm test` — 14 tests pass (4 new theme tests).
- [x] Dark mode is visually unchanged: `/dashboard` screenshot before/after
      matches (sidebar, header, cards, muted text).
- [x] Light mode is legible on `/dashboard`, `/timeline`, `/profile`, `/blog`
      (headless Chromium, `color-scheme: light` confirmed).
- [x] Reload keeps the stored theme; class and `color-scheme` match.
- [x] First load follows `prefers-color-scheme` (unit tested).
- [x] `grep -rn "hlm-tailwind-preset" src/` returns nothing.
- [x] `grep -rn "#912F56" src/` returns only the explanatory comment in
      `styles.css`.

## Known follow-ups

- The visible toggle and its keyboard behavior belong to 006.
- Light-mode layout issues that are not contrast (e.g. the skills grid
  overflowing in `/profile`) are 007 work.
- 008 can reconsider `tw-animate-css` once the Spartan sheet is gone.

## Exit criteria

The app owns its tokens and theme lifecycle; the Spartan preset is gone while
every existing screen renders correctly in both themes.
