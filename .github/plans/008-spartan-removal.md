# 008 — Spartan removal and final cleanup

Status: Draft
Owner:
Depends on: 006, 007
Related docs: `.github/docs/spartan-inventory.md`, `.github/docs/current-state.md`

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
- Delete remaining unused components/constants/icons (keep `Maintenance`).
- Final grep gate and docs update.

**Out:**

- Removing `Maintenance`.
- New features.
- Dependency upgrades unrelated to Spartan.

## Affected surface

- `libs/ui/**`, `components.json`
- `package.json`, `package-lock.json`
- `tsconfig.json` (`paths` block)
- `src/styles.css` (any residual preset references)
- `src/app/components/**` (`Maintenance` only after 007)
- `src/app/features/dashboard/core/models/portfolio.ts` (`PortfolioItems`, unused)
- `src/app/features/dashboard/core/models/value-objects/result.ts` (`Result<T>`,
  unused)
- `src/app/features/dashboard/core/index.ts`, `src/app/core/index.ts`,
  `src/app/shared/index.ts` (barrels)
- `.github/docs/*`

## Tasks

- [ ] `grep -rn "@spartan-ng\|libs/ui\|hlm" src/ angular.json tsconfig*.json`
      and resolve every hit.
- [ ] Delete `libs/ui/**` and `components.json`.
- [ ] Remove the `@spartan-ng/helm/*` aliases from `tsconfig.json`.
- [ ] `npm uninstall @spartan-ng/brain @spartan-ng/cli`.
- [ ] Check `class-variance-authority`, `clsx`, `tailwind-merge`; uninstall only
      if no source file imports them.
- [ ] Confirm `src/app/components/` contains only `Maintenance` plus its barrel;
      `SkeletonItem` and all other dead components were deleted in 002/007.
- [ ] Keep `Maintenance` and confirm where it is used (or document that it is
      intentionally retained).
- [ ] Remove the unused `PortfolioItems` and `Result<T>` model files and their
      barrel exports (the old constants and duplicated style files were deleted
      in 007).
- [ ] Ensure `angular.json` has no Spartan builder/schematic references.
- [ ] Run `npm prune` / confirm `npm ls` has no Spartan packages or extraneous
      deps.
- [ ] Update `.github/docs/current-state.md` (no Spartan, no `libs/ui`, final
      file map), `spartan-inventory.md` (mark removed or replace with a short
      post-removal note), `gaps.md` (closed items), and `README.md` if it
      mentions Spartan.
- [ ] Mark this plan and 001 `Done`.

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

## Verification

- [ ] `grep -r "@spartan-ng\|libs/ui" src/` returns nothing.
- [ ] `grep -rn "hlm" src/` returns nothing.
- [ ] `npm ls @spartan-ng/brain @spartan-ng/cli` reports empty.
- [ ] `npm run build`, `npm test`, `npm run lint` pass.
- [ ] All four routes plus wildcard still work.
- [ ] Both themes still render correctly (no missing tokens).
- [ ] No unused dependency remains (`npm ls --depth=0` reviewed).
- [ ] `.github/docs/` matches the post-rewrite repo.
- [ ] `libs/` directory is gone (or empty and removed).

## Exit criteria

Zero Spartan references, zero dead code from the rewrite, clean dependency tree,
green build/lint/tests, and documentation that describes the current app.
