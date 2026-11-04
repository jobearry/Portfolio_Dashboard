# 024 — Résumé home recent repositories

Status: In progress
Owner: agent
Related docs: `.github/docs/current-state.md`, `.github/docs/screens.md`
Builds on: plans 020, 022, and 023

## Goal

Show the first two repositories returned by the existing GitHub repositories
endpoint in the résumé home's Recent Projects section.

## Scope

In:

- Fetch repositories for the home-page preview through `GithubRepoSignalService`.
- Show at most the first two results, with loading, empty, and retryable error
  states.
- Keep the full repository list on `/projects`.
- Remove the now-unused static project highlight list.
- Update screen and endpoint documentation.

Out:

- No claim that these repositories are GitHub-pinned.
- No change to repository ordering on the API or to the `/projects` page.

## Tasks

- [x] Confirm the existing GitHub repository service and homepage component pattern.
- [x] Write plan 024.
- [x] Add a home preview component using the existing service and a two-item limit.
- [x] Remove the unused static project data.
- [x] Add focused component coverage and update documentation.
- [x] Run tests, lint, formatting check, and build.

## Verification

- The home preview renders at most two repositories from the existing endpoint.
- `/projects` continues to render the full repository response.
- Loading, empty, and error states are exposed for the homepage preview.

## Verification

- [x] Focused repository preview and projects tests (7 tests)
- [x] Full test suite (48 tests)
- [x] `npm run lint`
- [x] `npm run format:check` and Prettier checks for updated docs
- [x] Development build
