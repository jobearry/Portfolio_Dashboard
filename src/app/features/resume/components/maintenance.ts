import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideConstruction } from '@ng-icons/lucide';

@Component({
  selector: 'app-maintenance',
  imports: [NgIcon],
  providers: [provideIcons({ lucideConstruction })],
  template: `
    <div class="w-full grid place-items-center p-5 my-2">
      <ng-icon name="lucideConstruction" size="50" />
      <h1>...{{subtitle}}...</h1>
    </div>
  `,
  styles: ``,
})
export class Maintenance {
  @Input() subtitle = "working on it"
}
