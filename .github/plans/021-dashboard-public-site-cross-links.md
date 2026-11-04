# 021 — Cross-links between the dashboard and the public site

Status: In progress
Owner: agent
Related docs: `.github/docs/screens.md`, `.github/docs/current-state.md`,
`.github/rules/angular.md`, `.github/rules/tailwind.md`
Builds on: plan 020

## Goal

Make the two halves of the app reach each other in **one tab**. A dashboard user
can jump to the public résumé; a résumé visitor can jump back to the dashboard.
Neither direction strands the user.

## Scope

In:

- A **Public site** entry in the dashboard sidebar footer, above the Collapse
  button, using `routerLink="/"`.
- A **View dashboard** icon button next to the theme toggle on `/` and
  `/projects`, using `routerLink="/dashboard"`.
- Tests for both directions, plus doc updates.

Out:

- No new routes, guards, or auth.
- No `target="_blank"` — both links stay in-tab by request.
- No change to the public page layout beyond the new button.
- No changes to the existing "View profile" dropdown entry (screens.md line 41
  stays valid).

## Affected surface

- Routes: none added. Cross-links only.
- Components:
  - `features/dashboard/shell/sidebar/sidebar.ts` — footer link.
  - `features/resume/components/dashboard-link.ts` — **new** icon link.
  - `features/resume/pages/home/components/profile/profile.html` — mount it.
  - `features/resume/pages/projects/ui/projects.html` — mount it.
- Services / models: none.
- Constants: `core/constants/sidebar-sections.ts` — `publicSiteLink`, register
  `lucideGlobe`.
- Endpoints: none.
- Assets / config: none.
- Tests: `sidebar.spec.ts`, `app.spec.ts`.

## Why the link lives outside `sidebarContent`

`sidebarContent` drives the primary `<nav>` and every entry gets
`routerLinkActive`. The public site is **not** a dashboard destination: it
renders outside the shell, so it can never match an active state, and mixing it
into the destination list would make it look like a fourth dashboard page.
Rendering it in the footer, above Collapse, reads as "leave the dashboard",
which is what it is.

## Tasks

- [x] Write plan 021.
- [x] Add `publicSiteLink` + `lucideGlobe` to `sidebar-sections.ts`.
- [x] Render the Public site link in the sidebar footer.
- [x] Create `DashboardLink` in `features/resume/components/`.
- [x] Mount it beside the theme toggle on `/` and `/projects`.
- [x] Add specs for both links.
- [x] Update `screens.md` and `current-state.md`.
- [x] Run build, prod build, tests, lint.

## Risks / decisions

- **Clicking Public site unmounts the shell — by design.** The landing page is
  a top-level route with `pathMatch: 'full'` above the shell. The symmetric
  View dashboard link on the résumé pages is what makes that safe; without it
  the only way back would be editing the URL.
- **The résumé exposes the `/dashboard` URL to visitors.** Accepted: the
  dashboard is read-only and unauthenticated, and the link is a convenience for
  the owner rather than a secret. If the dashboard ever gains auth, this button
  should be hidden or gated — noted here so the decision is discoverable.
- **Profile header spacing.** The two-button cluster is wider than the old
  single toggle, so the offset moves to `right-4 top-4` on mobile and keeps
  `right-10 top-10` from `sm` up, avoiding the centred avatar on narrow screens.
- **Icon choice.** `lucideGlobe` for "public site" rather than
  `lucideExternalLink`, because the link no longer opens a new tab.

## Deviations

- `npm run format:check` was already failing on 28 files inherited from 020:
  the import was never run through Prettier, so CI would have failed on this
  branch regardless of 021. `npm run format` was applied to the whole tree; the
  diff for those files is whitespace/quote style only. Worth remembering when
  reviewing the diff.

## Verification

- [x] `npm run build`
- [x] `npm run build:prod`
- [x] `npm test`
- [x] `npm run lint`
- [ ] Manual: sidebar → Public site lands on `/` with no shell, then View
      dashboard returns to `/dashboard`.
- [ ] Manual: `/projects` → View dashboard works.
- [ ] Manual: sidebar in collapsed rail shows the icon with an accessible name.
- [ ] Manual: keyboard — both links are focusable with a visible ring and a
      meaningful accessible name.
- [ ] Manual: `/dashboard`, `/timeline`, `/profile`, `/blog`, wildcard unchanged.
