import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SkeletonItem } from '../../../../components';
import { ExperienceSignalService, getContent, StateMessage } from '../../../../shared';
import { ExperienceTimeline } from '../../core';

@Component({
  selector: 'app-timeline',
  imports: [SkeletonItem, DatePipe, StateMessage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="flex h-full w-full flex-col gap-2">
      @if (state().loading) {
        <app-skeleton-item />
      } @else if (state().error) {
        <app-state-message kind="error" [message]="state().error ?? ''" (retry)="load()" />
      } @else if (state().content.length === 0) {
        <app-state-message kind="empty" message="No experience has been published yet." />
      } @else {
        <div class="flex w-full flex-col items-start justify-between border-b p-3">
          <span class="text-sm tracking-widest text-gray-300/70">{{ 'Career'.toUpperCase() }}</span>
        </div>

        <ul class="flex w-full flex-col gap-4 p-3">
          @for (experience of state().content; track experience.id) {
            <li class="flex flex-col gap-2 rounded-md border bg-zinc-900/50 p-3 lg:grid-cols-3">
              <span class="flex gap-2 text-lg font-semibold">
                {{ experience.company.name }}
                <span class="rounded-full border p-1 px-3 text-xs">
                  {{ experience.duration.startedAt | date: 'yyyy' }}
                </span>
              </span>
              <span class="text-sm tracking-widest text-gray-300/70">
                {{ experience.role.value }} | {{ experience.description }}
              </span>
              <span class="text-sm text-gray-300">{{ experience.responsibility }}</span>

              @if (experience.projects && experience.projects.length > 0) {
                <div class="flex w-full flex-col gap-2 p-3">
                  <span class="flex items-center gap-2 text-xs tracking-widest text-gray-300/70">
                    <div class="h-3 w-3 rounded-full bg-[#912F56]"></div>
                    {{ 'projects'.toUpperCase() }}
                  </span>

                  <ul class="flex flex-col gap-2">
                    @for (project of experience.projects; track project.projectId) {
                      <li class="flex w-full flex-col gap-2 rounded-md border bg-zinc-900/50 p-3">
                        <span class="text-sm font-semibold">{{ project.projectName }}</span>
                        <span class="text-sm tracking-widest text-gray-300/70">
                          {{ project.description }}
                        </span>

                        <ul class="flex flex-wrap gap-2">
                          @for (spec of project.techStackSpecs; track spec.specId) {
                            <li
                              class="rounded-md bg-zinc-800 px-2 py-1 text-xs tracking-widest text-gray-300/70"
                            >
                              {{ spec.toolName }}
                            </li>
                          }
                        </ul>
                      </li>
                    }
                  </ul>
                </div>
              }
            </li>
          }
        </ul>
      }
    </section>
  `,
})
export class Timeline implements OnInit {
  private readonly _experienceService = inject(ExperienceSignalService);
  protected readonly state = computed(() => this._experienceService.getState());

  ngOnInit() {
    void this.load();
  }

  protected load() {
    return getContent<ExperienceTimeline>(
      'v1/experience?includeProjects=true',
      this._experienceService,
    );
  }
}
