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

export const sidebarContent: SidebarGroup[] = [
  {
    groupLabel: 'Main',
    groupContent: [
      {
        title: 'Home',
        url: 'home',
        icon: 'lucideHouse',
        group: 'Main',
      },
      {
        title: 'Blog',
        url: 'blog',
        icon: 'lucideRss',
        group: 'Main',
      },
    ],
  },
];
