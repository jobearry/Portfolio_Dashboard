import { Component } from '@angular/core';
import { Card } from '../../../../components/card/card';

@Component({
  selector: 'app-profile',
  imports: [Card],
  template: `
    <section class="p-2 flex flex-col md:flex-row gap-3">
      <app-card></app-card>
    </section>
  `,
  styles: ``,
})
export class Profile {}
