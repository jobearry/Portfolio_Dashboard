import { Routes } from '@angular/router';
import { Home } from './pages/dashboard/features/home/ui/home';
import { Blog } from './pages/dashboard/features/blog/ui/blog';
import { Dashboard } from './pages/dashboard/dashboard';
import { Profile } from './pages/profile/profile';

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
        path: "blog",
        component: Blog,
      },
    ]
  },
  // {
  //   path: "profile",
  //   component: Profile,
  //   title: "Jonathan Golimlim | Fullstack Developer"
  // },
  {
    path: "**",
    redirectTo: "dashboard",
    pathMatch: "full"
  }
];
