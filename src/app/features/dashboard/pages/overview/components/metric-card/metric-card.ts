import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/**
 * Presentational metric card shared by the Overview API metrics and the
 * GitHub/Notion counts. It owns only its visual states; requests stay in
 * services and the parent page.
 */
@Component({
  selector: 'app-metric-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block h-full' },
  template: `
    <article
      class="flex h-full flex-col gap-3 rounded-lg border border-border bg-muted/30 p-3 transition-colors hover:border-accent-brand sm:p-5"
    >
      <h3
        class="text-[0.6rem] font-medium tracking-[0.2em] wrap-break-word text-muted-foreground uppercase sm:text-xs"
      >
        {{ label() }}
      </h3>

      @if (loading()) {
        <div role="status" aria-live="polite">
          <span class="sr-only">Loading…</span>
          <div
            class="h-8 w-16 animate-pulse rounded bg-foreground/10 sm:h-12"
            aria-hidden="true"
          ></div>
        </div>
      } @else if (error()) {
        <div class="flex flex-col gap-2" role="alert">
          <p class="text-xs text-muted-foreground">{{ error() }}</p>
          <button
            type="button"
            class="self-start rounded-md border border-border px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            (click)="retry.emit()"
          >
            Try again
          </button>
        </div>
      } @else {
        <p class="text-3xl font-semibold tracking-tight tabular-nums sm:text-5xl">
          {{ count() ?? '—' }}
        </p>
      }

      <p class="mt-auto text-xs text-muted-foreground sm:text-sm" data-subtitle>{{ subtitle() }}</p>
    </article>
  `,
})
export class MetricCard {
  readonly label = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly count = input<number | null>(null);
  readonly loading = input(false);
  readonly error = input<string | null>(null);
  readonly retry = output<void>();
}
