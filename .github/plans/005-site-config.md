# 005 — Site and profile configuration

Status: Draft
Owner:
Depends on: 004
Related docs: `.github/docs/gaps.md` (Profile, Blog), `.github/docs/screens.md`

## Goal

Move every hardcoded personal/Notion value out of components into one typed
config module, so the shell and screen rebuilds (006, 007) are written once.

This is a pure extraction: no visual change.

## Scope

**In:**

- Typed site/profile config: name, handle, role/subtitle, bio, GitHub URL, CV
  URL, avatar paths.
- Move the hardcoded Notion page ID and public domain out of `Blog` and
  `notion.constants.ts`.
- Move the hardcoded Notion page ID and public domain out of `Blog` and
  `notion.constants.ts` into the typed config module.
- Remove the now-duplicated strings from templates.

**Out:**

- Restyling the profile or blog.
- Adding contact/email/LinkedIn links.
- Any backend change.

## Affected surface

- New: `src/app/core/config/site.config.ts` (+ `index.ts`, interfaces)
- `src/app/features/dashboard/shell/dashboard.ts` (passes `title`/`subtitle` to
  the sidebar today)
- `src/app/features/dashboard/pages/profile/profile.ts`
- `src/app/features/dashboard/pages/blog/blog.ts`
- `src/app/features/dashboard/pages/blog/core/notion.constants.ts`
- `src/app/core/constants/sidebar-sections.ts` (only if labels/URLs move)

## Tasks

- [ ] Create `site.config.ts` with explicit interfaces (no `any`, no inline
      shapes):
      `SiteConfig { profile: ProfileConfig; links: LinkConfig; assets:
      AssetConfig; notion?: NotionConfig }`.
- [ ] Populate it from the current values:
      `Jonathan Golimlim`, `@jthan`, `Software Engineer`, the bio sentence,
      `https://github.com/jobearry`, the Google Drive CV URL, `grad_1.jpeg`,
      `jg-profile.png`.
- [ ] Replace the literals in the shell inputs and the profile template.
- [ ] Replace the page ID in `Blog.ngOnInit` with the configured value.
- [ ] Notion location (decided 2026-10-20): **typed config module**. The page ID
      and public domain are public content values, not deployment secrets, so
      `scripts/genenv.js`, CI, and Vercel are not touched. Keep
      `NOTION_PUBLIC_DOMAIN` derivable from that one source.
- [ ] Remove the duplicated hardcoded domain from `notion.constants.ts` or make
      that file re-export the configured value (no second literal).
- [ ] Keep the config read-only and typed (`as const satisfies SiteConfig`).
- [ ] Update `.github/docs/screens.md` where it lists hardcoded values.

## Risks / decisions

- **Notion location:** config module, decided. No environment/tooling change is
  needed, so 005 stays a pure extraction.
- **Icons/avatar paths:** keep paths root-relative (`grad_1.jpeg`,
  `jg-profile.png`) exactly as served from `public/`, otherwise the shell and
  profile break on nested routes.
- **CV URL** is a Google Drive direct-download link. Do not "normalize" it to a
  view URL.

## Verification

- [ ] `npm run build`, `npm test`, `npm run lint`.
- [ ] `/profile` shows the same name, handle, bio, avatar, GitHub, and CV link.
- [ ] `/blog` still loads and links resolve to the same public Notion URLs.
- [ ] `grep -rn "Jonathan Golimlim\|@jthan\|jobearry\|drive.google.com\|jg-profile\|grad_1" src/app --include=*.ts --include=*.html`
      returns only `site.config.ts` (and `index.html` if the title stays there).
- [ ] No visual diff on `/profile` or `/blog`.

## Exit criteria

One typed module is the only place personal/Notion content lives; 006 and 007
can rewrite templates without re-editing content.
