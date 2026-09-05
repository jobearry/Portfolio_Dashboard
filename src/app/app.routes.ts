import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/templates/dashboard';

export const routes: Routes = [
  {
    path: "",
    component: Dashboard,
    title: "Dashboard | Jonathan Golimlim",
    children: [
      {
        path: "dashboard",
        loadComponent: () => import('./features/dashboard/templates/dashboard-home').then(m => m.DashboardHome),
      },
      {
        path: "timeline",
        loadComponent: () => import('./features/dashboard/components/timeline/timeline').then(m => m.Timeline),
      },
      {
        path: "profile",
        loadComponent: () => import('./features/dashboard/components/profile/profile').then(m => m.Profile),
      },
      // {
      //   path: "portfolio",
      //   component: Portfolio,
      //   title: "Portfolio | Jonathan Golimlim",
      //   children:[
      //     {
      //       path: "",
      //       redirectTo: "profile",
      //       pathMatch: "full"
      //     },
      //     { path: "experience", component: ExperienceComponent },
      //     { path: "skill", component: SkillComponent },
      //     // { path: "project", component: ProjectComponent },
      //   ]
      // },
      {
        path: "blog",
        loadComponent: () => import('./features/blog/blog').then(m => m.Blog),
      },
      {
        path: "**",
        redirectTo: "dashboard",
        pathMatch: "full",
      }
    ]
  },
];
