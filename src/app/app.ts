import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { SIDEBAR_ICONS } from './core/constants/sidebar-sections';
import { PORTFOLIO_ICONS } from './pages/dashboard/features/portfolio/core/portfolio.constant';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  providers: provideIcons({...SIDEBAR_ICONS, ...PORTFOLIO_ICONS}),
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
