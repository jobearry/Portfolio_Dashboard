import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLayoutDashboard } from '@ng-icons/lucide';

/**
 * In-app escape hatch from the public résumé pages back to the dashboard.
 *
 * The public routes (`/` and `/projects`) render outside the dashboard shell,
 * so without this the only way back is editing the URL.
 */
@Component({
  selector: 'app-dashboard-link',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ lucideLayoutDashboard })],
  template: `
    <a routerLink="/dashboard" aria-label="View dashboard" class="dashboard-link">
      <ng-icon name="lucideLayoutDashboard" size="18" />
    </a>
  `,
  styles: `
    :host {
      display: inline-block;
    }

    .dashboard-link {
      width: 36px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      border-radius: 8px;
      border: 1px solid transparent;
      color: var(--muted-foreground);
      transition:
        background-color 0.2s ease,
        color 0.2s ease;
    }

    .dashboard-link:hover {
      background: var(--accent);
      color: var(--accent-foreground);
    }

    .dashboard-link:focus-visible {
      outline: 2px solid var(--ring);
      outline-offset: 2px;
    }
  `,
})
export class DashboardLink {}
