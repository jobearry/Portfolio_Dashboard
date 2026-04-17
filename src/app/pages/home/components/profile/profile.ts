import { Component } from '@angular/core';
import { Card } from '../../../../components/card/card';

@Component({
  selector: 'app-profile',
  imports: [Card],
  template: `
    <section class="p-2 flex flex-col md:flex-row gap-3">
      <app-card
        [title]="title"
        [description]="description"
        [content]="content"
        [hasCta]="hasCta">
      </app-card>
    </section>
  `,
  styles: ``,
})
export class Profile
{
  title = "Jonathan Golimlim";
  description = "Metro Manila | PH";
  content = "Full-stack developer that focuses on developing web applications through Angular and .NET.";
  hasCta = false;
}
