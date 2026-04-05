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


}
