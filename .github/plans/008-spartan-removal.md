# 008 — Spartan removal and final cleanup

Status: Done
Owner: agent
Depends on: 006, 007
Related docs: `.github/docs/current-state.md` (§8), `.github/docs/gaps.md`

## Goal

Remove Spartan UI and `libs/ui` completely, uninstall the packages, delete the
remaining dead surface, and leave the repo with a clean dependency graph and an
accurate documentation set.

## Scope

**In:**

- Delete `libs/ui/**` and `components.json`.
- Uninstall `@spartan-ng/brain`, `@spartan-ng/cli`.
- Remove `@spartan-ng/helm/*` path aliases from `tsconfig.json`.
- Remove the preset leftovers, `class-variance-authority`, `clsx`,
  `tailwind-merge` if nothing references them.
- Delete remaining unused components/constants/icons, keeping `Maintenance`
  (rewritten in plain Tailwind per decision).
- Final grep gate and docs update.

**Out:**

- Removing `Maintenance`.
- New features.
- Dependency upgrades unrelated to Spartan.

## Affected surface

- `libs/ui/**`, `components.json`
- `package.json`, `package-lock.json`
- `tsconfig.json` (`paths` block)
- `src/styles.css` (residual CDK overlay, `tw-animate-css`, `data-*` variants)
- `src/app/components/maintenance/maintenance.ts` (rewritten in plain Tailwind)
- `src/app/features/dashboard/core/models/portfolio.ts` (`PortfolioItems`, deleted)
- `src/app/features/dashboard/core/models/value-objects/result.ts` (`Result<T>`,
  deleted)
- `src/app/features/dashboard/core/index.ts`, model/barrel exports
- `eslint.config.js`, `.prettierignore` (remove `libs/ui` ignores)
- `scripts/genenv.js` dependency (`dotenv` now explicit)
- `.github/docs/*`, `README.md`

## Tasks

- [x] `grep -rn "@spartan-ng\|libs/ui\|hlm" src/ angular.json tsconfig*.json`
      and resolve every hit.
- [x] Delete `libs/ui/**` and `components.json`.
- [x] Remove the `@spartan-ng/helm/*` aliases from `tsconfig.json`.
- [x] `npm uninstall @spartan-ng/brain @spartan-ng/cli`.
- [x] Check `class-variance-authority`, `clsx`, `tailwind-merge`; uninstall only
      if no source file imports them.
- [x] Confirm `src/app/components/` contains only `Maintenance` plus its barrel;
      `SkeletonItem` and all other dead components were deleted in 002/007.
- [x] Keep `Maintenance` and confirm where it is used (or document that it is
      intentionally retained).
- [x] Remove the unused `PortfolioItems` and `Result<T>` model files and their
      barrel exports (the old constants and duplicated style files were deleted
      in 007).
- [x] Ensure `angular.json` has no Spartan builder/schematic references.
- [x] Run `npm prune` / confirm `npm ls` has no Spartan packages or extraneous
      deps.
- [x] Update `.github/docs/current-state.md` (no Spartan, no `libs/ui`, final
      file map), `spartan-inventory.md` (mark removed or replace with a short
      post-removal note), `gaps.md` (closed items), and `README.md` if it
      mentions Spartan.
- [x] Mark this plan and 001 `Done`.

## Risks / decisions

- **Deletion order:** grep first, delete second. Never delete `libs/ui` while any
  import remains — the build failure is noisy and easy to misattribute.
- **Lockfile:** uninstall via `npm uninstall`, not by hand-editing
  `package-lock.json`.
- **`tw-animate-css`:** still used by `animate-pulse`? Verify before removing;
  Tailwind v4 has its own `animate-pulse`, so the package may be removable.
  Record the finding.
- **Docs:** `spartan-inventory.md` becomes historical after removal. Either keep
  it as a "what was removed" record or fold the summary into
  `current-state.md`; do not leave a doc claiming Spartan still exists.

## Deviations / decisions

- **`Maintenance` kept** — rewritten with plain Tailwind and `NgIcon` instead of
  deleting it, per user decision. It remains unrouted.
- **`spartan-inventory.md` deleted** — its useful history is folded into
  `current-state.md` §8 and `gaps.md`.
- **`dotenv` added explicitly** — the Spartan CLI previously supplied it
  transitively. Without it, `genenv` wrote an empty `portfolioApi`; this was
  caught during live verification.
- **Extra unused dependencies removed** — `@angular/cdk` (only for overlay CSS)
  and `@angular/forms` (no imports) were uninstalled as part of the no-unused-deps
  gate.
- **History retained** — 004/006/007 plans still mention the inventory; that is
  historical context, not a live reference.

## Verification

- [x] `grep -r "@spartan-ng\|libs/ui" src/` returns nothing.
- [x] `grep -rn "hlm" src/` returns nothing.
- [x] `npm ls @spartan-ng/brain @spartan-ng/cli` reports empty.
- [x] `npm run build`, `npm test`, `npm run lint` pass.
- [x] All four routes plus wildcard still work.
- [x] Both themes still render correctly (no missing tokens).
- [x] No unused dependency remains (`npm ls --depth=0` reviewed).
- [x] `.github/docs/` matches the post-rewrite repo.
- [x] `libs/` directory is gone (or empty and removed).

## Exit criteria

Zero Spartan references, zero dead code from the rewrite, clean dependency tree,
green build/lint/tests, and documentation that describes the current app.
