# 038 — Release mobile scroll lock on profile navigation

Status: Done
Owner: agent
Related docs: `.github/docs/screens.md`, `.github/docs/gaps.md`

## Goal

Ensure selecting View profile from the account menu closes the mobile sidebar
and releases its body scroll lock when navigating to the résumé.

## Scope

In:

- Close the mobile sidebar when View profile is activated.
- Add an app-level regression test for navigating from the dashboard to `/`.

Out:

- No change to desktop navigation behavior or destinations.
- No change to résumé content.

## Affected surface

- Routes: dashboard → résumé `/`.
- Components: dashboard account menu.
- Services / models: reuse `ShellStateService`.
- Endpoints: none.
- Assets / config: none.
- Tests: application routing spec.
- Docs: no current behavior change; mobile navigation docs already state that
  the sidebar closes on navigation.

## Tasks

- [x] Close mobile sidebar state when View profile is activated.
- [x] Assert navigation, sidebar removal, and body-scroll restoration.
- [x] Run focused tests, lint, formatting, and production build.

## Risks / decisions

- Do not restore focus to a dashboard trigger that is removed by navigation.
- Keep the router link as the navigation mechanism.

## Verification

- On View profile activation, `/` renders without the shell.
- Mobile sidebar state is closed and the prior body overflow style is restored.
