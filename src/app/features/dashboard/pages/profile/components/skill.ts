import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { getContent, Skeleton, SkillsSignalService, StateMessage } from '../../../../../shared';
import { TechStackItem } from '../../../core';

@Component({
  selector: 'app-skill',
  imports: [Skeleton, StateMessage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (state().loading) {
      <app-skeleton variant="grid" [rows]="6" />
    } @else if (state().error) {
      <app-state-message kind="error" [message]="state().error ?? ''" (retry)="load()" />
    } @else if (state().content.length === 0) {
      <app-state-message kind="empty" message="No skills have been published yet." />
    } @else {
      <div class="flex w-full flex-col gap-3">
        <h3
          class="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
        >
          <span class="h-2 w-2 rounded-full bg-accent-brand" aria-hidden="true"></span>
          Skill
        </h3>

        <ul class="grid grid-cols-1 gap-2 min-[380px]:grid-cols-2 lg:grid-cols-3">
          @for (item of state().content; track item.id) {
            <li
              class="flex w-full flex-col gap-1 rounded-md border border-border bg-muted/50 p-3 wrap-break-word transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:shadow-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span class="text-sm font-semibold">{{ item.stackName }}</span>
              <span class="text-xs tracking-wide text-muted-foreground">{{ item.category }}</span>
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
