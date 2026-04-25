import { Component, signal } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { Sidebar } from "../../components/sidebar/sidebar";
import { RouterModule } from "@angular/router";
import { sidebarContent } from '../../core/constants/sidebar-sections';

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, Sidebar, RouterModule],
  templateUrl: './dashboard.html',
  styles: ``,
})
export class Dashboard {
  protected readonly title = signal('Jonathan Golimlim');
  protected readonly subtitle = signal('@jobearry');
  protected readonly sidebarSections = signal(sidebarContent)
}
