import { Routes } from '@angular/router';
import { Home } from './pages/dashboard/features/home/home';
import { Blog } from './pages/dashboard/features/blog/ui/blog';
import { Dashboard } from './pages/dashboard/dashboard';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
  {
    path: "dashboard",
    component: Dashboard,
    title: "Dashboard - Jonathan Golimlim",
    children: [
      {
        path: "home",
        component: Home,
      },
      {
        path: "blog",
        component: Blog,
      },
    ]
  },
  {
    path: "profile",
    component: Profile,
    title: "Jonathan Golimlim | Fullstack Developer"
  },
  {
    path: "**",
    redirectTo: "profile",
    pathMatch: "full"
  }
];
