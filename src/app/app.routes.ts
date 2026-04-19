import { Routes } from '@angular/router';
import { Home } from './pages/dashboard/features/home/home';
import { Blog } from './pages/dashboard/features/blog/ui/blog';
import { Dashboard } from './pages/dashboard/dashboard';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
  {
    path: "dashboard",
    component: Dashboard,
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
    component: Profile
  },
  {
    path: "**",
    redirectTo: "dashboard",
    pathMatch: "full"
  }
];
