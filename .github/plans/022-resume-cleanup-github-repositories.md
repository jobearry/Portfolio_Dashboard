# 022 — Résumé cleanup and GitHub repositories

Status: Done
Owner: agent
Related docs: `.github/docs/current-state.md`, `.github/docs/screens.md`,
`.github/docs/gaps.md`
Builds on: plans 020 and 021

## Goal

Remove unused résumé components and load the public repository list from the
same owner/repositories API route as the dashboard GitHub count, omitting the
`count` suffix.

## Scope

In:

- Delete the unused terminal widget and the unused marquee-based tech-stack
  component, including the marquee that has no other consumer.
- Keep shared résumé components and constants that are still referenced.
- Change `GithubRepoSignalService` to request
  `v1/github/owner/{username}/repositories`.
- Update endpoint documentation and add focused coverage for the repository
  endpoint.

Out:

- No change to the dashboard count request or its response.
- No redesign of the résumé pages or API model.

## Tasks

- [x] Inspect résumé file references and identify unused components.
- [x] Write plan 022.
- [x] Remove unused terminal, tech-stack, and marquee files.
- [x] Use the dashboard owner/repositories endpoint without `/count`.
- [x] Add/update focused service coverage.
- [x] Update current-state and gaps documentation.
- [x] Run focused tests, lint, formatting check, and build.

## Verification

- [x] The repo list requests
      `v1/github/owner/{site.github.username}/repositories`.
- [x] The existing dashboard count still requests the same path with `/count`.
- [x] No live component imports a deleted file.
- [x] Focused GitHub repository service test
- [x] Full test suite (41 tests)
- [x] `npm run lint`
- [x] `npm run format:check`
- [x] Development build
