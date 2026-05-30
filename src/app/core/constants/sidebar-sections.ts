import {
  lucideBriefcaseBusiness,
  lucideLayoutDashboard,
  lucideNotebookPen,
  lucideRss,
} from '@ng-icons/lucide';

export interface SidebarGroupMenu {
  title: string;
  url: string;
  icon: string;
}

export const SIDEBAR_ICONS: Record<string, string> = {
  lucideRss,
  lucideNotebookPen,
  lucideLayoutDashboard,
  lucideBriefcaseBusiness,
};
export const sidebarContent: SidebarGroupMenu[] = [
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
  {
    title: 'Blog',
    url: '/blog',
    icon: 'lucideRss',
  },
];
