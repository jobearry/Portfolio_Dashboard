# 023 — Load résumé projects from the API

Status: Done
Owner: agent
Related docs: `.github/docs/current-state.md`, `.github/docs/screens.md`,
`.github/docs/gaps.md`
Builds on: plans 020 and 022

## Goal

Use the portfolio API's `v1/project?includeTools=true` endpoint for the
client-project list on `/projects`, replacing that page's static highlights.
Keep the separate GitHub repository list unchanged.

## Scope

In:

- Add a typed project-list service using the existing dashboard `Project` API
  model and shared `PortfolioSignalService`.
- Render API project names, contributions, and included tool names in the
  existing highlights cards.
- Handle loading, empty, and error states.
- Keep static highlights for the home page's "Recent Projects" block.
- Update endpoint and screen documentation.

Out:

- No change to dashboard timeline or GitHub repository requests.
- No migration of the home page's static project highlights.

## Tasks

- [x] Confirm the requested API path and response model.
- [x] Write plan 023.
- [x] Add project-list service and focused tests.
- [x] Wire `/projects` Client Projects to API data and states.
- [x] Update documentation and plan status.
- [x] Run focused tests, lint, formatting check, and build.

## Verification

- [x] `/projects` requests `v1/project?includeTools=true`.
- [x] Project cards display server-provided names, contributions, and tools.
- [x] GitHub repositories still load independently.
- [x] Loading, empty, and error states are represented.
- [x] Focused service and Projects page tests (4 tests)
- [x] Full test suite (45 tests)
- [x] `npm run lint`
- [x] `npm run format:check` and Prettier checks for updated docs
- [x] Development build
