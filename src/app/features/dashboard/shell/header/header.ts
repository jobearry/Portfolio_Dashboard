import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMenu } from '@ng-icons/lucide';
import { Component, ElementRef, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ShellStateService } from '../shell-state.service';

@Component({
  selector: 'app-shell-header',
  imports: [NgIcon],
  providers: [provideIcons({ lucideMenu })],
  host: {
    class: 'sticky top-0 z-30 block',
  },
  template: `
    <header
      class="flex h-14 items-center gap-3 border-b border-border bg-background/95 px-3 backdrop-blur md:px-4"
    >
      <button
        #mobileTrigger
        type="button"
        class="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring md:hidden"
        aria-label="Open navigation"
        aria-controls="shell-sidebar"
        [attr.aria-expanded]="state.mobileOpen()"
        (click)="state.openMobile()"
      >
        <ng-icon name="lucideMenu" size="20" />
      </button>

      <h1 class="truncate text-base font-semibold tracking-wide">{{ pageTitle() }}</h1>
    </header>
  `,
})
export class ShellHeader {
  protected readonly state = inject(ShellStateService);

  private readonly router = inject(Router);
  private readonly mobileTrigger =
    viewChild.required<ElementRef<HTMLButtonElement>>('mobileTrigger');

  protected readonly pageTitle = signal(resolvePageTitle(this.router));

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.pageTitle.set(resolvePageTitle(this.router)));

    afterNextRender(() => this.state.setMobileTrigger(this.mobileTrigger().nativeElement));
  }
}

function resolvePageTitle(router: Router): string {
  let route = router.routerState.snapshot.root;

  while (route.firstChild) {
    route = route.firstChild;
  }

  return (route.data['pageTitle'] as string | undefined) ?? 'Dashboard';
}
