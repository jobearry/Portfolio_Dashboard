import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { ThemeToggler } from './theme-toggler';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer class="h-16 grid place-items-center text-sm">
      <div class="flex items-center gap-4">
        <span>
          Jonathan Golimlim | {{ year }}
          @if(env){
            | <span class="text-red-600 font-bold">{{ env }}</span>
          }
        </span>
      </div>
    </footer>
  `,
  styles: ``,
})
export class Footer {
  env: string = environment.title;
  year: number = new Date().getFullYear();
}
