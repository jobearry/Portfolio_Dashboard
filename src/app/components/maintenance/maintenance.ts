import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideConstruction } from '@ng-icons/lucide';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-maintenance',
  imports: [NgIcon],
  providers: [provideIcons({ lucideConstruction })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="grid w-full place-items-center gap-2 rounded-lg border border-border bg-muted/50 p-8 text-center"
    >
      <ng-icon name="lucideConstruction" size="32" class="text-muted-foreground" />
      <h2 class="text-lg font-semibold">Under construction</h2>
      <p class="text-sm text-muted-foreground">{{ subtitle() }}</p>
    </div>
  `,
})
export class Maintenance {
  readonly subtitle = input('working on it');
}
