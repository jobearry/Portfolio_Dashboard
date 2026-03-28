import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-toggler',
  imports: [],
  template: `
    <button aria-label="Toggle theme" class="theme-toggle" (click)="toggle()">
      <span class="toggle-track">
        <span class="toggle-thumb" [attr.data-theme]="isDark ? 'dark' : 'light'"></span>
      </span>
      <span class="sr-only">Toggle theme</span>
    </button>
  `,
  styles: `
    :host { display: inline-block; }
    .theme-toggle {
      --size: 40px;
      width: var(--size);
      height: calc(var(--size) / 2);
      padding: 4px;
      border-radius: 9999px;
      background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255,255,255,0.06);
      cursor: pointer;
      transition: background-color .4s ease, transform .25s ease;
    }

    /* Track */
    .toggle-track {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 9999px;
      background: linear-gradient(90deg, #f3f4f6, #e5e7eb);
      transition: background-color .4s ease;
      display: block;
    }

    /* Thumb */
    .toggle-thumb {
      --thumb-size: calc(var(--size) / 2 - 6px);
      position: absolute;
      top: 50%;
      left: 4px;
      width: var(--thumb-size);
      height: var(--thumb-size);
      background: #fff;
      border-radius: 50%;
      transform: translateY(-50%);
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      transition: left .35s cubic-bezier(.2,.9,.2,1), background-color .35s ease, transform .35s ease;
    }

    /* dark state — move thumb to right and change colours (html is the source-of-truth) */
    html.dark .theme-toggle { background: linear-gradient(90deg,#0f172a,#020617); border-color: rgba(255,255,255,0.06); }
    html.dark .toggle-track { background: linear-gradient(90deg,#0b1220,#08101a); }
    html.dark .toggle-thumb { left: calc(100% - var(--thumb-size) - 4px); background: #0b1220; }

    /* Smooth page color transition */
    html { transition: background-color .45s ease, color .45s ease; }

    /* small focus styles */
    .theme-toggle:focus { outline: 2px solid rgba(59,130,246,0.35); outline-offset: 2px; }

    /* Accessibility helper */
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
