import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { getContent, RecommendationService, Skeleton, StateMessage } from '../../../../../shared';
import { FeedbackItem } from '../../../core';

@Component({
  selector: 'app-recommendations',
  imports: [Skeleton, StateMessage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (state().loading) {
      <app-skeleton variant="list" [rows]="3" />
    } @else if (state().error) {
      <app-state-message kind="error" [message]="state().error ?? ''" (retry)="load()" />
    } @else if (state().content.length === 0) {
      <app-state-message kind="empty" message="No recommendations yet." />
    } @else {
      <div class="flex w-full flex-col gap-3">
        <h3
          class="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
        >
          <span class="h-2 w-2 rounded-full bg-accent-brand" aria-hidden="true"></span>
          Feedback
        </h3>

        <ul class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 ">
          @for (item of state().content; track item.id) {
            <li
              class="flex w-full flex-col gap-2 rounded-md border border-border bg-muted/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:shadow-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <p class="text-sm font-semibold">
                {{ item.personName }}
                <span class="text-xs tracking-wide text-muted-foreground">
                  {{ item.careerPosition }}
                </span>
              </p>
              <p class="text-sm leading-relaxed text-muted-foreground italic">
                "{{ item.description }}"
              </p>
            </li>
          }
        </ul>
      </div>
    }
  `,
})
export class Recommendations implements OnInit {
  private readonly _recommendationService = inject(RecommendationService);
  protected readonly state = computed(() => this._recommendationService.getState());

  ngOnInit() {
    void this.load();
  }

  protected load() {
    return getContent<FeedbackItem>('v1/recommendation', this._recommendationService);
  }
}
