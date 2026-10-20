import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export type StateMessageKind = 'error' | 'empty';

/**
 * Shared loading failure / empty result block for data screens.
 * Plain Tailwind.
 */
@Component({
  selector: 'app-state-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex w-full flex-col items-start gap-3 rounded-md border border-border bg-muted/50 p-6"
      [attr.role]="kind() === 'error' ? 'alert' : 'status'"
    >
      <p class="text-sm tracking-wide text-muted-foreground">{{ message() }}</p>

      @if (kind() === 'error') {
        <button
          type="button"
          class="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          (click)="retry.emit()"
        >
          Try again
        </button>
      }
    </div>
  `,
})
export class StateMessage {
  readonly kind = input<StateMessageKind>('empty');
  readonly message = input.required<string>();
  readonly retry = output<void>();
}
