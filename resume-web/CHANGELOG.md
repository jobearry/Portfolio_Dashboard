# Changelog

## 2026-03-28 — Theme & Typography Updates

Summary
- Added light theme support and made the theme toggler drive site-wide styling via `html` (`data-theme` + `class`).
- Introduced theme-aware typography tokens and global rules so text colors follow the active theme.
- Replaced hardcoded dark-only colors in multiple components with CSS variables (work completed across several UI components).

Files Changed (high-level)
- `src/styles.css` — added CSS variables for typography, added `[data-theme="light"]` overrides, and set `html` to use theme tokens for `color` and `background-color`.
- `src/app/components/theme-toggler.ts` — (previous edits) toggles `document.documentElement` (`html`) and persists `theme` in `localStorage`; removed `#root` syncing.
- UI components updated to use theme tokens (examples):
  - `src/app/pages/home/components/block-container/block-container.html`
  - `src/app/pages/home/components/timeline/timeline.ts`
  - `src/app/components/card.ts`
  - `src/app/pages/projects/components/highlights.ts`
  - `src/app/components/spinner.ts`
  - `src/app/components/marquee/marquee.html`
  - `src/app/pages/home/components/profile/profile.html`

Details
- The site now uses CSS custom properties as single source-of-truth for colors:
  - Base tokens defined on `:root`, dark overrides under `.dark`, and explicit light values under `[data-theme="light"]`.
  - Typography tokens added: `--type-color`, `--type-muted`, `--type-link`, `--type-link-foreground`.
  - Global rules added to `src/styles.css` so `html` and `body` inherit `--color-background` and `--type-color`.
- Components were migrated to reference variables like `var(--color-card)`, `var(--color-border)`, and `var(--type-muted)` instead of hardcoded Tailwind color utilities or hex values.

Verification
- Verified in dev server: toggling theme updates `html.classList` and `html.dataset.theme`, and computed `--foreground` / `--background` variables switch between dark and light values.

Next steps (optional)
- Replace remaining hardcoded text color classes across any files not yet updated.
- Implement theme-aware asset switching (e.g., profile images) if desired.
- Commit changes and open PR for review.

If you want, I can create the git commit now and/or finish replacing remaining color classes across the repo—which should I do next?

## 2026-03-29 — Component sweep & token migration

Summary
- Completed a sweep of source components to remove remaining hardcoded color utilities and hex backgrounds; migrated them to theme CSS variables so typography and UI elements respond to the toggler.

Files Changed (high-level)
- `src/app/pages/home/components/timeline/timeline.ts` — removed Tailwind color classes and inline hex usages; timeline left border and dot now use `var(--color-sidebar-accent)` / `var(--sidebar)` and include a theme-aware hover rule.
- `src/app/components/card.ts`, `src/app/pages/projects/components/highlights.ts`, `src/app/components/marquee/marquee.html`, `src/app/pages/home/components/profile/profile.html`, `src/app/pages/home/components/block-container/block-container.html`, `src/app/components/spinner.ts` — replaced remaining color utilities with `var(--...)` tokens and updated inline styles where appropriate.

- `src/app/pages/home/home.html` — main column now overrides `--card` and `--card-foreground` at `md` and up so nested cards match the page background on larger screens; small screens keep the card default background.

Details
- Timeline: dot and border now read `--sidebar` and `--color-sidebar-accent`; hover transitions are applied via a small component-scoped rule.
- Spinner: replaced Tailwind border utilities with inline style using `border:4px solid var(--border)` and `border-top-color:var(--ring)` so the spinner matches theme tokens.
- Cards / Highlights / Marquee / Profile / Block containers: backgrounds, borders and muted text swapped to `var(--color-card)`, `var(--border)`, `var(--muted-foreground)` / `var(--type-muted)` as appropriate.

- Main column card background override: `home.html` applies `md:[--card:var(--color-background)] md:[--card-foreground:var(--type-color)]` to make cards visually blend with the page background on medium+ screens while preserving defaults on small screens. You can also override per-component using Tailwind arbitrary properties, e.g. `<app-block class="[--card:#fff] md:[--card:var(--color-background)]">`.

Verification
- Checked the running dev site: computed styles for timeline dot and border, body/html color and background, and sample component backgrounds resolve to the expected OKLCH token values in both dark and light themes.

Notes
- The repo commit and new branch were created by you earlier — I did not modify git history. I can commit these final sweep changes and push to the same branch if you want me to.

Next actions
- Option A: I commit & push these changes to your branch.
- Option B: I continue scanning for any remaining utility classes in non-src paths (dist / node_modules are intentionally ignored).

Choose which action you'd like me to take next.

## 2026-03-29 — Theme-aware charts

Summary
- Heatmap charts now respect the site's theme toggler instead of forcing a hardcoded theme.

Files Changed (high-level)
- `src/app/features/github/components/heatmap.html` — removed hardcoded `'dark'` theme on `<app-chart>` and bound the chart's `theme` input to a new `chartTheme` property.
- `src/app/features/github/components/heatmap.ts` — added `chartTheme`, a small helper to read the page theme from `<html>` (`data-theme`/`class`), and a `MutationObserver` so `chartTheme` updates automatically when the site theme changes.
- `src/app/components/chart.ts` — the chart component already accepts a `theme` `@Input()` and will re-initialize the ECharts instance when the input changes, so the heatmap now toggles ECharts between `'light'` and `'dark'` as appropriate.

Notes
- This makes the ECharts instances (heatmap) theme-aware with minimal changes: the heatmap now supplies `'light'`/`'dark'` (or `undefined`) as the theme input. If you'd like charts to also read CSS color tokens directly (for more fine-grained OKLCH styling), I can extend `Chart` to map CSS variables to ECharts color options.

Verification
- Toggling the site theme updates `<html>` dataset/class and the `chartTheme` value, which flows into `<app-chart>` via Angular inputs and causes ECharts to re-initialize with the selected theme.

