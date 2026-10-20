# Spartan UI Inventory

Everything currently tied to Spartan UI/Brain, so the Tailwind-only rewrite can
replace it deliberately.

## 1. Packages and configuration

| Item | Location | Action for rewrite |
| --- | --- | --- |
| `@spartan-ng/brain` | `package.json` dependency | Remove |
| `@spartan-ng/cli` | `package.json` devDependency | Remove |
| `components.json` | project root | Delete (`componentsPath: "libs/ui"`, `importAlias: "@spartan-ng/helm"`) |
| `libs/ui/**` | vendored Helm components | Delete; reimplement needed pieces |
| `@spartan-ng/brain/hlm-tailwind-preset.css` | `src/styles.css` import | Remove/replace with own tokens |

## 2. Styles and design tokens

`src/styles.css`:

```css
@layer theme, base, components, utilities;
@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/preflight.css' layer(base);
@import 'tailwindcss/utilities.css';

@import "@spartan-ng/brain/hlm-tailwind-preset.css";

:root { /* shadcn-style light tokens */ }
:root.dark { /* shadcn-style dark tokens */ }

@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground; }
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

| Component / directive | Import | Used in | What it does |
| --- | --- | --- | --- |
| `hlmSidebarWrapper`, `hlm-sidebar`, `hlmSidebarHeader`, `hlmSidebarContent`, `hlmSidebarMenu`, `hlmSidebarMenuItem`, `hlmSidebarMenuButton`, `hlmSidebarFooter` | `HlmSidebarImports` | `components/sidebar/sidebar.ts` | Sidebar layout, menu styling, collapse/mobile state |
| `hlmSidebarTrigger` | direct path `libs/ui/sidebar/.../hlm-sidebar-trigger` | `components/navbar/navbar.ts`, indirectly shell | Toggles the sidebar |
| `HlmSidebarService` (Brain) | via sidebar library | sidebar internals | Collapsed/open-mobile state, keyboard shortcut |
| `HlmIcon` + `NgIcon` | `@spartan-ng/helm/icon`, `@ng-icons/core` | sidebar, navbar (trigger), blog, maintenance | Icon sizing/alignment wrapper |
| `HlmH1` | `@spartan-ng/helm/typography` | `pages/overview/overview.html` | Typography for "Than" |
| `HlmH3` | `@spartan-ng/helm/typography` | `pages/profile/profile.ts` (used), `pages/profile/components/skill.ts` (imported but unused) | Typography for the name |
| `HlmSkeleton` | `@spartan-ng/helm/skeleton` | `components/skeletons/item/skeleton-item.ts` | Pulsing placeholder |

## 4. Spartan components used only by dead/legacy code

| Component | Used in |
| --- | --- |
| `HlmCardImports` (+ `hlmCard*`) | `components/card/card.ts`, `components/skeletons/card/skeleton-card.ts` |
| `HlmItemImports` (+ `hlmItem*`) | `components/item/item.ts`, `components/skeletons/item/skeleton-item.ts` |
| `HlmButtonImports` | card, item, skeleton-item, project-dialog, bak pages |
| `HlmDialogImports`, `BrnDialogRef`, `injectBrnDialogContext` | `components/dialog/project-dialog.ts` |
| `HlmDialogService` | `bak/portfolio.ts`, `bak/experience/experience.ts`, `bak/project/project.ts` |
| `HlmInputImports` | project-dialog (imported, no input in template) |
| `HlmH3` | bak experience/project |
| `HlmSkeleton` | skeleton-card |

> `SkeletonItem` is used by live pages even though it is built from `hlmItem`
> and `hlm-skeleton`, so it counts as a live Spartan dependency.

## 5. Vendored library tree (`libs/ui`)

| Library | Purpose | Needed by live code? |
| --- | --- | --- |
| `sidebar` | sidebar primitives, trigger, service, wrapper | Yes |
| `icon` | `HlmIcon` | Yes |
| `typography` | h1–h4, p, lead, large, small, muted, blockquote, code, ul | h1, h3 only |
| `skeleton` | skeleton placeholder | Yes (via SkeletonItem) |
| `item` | item layout primitive | Via SkeletonItem only |
| `card` | card primitive | Dead |
| `dialog` | Helm dialog + service | Dead |
| `sheet` | sheet primitive | Not imported anywhere |
| `scroll-area` | scroll area | Not imported anywhere |
| `separator` | separator | Not imported anywhere |
| `tooltip` | tooltip | Not imported anywhere |
| `input` | input | Dead (project-dialog import only) |
| `button` | button | Dead |
| `utils` | `hlm()` class merge helper (`clsx` + `tailwind-merge`) | Indirectly |

## 6. Import style inconsistency

Both styles appear in the codebase:

- Alias imports: `@spartan-ng/helm/sidebar`, `@spartan-ng/helm/typography`, etc.
- Relative vendored imports: e.g.
  `../../../../libs/ui/typography/src/lib/hlm-h1`,
  `../../../../libs/ui/sidebar/src/lib/hlm-sidebar-trigger`.

The rewrite removes both.

## 7. Behavior that must be reimplemented without Spartan

1. **Sidebar collapse** — desktop icon-rail / hidden sidebar with a toggle.
2. **Mobile sidebar** — off-canvas overlay/sheet triggered by the header button,
   with close-on-navigate and overlay click-to-close.
3. **Menu item styling** — hover/active background, icon + label alignment,
   keyboard focus.
4. **Skeleton pulse** — `animate-pulse` blocks shaped like content.
5. **Typography** — replace `hlmH1`/`hlmH3` with explicit Tailwind text classes.
6. **Icon rendering** — keep `@ng-icons` or replace with inline SVGs; `HlmIcon`
   only supplies sizing/alignment.
7. **Dialog (if restored)** — the legacy project dialog has no direct Tailwind
   equivalent; would need a CDK dialog/overlay or a custom modal.
