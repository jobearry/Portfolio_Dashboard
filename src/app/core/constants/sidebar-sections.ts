import {
  lucideBriefcaseBusiness,
  lucideChartGantt,
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
  lucideChartGantt,
};
export const sidebarContent: SidebarGroupMenu[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'lucideLayoutDashboard',
  },
  {
    title: 'Timeline',
    url: '/timeline',
    icon: 'lucideChartGantt',
  },
  {
    title: 'Blog',
    url: '/blog',
    icon: 'lucideRss',
  },
];
