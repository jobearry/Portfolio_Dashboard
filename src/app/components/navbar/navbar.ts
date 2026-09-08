import { Component, input } from '@angular/core';
import { HlmSidebarTrigger } from '../../../../libs/ui/sidebar/src/lib/hlm-sidebar-trigger';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [HlmSidebarTrigger, RouterModule],
  template: `
    <div class="w-full flex justify-start items-center gap-5">
      <button hlmSidebarTrigger><span class="sr-only"></span></button>
      <p class="text-2xl tracking-wide">{{ title() }}</p>
    </div>
  `,
  styles: [],
})
export class Navbar {
  title = input<string>('');
}
