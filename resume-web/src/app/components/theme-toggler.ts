import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-theme-toggler',
  imports: [LucideAngularModule],
  template: `
    <button aria-label="Toggle theme" class="theme-toggle" (click)="toggle()">
      <lucide-angular strokeWidth="1" name="lightbulb" size="18" class="bulb" [attr.data-theme]="isDark ? 'dark' : 'light'"></lucide-angular>
      <span class="sr-only">Toggle theme</span>
    </button>
  `,
  styles: `
    :host { display: inline-block; }
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
      transition: color .25s ease, transform .18s ease;
      color: var(--type-color);
      display: block;
    }

    /* Light mode: bulb shows a darkish yellow */
    html[data-theme="light"] .theme-toggle .bulb {
      color: #b58900;
      transform: scale(1.05);
    }

    /* Dark mode: bulb is neutral (matches foreground) */
    html.dark .theme-toggle .bulb {
      color: var(--type-color);
      transform: scale(1);
    }

    .theme-toggle:focus { outline: 2px solid rgba(59,130,246,0.25); outline-offset: 2px; }
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  `,
})
export class ThemeToggler {
  isDark = false;

  constructor() {
    let savedTheme: string | null = null;
    try {
      savedTheme = localStorage.getItem('theme');
    } catch (error) {
      console.warn('Unable to read the saved theme preference.', error);
    }

    this.isDark = savedTheme === 'dark'
      || (savedTheme !== 'light' && window.matchMedia?.('(prefers-color-scheme: dark)').matches === true);
    this.applyThemeToDocument();

    if (!savedTheme && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (event: MediaQueryListEvent) => {
        this.isDark = event.matches;
        this.applyThemeToDocument();
      };
      if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', handler);
      } else {
        mediaQuery.addListener(handler);
      }
    }
  }

  toggle() {
    this.isDark = !this.isDark;
    this.applyThemeToDocument();
    try {
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    } catch (error) {
      console.warn('Unable to save the theme preference.', error);
    }

    const html = document.documentElement;
    if (typeof html.animate === 'function') {
      html.animate(
        [
          { filter: 'brightness(1)' },
          { filter: 'brightness(1.08)' },
          { filter: 'brightness(1)' }
        ],
        { duration: 420, easing: 'ease-out' }
      );
    }
  }

  private applyThemeToDocument(): void {
    const html = document.documentElement;
    html.classList.toggle('dark', this.isDark);
    html.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
  }
}
