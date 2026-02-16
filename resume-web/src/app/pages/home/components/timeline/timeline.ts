import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TimelineEvent } from './timeline.constants';

@Component({
  selector: 'app-timeline',
  imports: [CommonModule],
  template: `
    <ol
      class="relative border-l-2 border-orange-700 ml-5">
      @for (content of data; track $index) {
        <li class="mb-8 ml-[1.95rem] relative group cursor-pointer">
          <span class="absolute -left-10 w-4 h-4 rounded-full border-2 
            transition-all duration-300 border-orange-700 bg-[#141414] group-hover:bg-orange-700">
          </span>

          <div class="rounded mr-5 text-start">
            <time class="font-bold text-sm">{{content.title}}</time>

            <h3 class="text-xs text-gray-500">{{content.date}}</h3>

            <p class="text-xs text-gray-500">
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
