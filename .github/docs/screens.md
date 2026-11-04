# Screens

Detailed trace of every live screen: how it is reached, what it renders, where
its data comes from, and what can be interacted with.

## Shell (dashboard routes only)

The shell wraps `/dashboard`, `/timeline`, `/profile`, and `/blog`. The public
resume pages at `/` and `/projects` render outside it — see screens 6 and 7.

- **Files:** `shell/dashboard.{ts,html}`, `shell/sidebar/sidebar.ts`,
  `shell/header/header.ts`, `shell/user-menu/user-menu.ts`,
  `shell/shell-state.service.ts`
- **Reach:** mounted for every dashboard path.
- **Shows:**
  - Sidebar (plain Tailwind, semantic tokens):
    - User menu trigger: `grad_1.jpeg` avatar + name + role. It is a real
      disclosure button, not a link.
    - Menu: Dashboard, Timeline, Blog (icon + label, `sr-only` label in rail).
    - Footer: **Public site** link (`/`, `lucideGlobe`) above the collapse/expand
      button. It is a regular `routerLink`, not a new tab; the resume landing
      page has a matching **View dashboard** button so the trip is reversible.
      The collapse/expand button is desktop only.
  - Sticky header (`h-14`, border, `z-30`): mobile menu trigger below `md`, then
    the route page title (`h1`).
  - Content: centered `max-w-[75rem]`, `p-3`, inside `<main>`.
- **Title:** derived from the deepest active route's `data.pageTitle`, so it is
  correct on first load, deep links, reload, and back/forward. Each child route
  also sets `title` (`Label | Jonathan Golimlim`) for the document tab.
- **Active link:** `routerLinkActive` with exact matching, accent background, and
  `aria-current="page"`.
- **Desktop collapse:** full `16rem` ↔ icon rail `4.5rem`; persisted in
  `localStorage` (`portfolio-sidebar-collapsed`); does not affect mobile.
- **Mobile (below `md`, 48rem/768px):** off-canvas panel (`18rem`) + overlay;
  closes on navigation, overlay click, close button, or Escape; body scroll is
  locked while open; focus moves to the close button and returns to the header
  trigger on close.
- **Dropdown:** `role="menu"` with **View profile** (`/profile`), **Download
  CV** (`site.links.cv`, new tab), and a theme toggle whose label states the next
  action. Mouse and keyboard (ArrowUp/Down, Home/End, Escape); outside click
  closes; focus returns to the trigger.
- **Theme:** light/dark is applied to `<html>` before first paint (stored choice,
  otherwise `prefers-color-scheme`). The only toggle is inside the dropdown.
- **Locked decision:** Profile is reachable from the dropdown, not the sidebar
  menu.
- **Cross-links (021):** the Public site entry lives in the sidebar *footer*,
  outside `sidebarContent`, because it is not a dashboard destination and must
  never take an active state. `/` and `/projects` each render a **View
  dashboard** icon link that returns to `/dashboard` in the same tab.

---

## 1. Dashboard / Overview — `/dashboard`

- **Files:** `pages/overview/overview.{ts,html}` (the `pages/home` wrapper was removed in 007).
- **Reach:** sidebar "Dashboard", wildcard redirect, or direct URL.
- **Data:**
  - `GET v1/overview` → `OverviewItem[]` (`key`, `count`) via
    `OverviewSignalService`.
  - `GET v1/github/owner/{site.github.username}/repositories/count` →
    `OverviewItem` via `GithubCountSignalService`.
  - `GET v1/notion/{site.notion.pageId}/count` → `OverviewItem` via
    `NotionCountSignalService`.
  - All three requests start in parallel on init.
- **States:**
  - `v1/overview`: three `app-skeleton` (`metric` variant) cards while loading;
    shared error block with **Try again** on failure; empty message when the API
    returns no items.
  - GitHub and Notion counts: each card shows its own compact skeleton, error
    message, and **Try again** action, so one failure does not hide the rest of
    the overview.
