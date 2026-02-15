import { Component, Input } from '@angular/core';
import { Project } from '../types/project.types';
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
      @if(hasBtn){
        <button class="self-end cursor-pointer items-center justify-center rounded-sm border-[1.58px] 
            border-zinc-600 px-3 py-1 text-xs text-slate-200 shadow-md transition-all duration-300 
            hover:transform-[translateY(-.2rem)]"
          (click)="gotoProjects()">
          View more
        </button>
      }
    </section>
  `,
  styles: ``,
})
export class Highlights {
  @Input() data: Project[] = [];
  @Input() hasBtn: boolean = false;
  
  constructor(private router: Router){}

  gotoProjects(){
    this.router.navigate(['/projects'])
  }
}
