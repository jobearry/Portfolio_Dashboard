import { Component, Input } from '@angular/core';
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'app-card',
  imports: [LucideAngularModule],
  template: `
   <article class="h-full border border-gray-500 rounded-sm p-2">
      <h3 class="font-bold text-sm inline-flex items-center gap-1">
        {{title}} 
        <span class="inline-flex items-center">
          <lucide-icon name="external-link" class="w-3 h-3"></lucide-icon>
        </span>
      </h3>
      <p class="text-gray-400 text-xs">{{subtitle}}</p>
      <p class="my-1 text-sm">{{description}}</p>
    </article>
  `,
  styles: ``,
})
export class Card {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() description: string = '';
}
