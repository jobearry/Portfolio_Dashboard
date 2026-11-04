import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLightbulb } from '@ng-icons/lucide';
import { ThemeService } from '../../../core/theme/theme.service';

/**
 * Public-site theme toggle. Delegates to the shared `ThemeService` so the
 * landing pages and the dashboard share one stored preference and one
 * `.dark` class on <html>.
 */
@Component({
  selector: 'app-theme-toggler',
  imports: [NgIcon],
  providers: [provideIcons({ lucideLightbulb })],
  template: `
    <button type="button" aria-label="Toggle theme" class="theme-toggle" (click)="toggle()">
      <ng-icon name="lucideLightbulb" size="18" class="bulb" />
    </button>
  `,
  styles: `
    :host {
      display: inline-block;
    }

    .theme-toggle {
      width: 36px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      border-radius: 8px;
      background: transparent;
      border: 1px solid transparent;
      cursor: pointer;
    }

    .bulb {
      display: block;
      color: #b58900;
      transform: scale(1.05);
      transition:
        color 0.25s ease,
        transform 0.18s ease;
    }

    :host-context(.dark) .bulb {
      color: var(--foreground);
      transform: scale(1);
    }

    .theme-toggle:focus-visible {
      outline: 2px solid var(--ring);
      outline-offset: 2px;
    }
  `,
})
export class ThemeToggler {
  private readonly themeService = inject(ThemeService);

  toggle(): void {
    this.themeService.toggle();
  }
}
