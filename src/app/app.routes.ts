import { Routes } from '@angular/router';
import { Portfolio } from './pages/dashboard/features/portfolio/ui/portfolio';
import { Profile } from './pages/profile/profile';
import { ExperienceComponent } from './pages/dashboard/features/portfolio/pages/experience/experience';
import { SkillComponent } from './pages/dashboard/features/portfolio/pages/skill/skill';
import { ProjectComponent } from './pages/dashboard/features/portfolio/pages/project/project';
import { Blog } from './pages/blog/blog';
import { Dashboard } from './pages/dashboard/features/templates/dashboard';
import { DashboardHome } from './pages/dashboard/features/templates/dashboard-home';

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
        title: 'Blog | Journal',
      },
      {
        path: "**",
        redirectTo: "dashboard",
        pathMatch: "full",
      }
    ]
  },
];
