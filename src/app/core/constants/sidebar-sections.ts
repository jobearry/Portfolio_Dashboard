import { lucideChartGantt, lucideGlobe, lucideLayoutDashboard, lucideRss } from '@ng-icons/lucide';

export interface SidebarGroupMenu {
  title: string;
  url: string;
  icon: string;
}

export const SIDEBAR_ICONS: Record<string, string> = {
  lucideRss,
  lucideLayoutDashboard,
  lucideChartGantt,
  lucideGlobe,
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

/**
 * Cross-link out of the dashboard into the public résumé landing page.
 *
 * Deliberately outside `sidebarContent`: that array drives the primary `<nav>`
 * and every entry takes an active state. The public site renders outside the
 * dashboard shell, so it can never be active, and it is not a dashboard
 * destination.
 */
export const publicSiteLink: SidebarGroupMenu = {
  title: 'Public site',
  url: '/',
  icon: 'lucideGlobe',
};
