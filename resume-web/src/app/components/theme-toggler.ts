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
    // initialize based on: localStorage -> system preference -> light
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark') this.isDark = true;
      else if (saved === 'light') this.isDark = false;
      else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.isDark = true;
      } else {
        this.isDark = false;
      }

      // apply initial theme attribute and class on `html` (primary source-of-truth)
      const html = document.documentElement;
      if (html) {
        if (this.isDark) {
          html.classList.add('dark');
          html.setAttribute('data-theme', 'dark');
        } else {
          html.classList.remove('dark');
          html.setAttribute('data-theme', 'light');
        }
      }
    } catch (e) {
      // ignore
    }

    // listen for system preference changes (only if user hasn't chosen explicitly)
    try {
      const saved = localStorage.getItem('theme');
      if (!saved && window.matchMedia) {
        const m = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (ev: MediaQueryListEvent) => {
          const html = document.documentElement;
          if (html) {
            if (ev.matches) {
              html.classList.add('dark');
              html.setAttribute('data-theme', 'dark');
            } else {
              html.classList.remove('dark');
              html.setAttribute('data-theme', 'light');
            }
          }
        };
        // modern API
        if (typeof m.addEventListener === 'function') m.addEventListener('change', handler as any);
        else if (typeof (m as any).addListener === 'function') (m as any).addListener(handler as any);
      }
    } catch {}
  }

  toggle() {
    const html = document.documentElement;
    if (!html) return;

    this.isDark = !this.isDark;

    if (this.isDark) {
      html.classList.add('dark');
      html.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('theme', 'dark'); } catch {}
    } else {
      html.classList.remove('dark');
      html.setAttribute('data-theme', 'light');
      try { localStorage.setItem('theme', 'light'); } catch {}
    }

    // brief pulse animation to emphasize change
    try {
      html.animate(
        [
          { filter: 'brightness(1)' },
          { filter: 'brightness(1.08)' },
          { filter: 'brightness(1)' }
        ],
        { duration: 420, easing: 'ease-out' }
      );
    } catch {}
  }
}
