# 035 — Document current sidebar navigation

Status: Done
Owner: agent
Related docs: `AGENTS.md`, `.github/docs/current-state.md`,
`.github/docs/screens.md`, `.github/docs/gaps.md`

## Goal

Update repository documentation to reflect that résumé navigation is available
from the account menu, while the sidebar footer only contains its collapse
control.

## Scope

In:

- Correct current sidebar and résumé navigation statements in the docs.
- Record that the account menu's View profile item still navigates to `/`.

Out:

- No application code changes.
- No route or navigation behavior changes.

## Affected surface

- Routes: none.
- Components: documentation of `ShellSidebar` and `UserMenu`.
- Services / models: none.
- Endpoints: none.
- Assets / config: none.
- Tests: documentation-only; no validation required.
- Docs: `AGENTS.md`, `.github/docs/current-state.md`,
  `.github/docs/screens.md`, `.github/docs/gaps.md`.

## Tasks

- [x] Update navigation descriptions to match current components.
- [x] Verify no current-state docs claim a sidebar Profile link exists.

## Risks / decisions

- Keep historical plan 025 unchanged; its original decision remains in history.
- Document the live UI, not historical plans or test-only references.

## Verification

- Live-state docs describe View profile in the account menu linking to `/`.
- Live-state docs describe the sidebar footer as collapse-only.
