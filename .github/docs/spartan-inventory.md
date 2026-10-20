# Spartan UI Inventory

Everything currently tied to Spartan UI/Brain, so the Tailwind-only rewrite can
replace it deliberately.

## 1. Packages and configuration

| Item                                        | Location                     | Action for rewrite                                                      |
| ------------------------------------------- | ---------------------------- | ----------------------------------------------------------------------- |
| `@spartan-ng/brain`                         | `package.json` dependency    | Remove                                                                  |
| `@spartan-ng/cli`                           | `package.json` devDependency | Remove                                                                  |
| `components.json`                           | project root                 | Delete (`componentsPath: "libs/ui"`, `importAlias: "@spartan-ng/helm"`) |
| `libs/ui/**`                                | vendored Helm components     | Delete; reimplement needed pieces                                       |
| `@spartan-ng/brain/hlm-tailwind-preset.css` | `src/styles.css` import      | Removed in 004; own `@theme` tokens                                     |

## 2. Styles and design tokens

> Historical snapshot (pre-004). `src/styles.css` now owns the token layer; see
> `current-state.md` §6 for the current setup.

`src/styles.css`:

```css
@layer theme, base, components, utilities;
@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/preflight.css' layer(base);
@import 'tailwindcss/utilities.css';

@import '@spartan-ng/brain/hlm-tailwind-preset.css';

:root {
  /* shadcn-style light tokens */
}
:root.dark {
  /* shadcn-style dark tokens */
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

Tokens currently relied on by templates:

`--radius` (0.625rem), `--background`, `--foreground`, `--card`,
`--card-foreground`, `--popover`, `--popover-foreground`, `--primary`,
`--primary-foreground`, `--secondary`, `--secondary-foreground`, `--muted`,
`--muted-foreground`, `--accent`, `--accent-foreground`, `--destructive`,
`--border`, `--input`, `--ring`, `--sidebar`, `--sidebar-foreground`,
`--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-accent`,
`--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring`.

Tailwind utility classes that depend on the preset:

- `bg-background`, `text-foreground`, `text-muted-foreground`
- `bg-muted/50`, `bg-muted`
- `border-border`, `outline-ring/50`
- `bg-card`, `text-card-foreground` (inside `libs/ui/card` only)
- `bg-sidebar*`, `text-sidebar-*` (inside `libs/ui/sidebar` only)

The rewrite must either keep these CSS variables under plain Tailwind `@theme`
or map them to explicit colors. Note that `bg-zinc-900/50`, `bg-zinc-800`,
`text-zinc-*` are stock Tailwind and can stay.

## 3. Spartan components used by live code

| Component / directive | Import                                    | Used in                                 | What it does                                                           |
| --------------------- | ----------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------- |
| `HlmIcon` + `NgIcon`  | `@spartan-ng/helm/icon`, `@ng-icons/core` | `components/maintenance/maintenance.ts` | Icon sizing/alignment wrapper; last live Spartan usage, removed in 008 |

> `HlmH1`, `HlmH3`, `HlmSkeleton`, and `SkeletonItem` were removed in 007. The
> four data screens now use plain Tailwind typography and the shared
> `app-skeleton`; icons are registered locally by each component.
>
> The `hlmSidebar*` directives, `hlmSidebarTrigger`, and the Brain sidebar
> service were removed in 006; `components/sidebar` and `components/navbar` no
> longer exist. The plain-Tailwind shell lives under
> `features/dashboard/shell/`.

## 4. Spartan components used only by dead/legacy code

The components previously listed here were deleted in 002 (legacy screens,
dialog, card, item, skeleton-card) and 007 (`SkeletonItem`). Nothing in this
section remains in `src/`.

## 5. Vendored library tree (`libs/ui`)

| Library       | Purpose                                                   | Needed by live code?                 |
| ------------- | --------------------------------------------------------- | ------------------------------------ |
| `sidebar`     | sidebar primitives, trigger, service, wrapper             | No — plain shell since 006           |
| `icon`        | `HlmIcon`                                                 | Only by `Maintenance` until 008      |
| `typography`  | h1–h4, p, lead, large, small, muted, blockquote, code, ul | No                                   |
| `skeleton`    | skeleton placeholder                                      | No — shared `app-skeleton` since 007 |
| `item`        | item layout primitive                                     | No                                   |
| `card`        | card primitive                                            | No                                   |
| `dialog`      | Helm dialog + service                                     | No                                   |
| `sheet`       | sheet primitive                                           | Not imported anywhere                |
| `scroll-area` | scroll area                                               | Not imported anywhere                |
| `separator`   | separator                                                 | Not imported anywhere                |
| `tooltip`     | tooltip                                                   | Not imported anywhere                |
| `input`       | input                                                     | No                                   |
| `button`      | button                                                    | No                                   |
| `utils`       | `hlm()` class merge helper (`clsx` + `tailwind-merge`)    | No — only used inside vendored libs  |

## 6. Import style inconsistency

Both styles appear in the codebase:

- Alias imports: `@spartan-ng/helm/sidebar`, `@spartan-ng/helm/typography`, etc.
- Relative vendored imports: e.g.
  `../../../../libs/ui/typography/src/lib/hlm-h1`,
  `../../../../libs/ui/sidebar/src/lib/hlm-sidebar-trigger`.

The rewrite removes both. Live app code no longer imports `libs/ui` except
`Maintenance` (`@spartan-ng/helm/icon`), which is removed in 008.

## 7. Behavior that must be reimplemented without Spartan

1. **Sidebar collapse** — done in 006 (`portfolio-sidebar-collapsed`).
2. **Mobile sidebar** — done in 006; off-canvas panel with overlay, Escape,
   scroll lock, and focus return.
3. **Menu item styling** — done in 006 with Tailwind tokens and `aria-current`.
4. **Skeleton pulse** — done in 007 (`app-skeleton` variants).
5. **Typography** — done in 007; `hlmH1`/`hlmH3` replaced with explicit Tailwind
   text classes.
6. **Icon rendering** — done for live screens in 007; only `Maintenance` still
   uses `HlmIcon`, removed in 008.
7. **Dialog (if restored)** — not planned; the legacy project dialog has no
   direct Tailwind equivalent and would need a CDK dialog/overlay or a custom
   modal.
