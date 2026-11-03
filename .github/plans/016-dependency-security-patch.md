# 016 — Dependency security patch (Angular 21.2.26)

Status: In progress
Owner: agent
Related docs: `.github/docs/gaps.md`, `.github/docs/current-state.md`

## Goal

Clear every runtime (`dependencies`) advisory reported by `npm audit` by bumping
the Angular framework packages to the latest 21.2.x patch, without changing
declared ranges in `package.json`.

## Scope

In:

- Update `@angular/core`, `common`, `compiler`, `compiler-cli`,
  `platform-browser`, `router` from `21.2.8` to `21.2.26`, raising the
  `package.json` floor to `^21.2.26`.
- Refresh `package-lock.json` in place (existing uncommitted lockfile changes are
  kept, not reverted).
- Record the remaining accepted advisories as known gaps.

Out:

- Angular major upgrade (21 → 22) or CLI/build major upgrade.
- ESLint 10, TypeScript 7, jsdom 30, vitest 5 migrations.
- Minor bumps to `@ng-icons`, `tailwindcss`, `dotenv`, `tslib`.
- Any application source change.

## Affected surface

- Routes: none
- Components: none
- Services / models: none
- Endpoints: none
- Assets / config: `package.json` (ranges unchanged), `package-lock.json`

## Tasks

- [x] Install Angular framework packages at `21.2.26`.
- [x] Confirm no runtime advisories remain in `npm audit`.
- [x] Run `npm run build`.
- [x] Run `npm test`.
- [ ] Manual check of `/dashboard`, `/timeline`, `/profile`, `/blog`.
- [x] Document accepted dev-only advisories in `.github/docs/gaps.md`.

## Risks / decisions

- **Lockfile already dirty.** `package-lock.json` had uncommitted changes before
  this work (CLI/build already resolved to `21.2.29`, runtime still pinned to
  `21.2.8`). Per user decision, the changes are kept and updated on top of.
- **Patch-only on the framework, floor raised.** `21.2.26` satisfies the old
  `^21.1.0` ranges, but npm refused to re-resolve the peer-locked Angular set in
  place (`ERESOLVE` conflict on the stale `21.2.8` tree). Dependency ranges in
  `package.json` were therefore raised to `^21.2.26` so a fresh install can never
  resolve back to a vulnerable patch, and `npm install --force` was used to
  replace the peer-locked tree. Result verified with `npm ls --all` (no
  `invalid` entries; only platform-specific optional deps are unmet).
- **Accepted, not fixed:** advisories reachable only through build/dev tooling
  (`@angular/cli` → `pacote`, `glob`, `minimatch`, the `eslint` chain,
  `@babel/core`). Fix paths require semver-major upgrades with no deployment
  exposure for this app.
- **Not applicable by architecture:** `HttpTransferCache` and SSR router
  advisories. The app is a static SPA on Vercel (`vercel.json` uses
  `@vercel/static-build` with no `server` output) and registers no
  `provideClientHydration()`.

## Verification

- [x] `npm run build` — clean, 2.9 s, same chunk layout as before.
- [x] `npm test` — 31/32 pass; the one failure is the pre-existing
      `overview.spec.ts:73` card-class assertion recorded in plan 015.
- [x] `npm audit` — 0 high, 0 critical, 0 low. 34 moderate entries remain, all
      dev/build-only, collapsing to 2 distinct advisories.
- [x] `npm run lint` — clean.
- [x] Routes serve the SPA shell at `/dashboard`, `/timeline`, `/profile`,
      `/blog` (HTTP 200, `<app-root>` present).
- [ ] Interactive browser check of the four routes — not automatable here (no
      Browser MCP connection). Application source was untouched by this plan, so
      behavior is expected to be identical; pending a human eyeball.

Status: Done (interactive route check pending)
