import { DOCUMENT } from '@angular/common';
import { computed, DestroyRef, effect, inject, Injectable, signal } from '@angular/core';

const COLLAPSE_KEY = 'portfolio-sidebar-collapsed';
const DESKTOP_QUERY = '(min-width: 48rem)';

@Injectable({ providedIn: 'root' })
export class ShellStateService {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly desktopQuery =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(DESKTOP_QUERY)
      : null;

  private readonly _collapsed = signal(readCollapsed());
  private readonly _mobileOpen = signal(false);
  private readonly _isDesktop = signal(this.desktopQuery?.matches ?? true);

  private triggerEl: HTMLElement | null = null;

  readonly collapsed = this._collapsed.asReadonly();
  readonly mobileOpen = this._mobileOpen.asReadonly();
  readonly isDesktop = this._isDesktop.asReadonly();

  /** Labels show on mobile always, and on desktop unless the rail is active. */
  readonly showLabels = computed(() => (this._isDesktop() ? !this._collapsed() : true));

  /** The panel is visible on desktop always; on mobile only while open. */
  readonly sidebarVisible = computed(() => this._isDesktop() || this._mobileOpen());

  constructor() {
    if (this.desktopQuery) {
      const onChange = (event: MediaQueryListEvent) => {
        this._isDesktop.set(event.matches);
        if (event.matches) {
          this._mobileOpen.set(false);
        }
      };

      this.desktopQuery.addEventListener('change', onChange);
      this.destroyRef.onDestroy(() => this.desktopQuery?.removeEventListener('change', onChange));
    }

    effect((onCleanup) => {
      if (!this._mobileOpen()) {
        return;
      }

      const body = this.document.body;
      const previousOverflow = body.style.overflow;
      body.style.overflow = 'hidden';
      onCleanup(() => {
        body.style.overflow = previousOverflow;
      });
    });
  }

  setMobileTrigger(element: HTMLElement): void {
    this.triggerEl = element;
  }

  toggleCollapsed(): void {
    const next = !this._collapsed();
    this._collapsed.set(next);

    try {
      localStorage.setItem(COLLAPSE_KEY, String(next));
    } catch {
      // Storage can be unavailable (private mode); the state still applies.
    }
  }

  openMobile(): void {
    this._mobileOpen.set(true);
  }

  closeMobile(restoreFocus = false): void {
    if (!this._mobileOpen()) {
      return;
    }

    this._mobileOpen.set(false);
    if (restoreFocus) {
      this.triggerEl?.focus();
    }
  }
}

function readCollapsed(): boolean {
  try {
    return localStorage.getItem(COLLAPSE_KEY) === 'true';
  } catch {
    return false;
  }
}
