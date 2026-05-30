import { Routes } from '@angular/router';
import { Home } from './pages/dashboard/features/home/home';
import { Blog } from './pages/dashboard/features/blog/ui/blog';
import { Dashboard } from './pages/dashboard/dashboard';
import { Portfolio } from './pages/dashboard/features/portfolio/ui/portfolio';
import { Profile } from './pages/dashboard/features/portfolio/pages/profile/profile';
import { Experience } from './pages/dashboard/features/portfolio/pages/experience/experience';

export const routes: Routes = [
  {
    path: "",
    component: Dashboard,
    title: "Dashboard | Jonathan Golimlim",
    children: [
      {
        path: "dashboard",
        component: Home,
      },
      {
        path: "portfolio",
        component: Portfolio,
        title: "Portfolio | Jonathan Golimlim",
        children:[
          {
            path: "",
            redirectTo: "profile",
            pathMatch: "full"
          },
          { path: "profile", component: Profile },
          { path: "experience", component: Experience }
        ]
      },
      {
        path: "blog",
        component: Blog,
        title: 'Blog | Journal',
      },
      {
        path: "**",
        redirectTo: "portfolio",
        pathMatch: "full",
      }
    ]
  },
];
