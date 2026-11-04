# 029 — Reload projects from résumé preview

Status: Done
Owner: agent
Related docs: `.github/docs/screens.md`

## Goal

Make the Recent Projects **View more** link perform a full page load of
`/projects` whenever clicked.

## Scope

In:

- Replace client-side routing for the Recent Projects link with a normal
  same-origin link so the projects page reloads on each click.
- Update the relevant screen documentation and test the link behavior.

Out:

- No change to projects page content or API behavior.
- No change to other résumé navigation links.

## Affected surface

- Routes: none.
- Components: résumé home Recent Projects.
- Services / models: none.
- Endpoints: none.
- Assets / config: none.
- Tests: Recent Projects component spec.
- Docs: `.github/docs/screens.md`.

## Tasks

- [x] Make View more perform a full navigation to `/projects`.
- [x] Verify link behavior and existing Recent Projects tests.
- [x] Update documentation and plan status.
- [x] Run focused tests, lint, formatting, and build.

## Risks / decisions

- A standard same-origin anchor intentionally reloads the Angular application,
  rather than using client-side routing.

## Verification

- View more resolves to `/projects` without `routerLink`.
- Clicking it triggers browser navigation, allowing the app and project data to
  load afresh.
