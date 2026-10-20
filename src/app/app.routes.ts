import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/dashboard/shell/dashboard').then((m) => m.Dashboard),
    title: 'Dashboard | Jonathan Golimlim',
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/home/dashboard-home').then((m) => m.DashboardHome),
      },
      {
        path: 'timeline',
        loadComponent: () =>
          import('./features/dashboard/pages/timeline/timeline').then((m) => m.Timeline),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/dashboard/pages/profile/profile').then((m) => m.Profile),
      },
      {
        path: 'blog',
        loadComponent: () => import('./features/dashboard/pages/blog/blog').then((m) => m.Blog),
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
