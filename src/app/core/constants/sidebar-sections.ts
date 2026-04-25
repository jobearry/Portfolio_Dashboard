import { lucideBriefcaseBusiness, lucideHouse, lucideLayoutDashboard, lucideNotebookPen, lucideRss } from "@ng-icons/lucide";

export interface SidebarGroupMenu {
  title: string;
  url: string;
  icon: string;
}
export interface SidebarGroup {
  groupLabel: string;
  groupContent: SidebarGroupMenu[];
}
export const sidebarIcons: Record<string, string> = {lucideRss, lucideNotebookPen, lucideLayoutDashboard, lucideBriefcaseBusiness}
export const sidebarContent: SidebarGroup[] = [
  {
    groupLabel: 'Main',
    groupContent: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: 'lucideLayoutDashboard',
      },
      {
        title: 'Portfolio',
        url: '/portfolio',
        icon: 'lucideBriefcaseBusiness',
      },
    ],
  },
  {
    groupLabel: 'Blog',
    groupContent: [
      {
        title: 'Journal',
        url: '/blog',
        icon: 'lucideNotebookPen',
      },
    ],
  },
];
