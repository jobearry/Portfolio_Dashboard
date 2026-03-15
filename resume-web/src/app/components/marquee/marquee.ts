import { Component, ContentChild, input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marquee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marquee.html',
  styles: [`
    .marquee__inner { display: flex; width: fit-content; box-sizing: border-box; animation: marquee 15s linear infinite; }
    .marquee__group { display: flex; flex: 0 0 50%; align-items: center; padding-left: 1rem; }
    .marquee__group > * { display: inline-flex; align-items: center; margin-right: 2rem; }

    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `],
})
export class Marquee {
  @ContentChild(TemplateRef) contentTpl?: TemplateRef<any>;
  title = input<string>("")
}
