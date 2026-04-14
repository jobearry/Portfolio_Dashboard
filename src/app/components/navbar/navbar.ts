import { Component, input } from '@angular/core';
import { HlmSidebarTrigger } from '../../../../libs/ui/sidebar/src/lib/hlm-sidebar-trigger';

@Component({
  selector: 'app-navbar',
  imports: [HlmSidebarTrigger],
  templateUrl: './navbar.html',
  styles: [],
})
export class Navbar {
  title = input<string>("Dashboard")
}
