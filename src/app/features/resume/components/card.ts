import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideExternalLink } from '@ng-icons/lucide';

@Component({
  selector: 'app-card',
  imports: [NgIcon],
  providers: [provideIcons({ lucideExternalLink })],
  template: `
  <article class="h-full rounded-sm p-2" style="border:1px solid var(--border); background:var(--card); color:var(--card-foreground)">
      <h3 class="font-bold text-sm inline-flex items-center gap-1">
        {{title}}
        @if(hasIcon){
          <span class="inline-flex items-center">
            <ng-icon name="lucideExternalLink" size="12" />
          </span>
        }
      </h3>
      <p class="text-xs" style="color:var(--muted-foreground)">{{subtitle}}</p>
      <p class="my-1 text-sm">{{description}}</p>
    </article>
  `,
  styles: ``,
})
export class Card {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() description = '';
  @Input() hasIcon = true;
}
