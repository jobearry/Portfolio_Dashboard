# 019 — Monorepo: import the second frontend with history

Status: Superseded by plan 020 (not implemented)
Owner: agent
Related docs: `.github/docs/current-state.md`, `.github/docs/gaps.md`,
`AGENTS.md`, `.github/rules/quality.md`

> **Superseded.** The second frontend turned out to be an Angular app that
> belongs as a route inside this app, not as a sibling application. A monorepo
> (npm workspaces, `apps/*`, a second Vercel project) adds build, dependency
> hoisting, and deployment surface for no benefit when the result is one
> deployed app. The history-import mechanics in Phase 1 remain correct and are
> carried forward; Phases 2–3 are dropped. See plan 020.

## Goal

Turn this repository into a two-app monorepo without losing either app's git
history. The existing Angular dashboard moves to `apps/portfolio/` and the
second frontend is imported to `apps/<other-app>/`, with all of its commits
becoming real ancestors of `main` (so `git log --follow`, `git blame`, and
`git bisect` keep working).

## Scope

In:

- Import the second frontend's full history, rewritten so every path is
  prefixed with `apps/<other-app>/`.
- Merge that history into `chore/monorepo-merge` with
  `--allow-unrelated-histories`.
- Relocate this Angular app from the repository root to `apps/portfolio/`.
- Add root-level npm workspaces so both apps share one `node_modules`.
- Move deployment config to per-app scope (`vercel.json` per app).
- Update `AGENTS.md`, `.github/docs/`, and tooling paths to match the new
  layout.

Out:

- Changing application code, routes, components, models, or endpoints in
  either frontend.
- Merging the two apps into a single build or shared design system.
- Rewriting this repository's own existing history.
- Deploying anything.

## Decisions

**Layout.** True monorepo:

```
apps/
  portfolio/      # this app, moved from root
  <other-app>/    # imported frontend
package.json      # workspaces + orchestration scripts only
```

**Import method.** `git-filter-repo --to-subdirectory-filter`, not
`git subtree`. Subtree records the import as a squashed side branch and
`git log --follow` breaks across the boundary; filter-repo produces a normal
merge with correct paths, so history following works.

**Order.** Import the second app **first**, then relocate this app. The import
touches only `apps/<other-app>/**`, so it merges with zero conflicts against
the current root layout. Relocating afterwards is a pure `git mv` in a separate
commit, which keeps both steps independently revertible.

**Confirmed import policy** (decided before Phase 1):

- **Default branch only.** No other branches are fetched. Their remaining
  branches stay in their own repository.
- **Tags are not imported.** Avoids tag-name collisions and tags pointing at
  commits whose paths changed meaning. Can be imported later with a
  `<other-app>-` prefix if needed.
- **Their `.github/` is deleted in the import commit.** GitHub only runs
  workflows and reads `CODEOWNERS`/`dependabot.yml` from the repository root, so
  `apps/<other-app>/.github/**` would be inert. The originals remain in their
  own repository; anything worth keeping gets ported to the root `.github/`
  deliberately, not by accident.
- **No `--force` on `filter-repo`.** It must refuse rather than bypass its
  fresh-clone safety check.

**Move detection.** `git mv` + rename detection preserves file history, but
`git log --follow` needs `--find-renames` (on by default) — it will still work
per-file. Directory-level history requires `--follow` per path; this is a
documented, accepted limitation of any repository restructure.

## Affected surface

- Routes: none in either app (base href and Vercel rewrites are config, not
  routes)
- Components: none
- Services / models: none
- Endpoints: none
- Assets / config:
  - `package.json`, `package-lock.json` → root workspace manifest; per-app
    manifests under `apps/*/`
  - `angular.json`, `tsconfig*.json`, `eslint.config.js`, `.postcssrc.json`,
    `.prettierrc`, `.prettierignore`, `.editorconfig`, `.vscode/`
  - `scripts/genenv.js` and `.env` / `.env.example` (relative paths break when
    the app leaves the root)
  - `vercel.json` → `apps/portfolio/vercel.json`, plus a second project for the
    other app
  - `AGENTS.md`, `README.md`, `.github/docs/*`, `.github/rules/*` (all contain
    root-relative paths)
  - `src/environments/*` stays generated; only the generator's output path
    changes

## Tasks

### Phase 1 — Import the second frontend

- [ ] Confirm the second repo URL and its default branch; record both here.
- [ ] Clone it outside the working tree:
      `git clone <other-repo-url> /tmp/opencode/<other-app>-import`
- [ ] Rewrite paths inside the clone (no `--force`; a refusal is meaningful):
      `git filter-repo --to-subdirectory-filter apps/<other-app>`
- [ ] Verify the rewrite: `git ls-tree -r --name-only HEAD | head` shows only
      `apps/<other-app>/...`, and `git log --oneline | wc -l` is unchanged.
