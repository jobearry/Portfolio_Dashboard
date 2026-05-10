import { Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-square-button',
  imports: [NgIcon, HlmIcon],
  template: `
    <div>
      <button
        class="cursor-pointer hover:ring-1 hover:ring-zinc-500/50 focus:ring-1 border border-muted flex flex-col px-3.5 py-1 rounded-md items-center justify-center
        gap-0.5 bg-muted/50">
        <ng-icon hlm name="lucideToolCase" size="30"></ng-icon>
        <span class="text-xs">Skills</span>
      </button>
    </div>
  `,
  styles: ``,
})
export class SquareButtonComponent {}
