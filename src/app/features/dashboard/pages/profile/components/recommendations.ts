import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { getContent, RecommendationService, StateMessage } from '../../../../../shared';
import { FeedbackItem } from '../../../core';
import { SkeletonItem } from '../../../../../components';

@Component({
  selector: 'app-recommendations',
  imports: [SkeletonItem, StateMessage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (state().loading) {
      <app-skeleton-item />
    } @else if (state().error) {
      <app-state-message kind="error" [message]="state().error ?? ''" (retry)="load()" />
    } @else if (state().content.length === 0) {
      <app-state-message kind="empty" message="No recommendations yet." />
    } @else {
      <div class="flex w-full flex-col gap-2">
        <span class="flex items-center gap-2 text-xs tracking-widest text-gray-300/70">
          <div class="h-3 w-3 rounded-full bg-[#912F56]"></div>
          {{ 'feedback'.toUpperCase() }}
        </span>

        <ul class="flex flex-col gap-2">
          @for (item of state().content; track item.id) {
            <li class="flex w-full flex-col gap-2 border bg-zinc-900/50 p-3">
              <span class="text-sm font-semibold">
                {{ item.personName }}
                <span class="text-xs tracking-widest text-gray-300/70">
                  {{ item.careerPosition.value }}
                </span>
              </span>
              <span class="text-sm tracking-widest text-gray-300/70">"{{ item.description }}"</span>
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
