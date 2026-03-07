import { Component, Input } from '@angular/core';
import { Project } from '../types/project.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-highlights',
  imports: [],
  template: `
    <section class="m-6 text-start flex flex-col gap-2 ">
      <ul class="grid md:grid-cols-2 gap-2">
        @for (item of data; track $index) {
          <li class="cursor-pointer transition-all duration-300 hover:transform-[translateY(-.2rem)] hover:shadow-xl">
            <article class="h-full border border-gray-500 rounded-sm p-2">
              <h3 class="font-bold text-sm">{{item.title}}</h3>
              <p class="text-gray-400 text-xs">{{item.duration}}</p>
              <p class="my-1 text-sm">{{item.contribution}}</p>
            </article>
          </li>
        }
      </ul>
    </section>
  `,
  styles: ``,
})
export class Highlights {
  @Input() data: Project[] = [];

  constructor(private router: Router){}


}