- **Shows:**
  1. Header block: eyebrow "Hello,", `h2` with `site.profile.name` (config, not
     hardcoded copy), caption "Welcome back to your portfolio dashboard". The
     header stays visible during loading and error states.
  2. Responsive grid (`grid-cols-2`, `lg:grid-cols-3`) of five bordered cards
     (`bg-muted/30`):
     - three API metric cards with an uppercase, camelCase/underscore-aware
       label, count, and metric-specific subtitle
     - **GITHUB REPOSITORIES** with "Public repositories on GitHub"
     - **NOTION PAGES** with "Blog posts through my Notion workspace"
  3. The final card stays a normal one-column card; it does not span the full
     mobile width.
  4. Counts use `text-3xl` on mobile and `text-5xl` from `sm`; card padding is
     `p-3` on mobile and `p-5` from `sm`.
- **Interactions:** the only interactive controls are the **Try again** buttons
  on failed count cards; the overview metric cards are informational.

---

## 2. Timeline — `/timeline`

- **File:** `pages/timeline/timeline.ts` (inline template, no HTML file)
- **Reach:** sidebar "Timeline" or direct URL.
- **Data:** `GET v1/experience?includeProjects=true` → `ExperienceTimeline[]`.
- **Ordering:** experiences are ordered by `startedAt` newest to oldest.
- **States:** `app-skeleton` (`text` + `list` variants) while loading; shared
  error block with **Try again** on failure; empty message when there is no
  experience.
- **Shows:**
  1. Header block (`app-page-header`): eyebrow **CAREER**, `h2` **Experience
     timeline**, caption "Roles, responsibilities, and the projects I've worked
     on."
  2. Vertical list of bordered experience cards:
     - Company `company.name` (`h3`)
     - Pill with start year from `duration.startedAt`; the pill is omitted when
       the value is missing or not a valid date (no "Invalid Date")
     - `role.value` | `description`
     - `responsibility`
     - If projects exist: nested **PROJECTS** block (accent dot + `h4`)
       containing cards with:
       - `projectName`
       - `description`
       - chips for each `techStackSpecs[].toolName`
- **Interactions:** none (read-only; no dialog, no links).
- **Comparison:** the legacy `bak/experience` page used a project dialog instead of
  inline nested projects.

---

## 3. Profile — `/profile`

- **Files:** `pages/profile/profile.ts` plus
  `pages/profile/components/{recommendations,skill}.ts`
- **Reach:** sidebar header avatar card or direct URL (no menu item).
- **Data:**
  - `GET v1/recommendation` → `FeedbackItem[]`
  - `GET v1/skill` → `TechStackItem[]`
- **Loading:** `app-skeleton` per fetched section (`list` for recommendations,
  `grid` for skills), with a shared error block (**Try again**) and an empty
  message per section.
- **Shows:**
  1. Hero card (`border`, stacked on mobile, side-by-side from `sm`):
     - Round avatar from `site.assets.profileAvatar` (background
       `accent-brand/20`).
     - Name (`h2`) and handle from `site.profile`; bio from
       `site.profile.bio`.
     - Social/resume links rendered as buttons:
       - **View GitHub** → `site.links.github` (outline button, new tab)
       - **Download CV** → `site.links.cv` (accent button, new tab)
       - Icons come from `@ng-icons/lucide`; shields.io badges were removed.
  2. Two-column section (`border`, stacked on mobile, side-by-side from `sm`):
     - **Recommendations:** heading **FEEDBACK** (`h3`) with accent dot; cards
       showing `personName`, `careerPosition.value`, and the quoted
       `description`.
     - **Skills:** heading **SKILL** (`h3`) with accent dot; one column on
       narrow screens, two columns from `380px`, and three columns from `lg`;
       tiles show `stackName` and `category` (`break-words` prevents clipping).
