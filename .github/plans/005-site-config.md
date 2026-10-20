# 005 — Site config

Status: Done
Owner: Jonathan Golimlim
Depends on: 004
Related docs: `.github/docs/current-state.md` (sections 4–5),
`.github/docs/screens.md` (Profile, Blog)

## Goal

Move personal content and public integration values out of templates and
components into one typed module, so the shell/screens rebuilds (006–007) never
reintroduce literals.

## Scope

**In:**

- `core/config/site.config.ts` with typed `SiteConfig` and a `site` object.
- Profile content: name, handle, role, bio.
- Links: GitHub, CV.
- Assets: sidebar avatar, profile avatar.
- Notion: page ID, public domain.
- Replace every consumer literal (shell, sidebar, profile, blog, root route
  title, `notion.constants.ts`).

**Out:**

- Environment/API host (stays in `environment.portfolioApi`).
- Menu labels/URLs/icons (stay in `core/constants/sidebar-sections.ts`).
- Replacing the shields.io badge images (decided: 007).
- Any visual change.

## Decisions

- **One module, one import path.** `ProfileConfig`, `LinkConfig`,
  `AssetConfig`, `NotionConfig`, `SiteConfig`; `site` is
  `as const satisfies SiteConfig`. Splitting files added imports without
  benefit.
- **Navigation metadata stays separate.** `sidebar-sections.ts` is UI metadata
  consumed by the shell and icon registry, not personal content.
- **Badges are replaced in 007**, not 005. This phase only moves the URLs into
  config; presentation changes belong to the profile rebuild.
- **`NOTION_PUBLIC_DOMAIN` remains exported** from `pages/blog/core/
notion.constants.ts`, now derived from `site.notion.publicDomain`, so the
  existing `convertNotionUrl` call site does not change.
- **Root route title** uses `site.profile.name`; the document title stays
  `Dashboard | {name}` until 006 adds route-level titles.

## Affected surface

- `src/app/core/config/site.config.ts` (new)
- `src/app/core/index.ts`
- `src/app/app.routes.ts`
- `src/app/features/dashboard/shell/dashboard.ts`
- `src/app/components/sidebar/sidebar.ts`
- `src/app/features/dashboard/pages/profile/profile.ts`
- `src/app/features/dashboard/pages/blog/blog.ts`
- `src/app/features/dashboard/pages/blog/core/notion.constants.ts`

## Tasks

- [x] Add typed config interfaces and the `site` object.
- [x] Export it from `core/index.ts`.
- [x] Shell: title/subtitle from `site.profile`; route title from the name.
- [x] Sidebar: avatar from `site.assets`.
- [x] Profile: avatar, name, handle, bio, GitHub and CV URLs from `site`.
- [x] Blog: page ID from `site.notion`; domain re-export from config.
- [x] Verify no personal/Notion literals remain outside the config module.
- [x] Update `current-state.md`, `screens.md`, `gaps.md`.

## Verification

- [x] `grep -rn` for name, handle, GitHub URL, Drive URL, avatar filenames,
      page ID, and Notion domain matches only `core/config/site.config.ts` (plus the
      `#521945` avatar background and alt text, which are presentation).
- [x] `npm run lint`, `npm run format:check`, `npm run build` pass.
- [x] `npm test` — 14 tests pass (no behavior change, no new tests needed).
- [x] `/profile` renders the config values (name, handle, bio, both links) and
      the avatar loads from `public/`.
- [x] `/blog` still loads Notion pages with the configured page ID and rewrites
      links against the configured domain.

## Known follow-ups

- Replace the shields.io badges with token-styled links (007).
- Remove the remaining hardcoded avatar background color (007).
- Route-level titles and the theme toggle (006).

## Exit criteria

All personal content and Notion identifiers live in one typed config module,
with behavior and visuals unchanged.
