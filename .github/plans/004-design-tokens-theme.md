# 004 — Design tokens and theme

Status: Draft
Owner:
Depends on: 002 (003 recommended first)
Related docs: `.github/docs/spartan-inventory.md` (sections 2 and 7)

## Goal

Replace the Spartan Tailwind preset with our own Tailwind v4 tokens, define a
real light/dark theme, and add a persisted theme service — without changing how
the app looks in dark mode.

The shell is still Spartan in this phase, so **the token variable names must
match** what the live templates already use. This phase is parity, not redesign.

## Scope

**In:**

- Remove `@import "@spartan-ng/brain/hlm-tailwind-preset.css"` from
  `src/styles.css`.
- Define `:root` / `:root.dark` variables and a Tailwind `@theme` mapping that
  keeps the existing utility names working.
- `color-scheme` for both themes.
- `ThemeService`: `light` | `dark`, persisted, initial value from
  `prefers-color-scheme`.
- Apply the theme class before Angular boots (no flash).
- Remove the hardcoded `class="dark"` from `index.html`.

**Out:**

- The visible theme toggle control (lands with the avatar dropdown in 006).
- A full palette redesign; only legibility fixes are allowed.
- Per-screen styling (007).

## Affected surface

- `src/styles.css`
- `src/index.html`
- New: `src/app/core/theme/theme.service.ts` (+ `index.ts`)
- `src/app/app.config.ts` (initializer) or `src/app/app.ts` constructor
- `src/app/core/index.ts`

## Tasks

- [ ] Inventory every token currently consumed by live templates
      (`bg-background`, `text-foreground`, `text-muted-foreground`,
      `bg-muted/50`, `border-border`, `outline-ring/50`, `--radius`, and any
      `sidebar-*` still used by Spartan internals).
- [ ] Define the token sets in `styles.css` with the same custom-property names,
      light in `:root`, dark in `:root.dark`, each with `color-scheme`.
- [ ] Add `@theme inline { --color-background: var(--background); ... }` so
      `bg-*`, `text-*`, and `border-*` utilities resolve without the preset.
- [ ] Keep the accent `#912F56` as a named token (e.g. `--color-accent-brand`)
      instead of repeating the hex in templates.
- [ ] Delete the preset import and any `@layer` setup only the preset needed.
- [ ] Add `ThemeService` with a `signal<'light' | 'dark'>`, `localStorage`
      persistence (guard `typeof window`), and first-load fallback to
      `window.matchMedia('(prefers-color-scheme: light)')`.
- [ ] Apply the class to `document.documentElement` in one place; expose
      `toggle()`.
- [ ] Add a tiny inline script in `index.html` `<head>` that applies the stored
      theme class before first paint (avoids the default-dark flash).
- [ ] Remove `class="dark"` from `<html>`; keep `lang="en"`.
- [ ] Verify the shell (still Spartan) renders identically in dark before moving
      on.

## Risks / decisions

- **Preset dependency:** Spartan components use `bg-sidebar`, `bg-card`,
  `text-card-foreground`, etc. Those must be mapped, or the sidebar will render
  unstyled for one phase. Map them even if they are removed in 008.
- **Flash:** Angular bootstraps after first paint. The inline pre-bootstrap
  script is the mitigation; do not rely on the service constructor alone.
- **Default:** dark is the locked default. First load without a stored value uses
  `prefers-color-scheme`; store the result only after an explicit toggle.
- Token values are not a redesign. Keep the existing oklch values unless a
  contrast check fails.

## Verification

- [ ] `npm run build`, `npm test`, `npm run lint`.
- [ ] Dark mode is visually unchanged on all four routes (compare before/after).
- [ ] Light mode is legible on all four routes: body text, muted text, borders,
      accent, sidebar.
- [ ] `document.documentElement` has `color-scheme: dark|light` matching the
      active theme.
- [ ] Reload preserves the toggled theme; first load follows the OS setting.
- [ ] No flash of the wrong theme on hard reload.
- [ ] `grep -rn "hlm-tailwind-preset" src/` returns nothing.

## Exit criteria

The app owns its tokens and theme lifecycle; the Spartan preset is gone while
every existing screen still renders correctly.
