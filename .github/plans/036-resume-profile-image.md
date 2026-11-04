# 036 — Use configured résumé profile image

Status: Done
Owner: agent
Related docs: `.github/docs/current-state.md`, `.github/docs/screens.md`,
`.github/docs/gaps.md`

## Goal

Use the existing `public/jg-profile.png` asset for the résumé profile photo.

## Scope

In:

- Replace résumé theme-specific image swapping with the configured profile
  avatar asset.
- Remove obsolete image fallback and theme-observer logic.
- Update image references in current-state documentation.

Out:

- No change to dashboard avatar usage or profile text.
- No asset edits.

## Affected surface

- Routes: résumé landing `/`.
- Components: résumé home profile header.
- Services / models: reuse `site.assets.profileAvatar`.
- Endpoints: none.
- Assets / config: use existing `public/jg-profile.png`.
- Tests: existing app route test/build validation.
- Docs: `.github/docs/current-state.md`, `.github/docs/screens.md`,
  `.github/docs/gaps.md`.

## Tasks

- [x] Render the configured `jg-profile.png` photo from the résumé header.
- [x] Remove stale theme-swap and fallback logic.
- [x] Update documentation and plan status.
- [x] Run focused app tests, lint, formatting, and production build.

## Risks / decisions

- The new image is a single asset for both themes; no theme-specific image
  selection is needed.
- Build the URL from the existing configured asset name using a root-relative
  public path.

## Verification

- The résumé photo source resolves to `/jg-profile.png`.
- No stale `/profile.png` or `/profile_dark.png` usage remains in the résumé
  profile component or live screen documentation.
