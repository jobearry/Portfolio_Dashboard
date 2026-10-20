import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../../components/navbar/navbar';
import { Sidebar } from '../../../components/sidebar/sidebar';
import { sidebarContent, SidebarGroupMenu } from '../../../core/constants/sidebar-sections';

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, Sidebar, RouterModule],
  templateUrl: './dashboard.html',
  styles: ``,
})
export class Dashboard {
  protected readonly title = signal('Jonathan Golimlim');
  protected readonly subtitle = signal('Software Engineer');
  protected readonly sidebarSections = signal(sidebarContent);
  protected readonly pagename = signal('');

  onItemClickHandler(item: SidebarGroupMenu) {
    this.pagename.set(item.title);
  }
}
