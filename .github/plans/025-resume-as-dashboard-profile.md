# 025 — Use the résumé as the dashboard profile

Status: In progress
Owner: agent
Related docs: `AGENTS.md`, `.github/docs/current-state.md`,
`.github/docs/screens.md`, `.github/docs/gaps.md`
Builds on: plans 020, 021, and 024

## Goal

Replace the dashboard sidebar's **Public site** link with **Profile** to the
résumé at `/`, and park the former dashboard `/profile` screen.

## Scope

In:

- Rename the sidebar footer link to **Profile**, keep it linked to `/`, and use
  a profile icon.
- Point the account menu's **View profile** item to `/`.
- Replace the dashboard profile child route with a `/profile` compatibility
  redirect to `/`.
- Update route, screen, and repository entry-point docs.
- Test that `/profile` resolves to the résumé and no Public site entry remains.

Out:

- Do not delete the old dashboard profile component or its supporting code;
  leave it parked and unrouted.
- Keep `/` and `/projects` as public résumé routes outside the dashboard shell.
- Keep the résumé's **View dashboard** cross-link.

## Affected surface

- Routes: legacy `/profile` redirects to `/`.
- Components: sidebar footer; account menu.
- Services / models: none.
- Endpoints: none.
- Assets / config: none.
- Tests: sidebar and app route tests.
- Docs: `AGENTS.md` and `.github/docs/`.

## Tasks

- [x] Confirm desired navigation behavior with the user.
- [x] Write plan 025.
- [x] Update sidebar and account menu profile links.
- [x] Redirect `/profile` to the résumé; keep old dashboard page unrouted.
- [x] Update route and screen documentation.
- [x] Run focused tests, lint, formatting, and build.

## Risks / decisions

- The sidebar's Profile link leaves the shell because the résumé remains at `/`.
  The résumé's existing View dashboard control remains the return path.
- `/profile` remains a compatibility URL but redirects to `/`; old page code is
  retained for possible future reuse.

## Verification

- [x] The sidebar has a Profile link to `/` and no Public site link.
- [x] Account menu View profile goes to `/`.
- [x] `/profile` redirects to `/` and loads the résumé outside the dashboard shell.
- [x] Dashboard, timeline, blog, and projects routes remain unchanged.
- [x] Focused route and navigation tests (16 tests)
- [x] Full test suite (50 tests)
- [x] `npm run lint`
- [x] Source formatting check
- [x] Development build
