# Screens

Detailed trace of every live screen: how it is reached, what it renders, where
its data comes from, and what can be interacted with.

## Shell (all routes)

- **File:** `src/app/features/dashboard/shell/dashboard.{ts,html}`
- **Reach:** mounted for every path under `/`.
- **Shows:**
  - Left sidebar (Spartan `hlmSidebarWrapper` / `hlm-sidebar`):
    - Header card with `grad_1.jpeg` avatar, **Jonathan Golimlim**, **Software Engineer**.
      The whole card links to `/profile`.
    - Menu: Dashboard, Timeline, Blog (icon + label each).
    - Empty footer.
  - Right main area:
    - Sticky header (`border-b`, `p-2`, `z-index: 10`) containing the sidebar
      toggle and the page title (initially empty).
    - Content region: centered, `max-w-300`, `p-3`, containing the routed page.
- **Behavior:** sidebar navigation; sidebar collapse; on menu/avatar click the
  clicked label becomes the header title.
- **Gaps:** title not derived from the URL (blank on reload); no active-link
  state; Profile absent from the menu.

---

## 1. Dashboard / Home — `/dashboard`

- **Files:** `pages/home/dashboard-home.{ts,html}` → `pages/overview/overview.{ts,html}`
- **Reach:** sidebar "Dashboard", wildcard redirect, or direct URL.
- **Data:** `GET v1/overview` → `DashboardItem[]` via `OverviewSignalService`.
- **States:** skeleton while loading; shared error block with **Try again** on
  failure; empty message when the API returns no items; cards otherwise.
- **Shows:**
  1. Header block: eyebrow "Hello,", `h1` **Than**, caption
     "Welcome back to your portfolio dashboard".
  2. Responsive grid (`sm:grid-cols-3`) of cards, one per API item:
     - uppercase `title`
     - `count` in 3rem semibold
     - `subtitle`
     - divider
     - `description` (small, uppercase tracking)
- **Interactions:** none — the cards are informational. The former
  "View Details →" button (and the nested `<button>`) is gone.

---

## 2. Timeline — `/timeline`

- **File:** `pages/timeline/timeline.ts` (inline template, no HTML file)
- **Reach:** sidebar "Timeline" or direct URL.
- **Data:** `GET v1/experience?includeProjects=true` → `ExperienceTimeline[]`.
- **States:** skeleton while loading; shared error block with **Try again** on
  failure; empty message when there is no experience.
- **Shows:**
  1. Section label **CAREER**.
  2. Vertical list of experience cards:
     - Company `company.name`
     - Pill with start year: `duration.startedAt | date:'yyyy'`
     - `role.value` | `description`
     - `responsibility`
     - If projects exist: nested **PROJECTS** block (accent dot + uppercase)
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
- **Loading:** one `app-skeleton-item` per fetched section, with a shared error
  block (**Try again**) and an empty message per section.
- **Shows:**
  1. Hero card (`border`, stacked on mobile, side-by-side from `sm`):
     - Round avatar `jg-profile.png` (200×200, background `#521945`).
     - Name **Jonathan Golimlim** (`hlmH3`), handle **@jthan**.
     - Bio: "A full-stack software engineer who specializes on developing web
       applications through Angular and .NET".
     - Social/resume list with shields.io badges:
       - **View GitHub** → `https://github.com/jobearry` (new tab)
       - **Download CV** → Google Drive direct download (new tab)
  2. Two-column section (`border`, stacked on mobile, side-by-side from `sm`):
     - **Recommendations:** heading **FEEDBACK** with accent dot; cards showing
       `personName`, `careerPosition.value`, and the quoted `description`.
     - **Skills:** heading **SKILL** with accent dot; 3-column grid of tiles with
       `stackName` and `category`.
- **Interactions:** only the two external links.
- **Note:** despite the README, there is no editing/CRUD on this page.

---

## 4. Blog — `/blog`

- **Files:** `pages/blog/blog.{ts,html}`, `core/*`, `store/*`
- **Reach:** sidebar "Blog" or direct URL.
- **Data:** `GET v1/notion/16348b6ae5dd8032b137c4327f9ab77c` →
  `NotionPageCard[]` via `NotionSignalService`. The page ID is hardcoded in
  `Blog.ngOnInit`.
- **Loading:** `app-skeleton-item`.- **Shows:** responsive 2-column grid (`lg:grid-cols-2`) of external links:
  - two-digit index (`01`, `02`, …; single digit gets a leading zero)
  - `title`
  - `date`
  - `lucideExternalLink` icon
- **URL rewrite:** `convertNotionUrl` rebuilds each URL as
  `https://glamorous-monitor-0b1.notion.site{pathname}`; on parse failure it
  returns the original URL.
- **Interactions:** each entry opens in a new tab; hover/focus applies
  `TRANSITION_MOVE_UP` (lift + shadow).
- **Notes:** public Notion domain is hardcoded in `core/notion.constants.ts`; if
  the API returns `null` or an empty list, an empty state is shown, and a
  failed request shows the shared error block with **Try again**.

---

## 5. Fallback

- Unknown child path → `redirectTo: "dashboard"`.
