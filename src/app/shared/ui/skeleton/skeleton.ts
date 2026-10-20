import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type SkeletonVariant = 'text' | 'card' | 'list' | 'grid' | 'entries';

const DEFAULT_ROWS: Record<SkeletonVariant, number> = {
  text: 3,
  card: 3,
  list: 3,
  grid: 6,
  entries: 4,
};

/**
 * Shared loading placeholder. Each variant mirrors the layout it replaces so
 * the swap to real content does not jump.
 */
@Component({
  selector: 'app-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div role="status" aria-live="polite">
      <span class="sr-only">Loading…</span>

      <div class="animate-pulse" aria-hidden="true">
        @switch (variant()) {
          @case ('card') {
            <div class="grid gap-4 sm:grid-cols-3">
              @for (row of rowIndexes(); track row) {
                <div class="flex flex-col gap-3 rounded-lg border border-border p-5">
                  <div class="h-3 w-1/3 rounded bg-foreground/10"></div>
                  <div class="h-12 w-16 rounded bg-foreground/10"></div>
                  <div class="h-4 w-2/3 rounded bg-foreground/10"></div>
                  <div class="h-px w-full bg-foreground/10"></div>
                  <div class="h-3 w-full rounded bg-foreground/10"></div>
                </div>
              }
            </div>
          }
          @case ('list') {
            <div class="flex flex-col gap-4">
              @for (row of rowIndexes(); track row) {
                <div class="flex flex-col gap-3 rounded-lg border border-border bg-muted/50 p-4">
                  <div class="h-5 w-1/3 rounded bg-foreground/10"></div>
                  <div class="h-4 w-1/2 rounded bg-foreground/10"></div>
                  <div class="h-4 w-5/6 rounded bg-foreground/10"></div>
                </div>
              }
            </div>
          }
          @case ('grid') {
            <div class="grid grid-cols-2 gap-2">
              @for (row of rowIndexes(); track row) {
                <div class="flex flex-col gap-2 rounded-md border border-border bg-muted/50 p-3">
                  <div class="h-4 w-2/3 rounded bg-foreground/10"></div>
                  <div class="h-3 w-1/2 rounded bg-foreground/10"></div>
                </div>
              }
            </div>
          }
          @case ('entries') {
            <div class="grid gap-3 lg:grid-cols-2">
              @for (row of rowIndexes(); track row) {
                <div
                  class="flex items-center gap-4 rounded-lg border border-border bg-muted/50 p-4"
                >
                  <div class="h-7 w-7 rounded bg-foreground/10"></div>
                  <div class="flex-1 space-y-2">
                    <div class="h-4 w-3/4 rounded bg-foreground/10"></div>
                    <div class="h-3 w-1/3 rounded bg-foreground/10"></div>
                  </div>
                  <div class="h-4 w-4 rounded bg-foreground/10"></div>
                </div>
              }
            </div>
          }
          @default {
            <div class="flex flex-col gap-3">
              @for (row of rowIndexes(); track row) {
                <div
                  class="h-4 rounded bg-foreground/10"
                  [class.w-3/4]="row % 3 === 1"
                  [class.w-full]="row % 3 !== 1"
                ></div>
              }
            </div>
          }
        }
      </div>
    </div>
  `,
})
export class Skeleton {
  readonly variant = input<SkeletonVariant>('text');
  readonly rows = input<number | undefined>(undefined);

  protected readonly rowIndexes = computed(() => {
    const count = this.rows() ?? DEFAULT_ROWS[this.variant()];
    return Array.from({ length: count }, (_, index) => index);
  });
}
