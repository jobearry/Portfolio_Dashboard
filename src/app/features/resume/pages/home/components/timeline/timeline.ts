import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TimelineEvent } from './timeline.constants';

@Component({
  selector: 'app-timeline',
  imports: [CommonModule],
  template: `
    <ol
      class="relative overflow-y-scroll scroll-smooth
        [scrollbar-width:thin] [scrollbar-color:#888_transparent] h-60">
      @for (content of data; track $index) {
        <li class="mb-8 ml-15 relative group border-l-1 border-orange-700 pl-5">
          <h3 class="absolute -left-12 top-0 text-orange-700 border border-orange-700 text-sm p-1 rounded-sm
            transition-all duration-300">{{content.date}}
          </h3>

          <div class="rounded mr-5 text-start cursor-pointer">
            <time class="font-bold text-sm">{{content.title}}</time>
            <p class="text-xs" style="color:var(--muted-foreground)">
              {{content.description}}
            </p>
          </div>
        </li>
      }
    </ol>
  `,
  styles: ``,
})
export class Timeline {
  @Input() data: TimelineEvent[] = [];
}
