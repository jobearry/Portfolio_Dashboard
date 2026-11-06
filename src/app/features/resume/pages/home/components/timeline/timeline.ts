import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import {
  ExperienceSignalService,
  getContent,
  Skeleton,
  StateMessage,
} from '../../../../../../shared';
import { ExperienceTimeline } from '../../../../../dashboard/core';

@Component({
  selector: 'app-timeline',
  imports: [Skeleton, StateMessage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="m-2">
      @if (state().loading) {
        <app-skeleton variant="list" [rows]="3" />
      } @else if (state().error) {
        <app-state-message kind="error" [message]="state().error ?? ''" (retry)="load()" />
      } @else if (state().content.length === 0) {
        <app-state-message kind="empty" message="No experience has been published yet." />
      } @else {
        <ol
          class="relative h-60 overflow-y-scroll scroll-smooth [scrollbar-width:thin] [scrollbar-color:#888_transparent]"
        >
          @for (experience of orderedExperiences(); track experience.id) {
            <li class="group relative mb-8 ml-15 pl-5">
              @if (year(experience.startedAt); as startYear) {
                <h3
                  class="absolute top-0 -left-12 rounded-full border border-accent-brand/30 bg-accent-brand/10 px-2 py-1 text-xs font-medium text-accent-brand tabular-nums transition-colors"
                >
                  {{ startYear }}
                </h3>
              }
              <div class="mr-5 cursor-pointer rounded text-start">
                <p class="text-sm font-bold">{{ experience.company }}</p>
                <p class="text-xs text-muted-foreground">
                  {{ experience.role }} | {{ experience.type }}
                </p>
              </div>
            </li>
          }
        </ol>
      }
    </div>
  `,
})
export class Timeline implements OnInit {
  private readonly experienceService = inject(ExperienceSignalService);
  protected readonly state = computed(() => this.experienceService.getState());
  protected readonly orderedExperiences = computed(() =>
    [...this.state().content]
      .sort((left, right) => {
        const leftTime = Date.parse(left.startedAt);
        const rightTime = Date.parse(right.startedAt);

        if (Number.isNaN(leftTime) && Number.isNaN(rightTime)) {
          return 0;
        }

        if (Number.isNaN(leftTime)) {
          return 1;
        }

        if (Number.isNaN(rightTime)) {
          return -1;
        }

        return rightTime - leftTime;
      })
      .slice(0, 3),
  );

  ngOnInit(): void {
    void this.load();
  }

  protected load(): Promise<void> {
    return getContent<ExperienceTimeline>(
      'v1/experience?includeProjects=false',
      this.experienceService,
    );
  }

  protected year(value: string): string | null {
    if (!value) {
      return null;
    }

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : String(date.getFullYear());
  }
}
