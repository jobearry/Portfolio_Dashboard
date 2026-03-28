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