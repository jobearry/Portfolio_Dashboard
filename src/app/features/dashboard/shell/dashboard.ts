import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { ShellHeader } from './header/header';
import { ShellSidebar } from './sidebar/sidebar';
import { ShellStateService } from './shell-state.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, ShellHeader, ShellSidebar],
  templateUrl: './dashboard.html',
  host: {
    '(document:keydown.escape)': 'onEscape()',
  },
})
export class Dashboard {
  protected readonly state = inject(ShellStateService);

  private readonly router = inject(Router);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.state.closeMobile(true));
  }

  protected onEscape(): void {
    this.state.closeMobile(true);
  }
}
