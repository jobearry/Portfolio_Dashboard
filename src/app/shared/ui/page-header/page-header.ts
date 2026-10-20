import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Shared screen header: eyebrow, title, and an optional description.
 * The shell owns the page `h1`, so the title is always an `h2`.
 */
@Component({
  selector: 'app-page-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="flex flex-col gap-1 border-b border-border pb-4">
      <span class="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
        {{ eyebrow() }}
      </span>
      <h2 class="text-2xl font-semibold tracking-tight sm:text-3xl">{{ title() }}</h2>
      @if (description()) {
        <p class="text-sm text-muted-foreground">{{ description() }}</p>
      }
    </header>
  `,
})
export class PageHeader {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input('');
}