- [ ] Add it as a temporary remote and fetch the default branch only, without
      tags: `git remote add <other-app>-import /tmp/opencode/<other-app>-import`
      then `git fetch --no-tags <other-app>-import <branch>`
- [ ] Merge with unrelated-history support:
      `git merge --allow-unrelated-histories --no-ff <other-app>-import/main`
- [ ] Remove the temporary remote.
- [ ] Drop the now-inert imported config in its own commit:
      `git rm -r apps/<other-app>/.github` (root-of-import `.github/` only —
      never the repository root `.github/`).
- [ ] Confirm both histories are reachable: `git log --oneline --all --graph`.

### Phase 2 — Relocate this app

- [ ] `mkdir -p apps && git mv <root app files> apps/portfolio/`
      (move `src/`, `public/`, `scripts/`, `angular.json`, `tsconfig*.json`,
      `eslint.config.js`, `.postcssrc.json`, `.prettierrc`, `.prettierignore`,
      `.vscode/`, `vercel.json`, `opencode.json` as appropriate — keep
      `.github/`, `.git/`, and `package.json` at the root).
- [ ] Keep `.editorconfig` at the root so both apps inherit it.
- [ ] Fix relative paths inside `apps/portfolio/`: `angular.json` (`root`,
      `sourceRoot`, `outputPath`), `tsconfig*.json` (`include`/`rootDir`),
      `scripts/genenv.js` (read `.env` from the repo root, emit into
      `apps/portfolio/src/environments`).
- [ ] Decide `.env` location: single root `.env` shared by both apps, or one per
      app. Document the choice; do not commit secrets.

### Phase 3 — Workspaces and deploy config

- [ ] Root `package.json`: `"private": true`, `"workspaces": ["apps/*"]`, plus
      scripts that delegate (`build:portfolio`, `build:<other-app>`, `test`,
      `lint`).
- [ ] Remove the leaf `package-lock.json` files and generate one root lockfile.
- [ ] Move `vercel.json` into `apps/portfolio/` and add/confirm the equivalent
      for the other app; set each Vercel project's Root Directory to its app
      folder.
- [ ] Add a root `.gitignore` covering both apps (`node_modules`, `dist`,
      `.angular`, `out-tsc`, generated environments).

### Phase 4 — Docs and rules

- [ ] Update `AGENTS.md`: repository map, commands, landmines
      (`scripts/genenv.js` paths, workspace install).
- [ ] Update `.github/docs/current-state.md` and `.github/docs/gaps.md` with the
      new layout and any new constraints.
- [ ] Note in `.github/rules/quality.md` how verification runs per app.
- [ ] Mark this plan `Done`.

## Risks / decisions

- **Dependency hoisting.** Angular apps usually tolerate hoisted
  `node_modules`, but CLI/Vitest binary resolution can break if the two apps
  pin incompatible majors. If `npm run build` or `npm test` fails after
  workspace adoption, fall back to per-app installs (`workspaces` removed, root
  reduced to orchestration scripts) and record the decision here.
- **Unrelated histories.** The merge commit intentionally joins two roots.
  Tooling that assumes a single root (some changelog generators) may need
  adjusting; nothing in this repo does.
- **Both apps must stay buildable independently.** The monorepo must not
  couple their build outputs.
- **`.env` is git-ignored and generated.** `npm start`/`npm run build*` invoke
  `genenv.js`, which overwrites environment files. Its path handling is the
  most likely thing to break; verify it explicitly.
- **Rollback.** Everything happens on `chore/monorepo-merge`. If it goes wrong,
  `git checkout main` and delete the branch; `main` is untouched.
- **Do not** run `filter-repo` inside this working tree — it rewrites history
  and refuses without `--force`. Only run it on the throwaway clone.

## Verification

- [ ] `git log --oneline --graph --all` shows two roots joined by one merge
      commit, with the imported app's commits intact.
- [ ] `git log --follow -- apps/<other-app>/package.json` shows the imported
      history.
- [ ] `git log --follow -- apps/portfolio/src/app/app.ts` shows this app's
      history.
- [ ] `npm install` at the root succeeds and produces a single lockfile.
- [ ] `npm run build:prod` for **each** app succeeds.
- [ ] `npm test` passes for **each** app (38 tests for the portfolio app).
- [ ] `npm run lint` passes for each app.
- [ ] `node scripts/genenv.js` still writes the expected environment files.
- [ ] Manual: `/dashboard`, `/timeline`, `/profile`, `/blog` still load in the
      portfolio app, including loading, empty, and error states.
- [ ] Responsive and keyboard check for the relocated app.
- [ ] Vercel build simulated locally (`npm run build:prod` from each app root).
