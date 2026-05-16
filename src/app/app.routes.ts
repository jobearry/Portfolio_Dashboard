import { Routes } from '@angular/router';
import { Home } from './pages/dashboard/features/home/home';
import { Blog } from './pages/dashboard/features/blog/ui/blog';
import { Dashboard } from './pages/dashboard/dashboard';
import { Portfolio } from './pages/dashboard/features/portfolio/ui/portfolio';

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
      },
      {
        path: "blog",
        component: Blog,
      },
      {
        path: "**",
        redirectTo: "portfolio",
        pathMatch: "full",
      }
    ]
  },
];
