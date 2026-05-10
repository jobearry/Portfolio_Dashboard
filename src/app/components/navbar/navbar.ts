import { Component, input } from '@angular/core';
import { HlmSidebarTrigger } from '../../../../libs/ui/sidebar/src/lib/hlm-sidebar-trigger';

@Component({
  selector: 'app-navbar',
  imports: [HlmSidebarTrigger],
  template: `
    <nav class="w-full flex justify-between items-center">
      <button hlmSidebarTrigger><span class="sr-only"></span></button>
      <h1>{{ title() }}</h1>
      <img class="h-10 w-10 p-1 rounded-full" src="grad_1.jpeg" alt="person-holding-diploma" />
    </nav>
  `,
  styles: [],
})
export class Navbar {
  title = input<string>('');
}
