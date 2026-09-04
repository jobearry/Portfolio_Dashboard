import { Routes } from '@angular/router';
import { Portfolio } from './features/dashboard/bak/portfolio';
import { Blog } from './features/blog/blog';
import { Dashboard } from './features/dashboard/templates/dashboard';
import { DashboardHome } from './features/dashboard/templates/dashboard-home';
import { Profile } from './features/dashboard/profile/profile';

export const routes: Routes = [
  {
    path: "",
    component: Dashboard,
    title: "Dashboard | Jonathan Golimlim",
    children: [
      {
        path: "dashboard",
        component: DashboardHome,
      },
      {
        path: "timeline",
        loadComponent: () => import('./features/dashboard/components/timeline/timeline').then(m => m.Timeline),
      },
      {
        path: "profile",
        component: Profile
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
        component: Blog,
      },
      {
        path: "**",
        redirectTo: "dashboard",
        pathMatch: "full",
      }
    ]
  },
];
