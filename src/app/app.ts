import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "./components/sidebar/sidebar";
import { HlmSidebarTrigger } from "@spartan-ng/helm/sidebar";
import { Navbar } from "./components/navbar/navbar";
import { provideIcons } from '@ng-icons/core';
import { lucideHouse, lucideRss } from '@ng-icons/lucide';
import { sidebarContent } from './core/constants/sidebar-sections';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Navbar],
  providers: provideIcons({lucideHouse, lucideRss}),
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Jonathan Golimlim');
  protected readonly subtitle = signal('Portfolio Dashboard');
  protected readonly sidebarSections = signal(sidebarContent)
}
