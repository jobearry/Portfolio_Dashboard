import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideConstruction } from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-maintenance',
  imports: [HlmIcon, NgIcon],
  template: `
    <div class="w-full grid place-items-center p-5 my-2">
      <ng-icon hlm name="lucideConstruction"></ng-icon>
      <h1>...{{subtitle}}...</h1>
    </div>
  `,
  providers: provideIcons({ lucideConstruction }),
  styles: ``,

})
export class Maintenance {
  @Input() subtitle: string = "working on it"
}