- **Interactions:** only the two external links.
- **Note:** despite the README, there is no editing/CRUD on this page.

---

## 4. Blog — `/blog`

- **Files:** `pages/blog/blog.{ts,html}`, `core/*`, `store/*`
- **Reach:** sidebar "Blog" or direct URL.
- **Data:** `GET v1/notion/{site.notion.pageId}` → `NotionPageCard[]` via
  `NotionSignalService`. The page ID comes from `site.notion` (005).
- **Loading:** `app-skeleton` (`entries` variant).
- **Header:** `app-page-header` with eyebrow **WRITING**, `h2` **Notes from the
  journey**, caption "Thoughts on software, projects, and the lessons along the
  way."
- **Shows:** responsive 2-column grid (`lg:grid-cols-2`) of external links:
  - two-digit index (`01`, `02`, …; single digit gets a leading zero)
  - `title` (`h3`)
  - `date`
  - `lucideExternalLink` icon
  - visually hidden "(opens in a new tab)" for screen readers
- **URL rewrite:** `convertNotionUrl` rebuilds each URL as
  `https://{site.notion.publicDomain}{pathname}`; on parse failure it returns the
  original URL.
- **Interactions:** each entry opens in a new tab; hover/focus lifts the card
  (`-translate-y-0.5` + shadow) with a `motion-reduce` fallback.
- **Notes:** the public Notion domain comes from `site.notion` (005); if the API
  returns `null` or an empty list, an empty state is shown, and a failed request
  shows the shared error block with **Try again**.

---

## 5. Resume landing — `/`

- **Files:** `features/resume/pages/home/ui/home.{ts,html}`,
  `pages/home/constants/home.constants.ts`, `pages/home/components/**`,
  `components/**`
- **Reach:** the empty path with `pathMatch: 'full'`, declared directly above the
  dashboard shell route. Renders **without** the dashboard shell.
- **Shows:**
  - Profile header: photo (`/profile_dark.png`, swapping to `/profile.png` in
    light mode), name, `lucideMapPin` + location, two role pills, GitHub and CV
    links, and the top-right **View dashboard** + theme toggle pair.
  - Two-column responsive grid built from `SIDE_BLOCK_CONTENT` and
    `MAIN_BLOCK_CONTENT`: About, Timeline, Certifications, Recent Projects,
    Technical Stack, and a `Maintenance` placeholder.
  - Footer with the current year and a red `DEV` marker when
    `environment.title` is non-empty (development builds only).
- **Data:** fully static — `home.constants.ts`, `timeline.constants.ts`, and
  `project.constant.ts`. No API call on this screen.
- **Title:** `Jonathan Golimlim | Software Engineer`.
- **Interactions:** *View more* inside Recent Projects navigates to `/projects`;
  **View dashboard** navigates to `/dashboard`; the theme toggle uses the shared
  `ThemeService`.
- **States:** no loading/empty/error states, because nothing is fetched.

---

## 6. Projects — `/projects`

- **Files:** `features/resume/pages/projects/ui/projects.{ts,html}`,
  `pages/projects/components/highlights.ts`, `pages/projects/constants/project.constant.ts`
- **Reach:** top-level `projects` route, above the shell.
- **Shows:** a back button (`/`), a **Projects** pill, the **View dashboard**
  link and the public theme toggle at the right,
  a **Client Projects** block built from the static `PROJECT_HIGHLIGHT` list, and
  a **Github Repos** block listing public repositories.
- **Data:** `GithubRepoSignalService` → `ApiClient.get('github/repos')`.
- **States:**
  - Loading — spinner in the Github block header; the static highlights stay
    visible.
  - Empty — "No public repositories to show yet."
  - Error — a `role="alert"` message rendered from `getErrorMessage()`.
- **Note:** the endpoint is not implemented in the API yet, so this screen
  currently settles into its empty or error state.

---

## 7. Fallback

- Unknown child path → `redirectTo: "dashboard"`.
