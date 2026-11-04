# 018 — TypeScript 6 rootDir for editor diagnostics

Status: Done
Owner: agent
Related docs: `.github/docs/current-state.md`, `.github/docs/gaps.md`

## Goal

Clear VS Code's red diagnostics in `tsconfig.app.json` and `tsconfig.spec.json`
caused by the editor using TypeScript 6.0.3 while the project uses 5.9.3.

## Scope

In:

- Add `"rootDir": "./src"` to the shared `tsconfig.json` so both project
  configs inherit it.
- Remove the trailing comma from `tsconfig.app.json` so it matches the Angular
  template exactly.
- Record the TypeScript 6 editor requirement in the docs.

Out:

- Upgrading the project's TypeScript dependency.
- Changing application source, routes, or endpoints.
- Removing the existing `tsconfig.json` project references.

## Affected surface

- Routes: none
- Components: none
- Services / models: none
- Endpoints: none
- Assets / config: `tsconfig.json`, `tsconfig.app.json`

## Tasks

- [x] Reproduce the TS5011 diagnostic with VS Code's bundled TypeScript 6.0.3.
- [x] Add `rootDir` to `tsconfig.json`.
- [x] Remove the trailing comma from `tsconfig.app.json`.
- [x] Confirm TS 6.0.3 reports zero diagnostics for app and spec configs.
- [x] Document the editor TypeScript mismatch.

## Risks / decisions

- `rootDir: "./src"` matches the common source directory of both configs, so
  emitted `out-tsc` output keeps the expected layout.
- The project itself continues to use TypeScript 5.9.3; no dependency bump was
  made.
- The fix is shared from the root config so app and spec stay consistent.

## Verification

- [x] Bundled TypeScript 6.0.3: 0 diagnostics for `tsconfig.app.json` and
      `tsconfig.spec.json`.
- [x] `npx tsc -b --force`
- [x] `npm run build`
- [x] `npm run build:prod`
- [x] `npm test` — 38/38 pass.
- [x] `npm run lint`
