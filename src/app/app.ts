import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "./components/sidebar/sidebar";
import { HlmSidebarTrigger } from "@spartan-ng/helm/sidebar";
import { Navbar } from "./components/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Jonathan Golimlim');
  protected readonly subtitle = signal('Portfolio Dashboard');
  protected readonly sidebarSections = signal([{title: "Home"}])
}
