import { Component, input } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideExternalLink } from '@ng-icons/lucide';

@Component({
  selector: 'app-item',
  imports: [HlmItemImports, HlmButtonImports, HlmIcon, NgIcon],
  template: ` <a hlmItem variant="muted" [class]="''">
    <div hlmItemContent class="truncate">
      <div hlmItemTitle>{{ title() }}</div>
      <p hlmItemDescription>{{ description() }}</p>
    </div>
    <div hlmItemActions>
      <ng-icon hlm [name]="icon()" size="sm" />
    </div>
  </a>
  `,
  providers: [
    provideIcons({
      lucideExternalLink,
    }),
  ],
  styles: ``,
})
export class BlogItem {
  title = input<string>('');
  description = input<string>('');
  icon = input<string>('lucideExternalLink');
}
