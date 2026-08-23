import { Component, input } from '@angular/core';
import { HlmSidebarTrigger } from '../../../../libs/ui/sidebar/src/lib/hlm-sidebar-trigger';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [HlmSidebarTrigger, RouterModule],
  template: `
    <nav class="w-full flex justify-start items-center gap-5">
      <button hlmSidebarTrigger><span class="sr-only"></span></button>
      <p class="text-2xl tracking-wide">{{ title() }}</p>
    </nav>
  `,
  styles: [],
})
export class Navbar {
  title = input<string>('');
}
