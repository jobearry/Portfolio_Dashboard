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
          <li class="group relative mb-8 ml-15 border-l border-accent-brand pl-5">
            <h3
              class="absolute top-0 -left-12 rounded-sm border border-accent-brand p-1 text-sm text-accent-brand transition-all duration-300"
            >
              {{ experience.startedAt.slice(0, 4) }}
            </h3>
            <div class="mr-5 cursor-pointer rounded text-start">
              <p class="text-sm font-bold">{{ experience.company }}</p>
              <p class="text-xs text-muted-foreground">{{ experience.role }} | {{experience.type}}</p>
            </div>
          </li>
        }
      </ol>
    }
  `,
})
export class Timeline implements OnInit {
  private readonly experienceService = inject(ExperienceSignalService);
  protected readonly state = computed(() => this.experienceService.getState());
  protected readonly orderedExperiences = computed(() =>
    [...this.state().content]
      .sort((left, right) => Date.parse(right.startedAt) - Date.parse(left.startedAt))
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
}
