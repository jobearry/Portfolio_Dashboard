import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer class="border-t-gray-500 border-t h-16 grid place-items-center text-sm">
      <span>
        Jonathan Golimlim | {{ year }}
        @if(env){
          | <span class="text-red-600 font-bold">{{ env }}</span>
        }
      </span>
    </footer>
  `,
  styles: ``,
})
export class Footer {
  env: string = environment.title;
  year: number = new Date().getFullYear();
}
