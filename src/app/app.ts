import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { sidebarIcons } from './core/constants/sidebar-sections';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  providers: provideIcons(sidebarIcons),
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
