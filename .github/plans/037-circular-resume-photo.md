# 037 — Make résumé profile photo circular

Status: Done
Owner: agent
Related docs: `.github/docs/screens.md`
Builds on: plan 036

## Goal

Render the résumé profile photo as a true circular crop at every responsive size.

## Scope

In:

- Give the image square dimensions at each responsive breakpoint.
- Preserve the circular mask and crop the portrait to fill the square.
- Assert the shape-related utility classes in the résumé route test.

Out:

- No image asset changes.
- No change to dashboard avatar sizing.

## Affected surface

- Routes: résumé landing `/`.
- Components: résumé home profile header.
- Services / models: none.
- Endpoints: none.
- Assets / config: existing `public/jg-profile.png`.
- Tests: app route spec.
- Docs: `.github/docs/screens.md`.

## Tasks

- [x] Apply a square, circular crop to the responsive résumé photo.
- [x] Verify image source and circular sizing classes in the route test.
- [x] Update screen documentation and plan status.
- [x] Run focused tests, lint, formatting, and production build.

## Risks / decisions

- Use `object-cover` to fill the square frame while retaining the existing
  responsive display sizes.

## Verification

- The image has equal responsive width and height utilities plus `rounded-full`
  and `object-cover`.
- The résumé route test continues to verify the configured image source.
