import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Sidebar } from "./components/sidebar/sidebar";
import { HlmSidebarTrigger } from "@spartan-ng/helm/sidebar";
import { Navbar } from "./components/navbar/navbar";
import { provideIcons } from '@ng-icons/core';
import { lucideHouse, lucideRss } from '@ng-icons/lucide';
import { sidebarContent, sidebarIcons } from './core/constants/sidebar-sections';
import { Profile } from "./pages/profile/profile";

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  providers: provideIcons(sidebarIcons),
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
