import { Component, Input } from '@angular/core';
import { Project } from '../types/project.type';
import { Router } from '@angular/router';
import { Card } from "../../../components/card";
import { TRANSITION_MOVE_UP } from '../../../shared/constants/styles.constants';

@Component({
  selector: 'app-highlights',
  imports: [Card],
  template: `
    <section class="m-6 text-start flex flex-col gap-2 ">
      <ul [class]="'grid gap-2 ' + gridStyle">
        @for (item of data; track $index) {
          <li [class]="'cursor-pointer ' + transition_up">
            <app-card [title]="item.title" [description]="item.contribution"
              [hasIcon]="false" [subtitle]="item.tags.join(', ')">
            </app-card>
          </li>
        }
        @if(getCurrentRoute() !== '/projects') {
          <div class="flex justify-end">
            <button class="w-fit cursor-pointer items-center justify-center rounded-sm underline
                    px-3 py-1 text-xs text-slate-200 transition-all duration-300
                    hover:transform-[translateY(-.2rem)]" (click)="gotoProjects()">
              View more
            </button>
          </div>
        }
      </ul>
    </section>
  `,
  styles: [],
})
export class Highlights {
  @Input() data: Project[] = [];
  @Input() gridStyle: string = ""
  transition_up = TRANSITION_MOVE_UP
  constructor(private router: Router){}

  gotoProjects() {
    this.router.navigate(['/projects']);
  }
  getCurrentRoute() {
    return this.router.serializeUrl(this.router.createUrlTree(this.router.url.split('?')[0].split('#')[0].split('/')));
  }
}
