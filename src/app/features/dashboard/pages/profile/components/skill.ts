import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { SkeletonItem } from '../../../../../components';
import { getContent, SkillsSignalService, StateMessage } from '../../../../../shared';
import { TechStackItem } from '../../../core';

@Component({
  selector: 'app-skill',
  imports: [SkeletonItem, StateMessage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (state().loading) {
      <app-skeleton-item />
    } @else if (state().error) {
      <app-state-message kind="error" [message]="state().error ?? ''" (retry)="load()" />
    } @else if (state().content.length === 0) {
      <app-state-message kind="empty" message="No skills have been published yet." />
    } @else {
      <div class="flex w-full flex-col gap-2">
        <span class="flex items-center gap-2 text-xs tracking-widest text-gray-300/70">
          <div class="h-3 w-3 rounded-full bg-[#912F56]"></div>
          {{ 'skill'.toUpperCase() }}
        </span>

        <ul class="grid gap-2 sm:grid-cols-3">
          @for (item of state().content; track item.id) {
            <li class="flex w-full flex-col gap-2 border bg-zinc-900/50 p-1">
              <span class="flex flex-col text-sm font-semibold">
                {{ item.stackName }}
                <span class="text-xs tracking-widest text-gray-300/70">{{ item.category }}</span>
              </span>
            </li>
          }
        </ul>
      </div>
    }
  `,
})
export class SkillComponent implements OnInit {
  private readonly _skillsService = inject(SkillsSignalService);
  protected readonly state = computed(() => this._skillsService.getState());

  ngOnInit() {
    void this.load();
  }

  protected load() {
    return getContent<TechStackItem>('v1/skill', this._skillsService);
  }
}
