import { lucideHouse, lucideNotebookPen, lucideRss } from "@ng-icons/lucide";

export interface SidebarGroupMenu {
  title: string;
  url: string;
  icon: string;
  group: string;
}
export interface SidebarGroup {
  groupLabel: string;
  groupContent: SidebarGroupMenu[];
}
export const sidebarIcons: Record<string, string> = {lucideHouse, lucideRss, lucideNotebookPen}
export const sidebarContent: SidebarGroup[] = [
  {
    groupLabel: 'Main',
    groupContent: [
      {
        title: 'Home',
        url: '/dashboard/home',
        icon: 'lucideHouse',
        group: 'Main',
      },
    ],
  },
  {
    groupLabel: 'Blog',
    groupContent: [
      {
        title: 'Journal',
        url: '/dashboard/blog',
        icon: 'lucideNotebookPen',
        group: 'Main',
      },
    ],
  },
];
