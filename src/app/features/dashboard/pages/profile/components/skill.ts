import { Component, inject, OnInit } from '@angular/core';
import { HlmH3 } from '@spartan-ng/helm/typography';
import { SkeletonItem } from '../../../../../components';
import { getContent, SkillsSignalService } from '../../../../../shared';
import { TRANSITION_MOVE_UP } from '../../../../../core';
import { TechStackItem } from '../../../core';

@Component({
  selector: 'app-skill',
  imports: [SkeletonItem, HlmH3],
  template: `
    @if (_skillsService.getState().loading) {
      <app-skeleton-item></app-skeleton-item>
    } @else {
      <div class="flex flex-col gap-2 w-full">
        <span class="text-xs text-gray-300/70 tracking-widest flex items-center gap-2">
          <div class="h-3 w-3 rounded-full bg-[#912F56]"></div>
          {{"skill".toUpperCase()}}
        </span>
        <ul class="grid sm:grid-cols-3 gap-2">
          @for (item of _skillsService.getState().content; track item.id) {
            <li class="flex flex-col gap-2 w-full p-1 border bg-zinc-900/50">
              <span class="text-sm font-semibold flex flex-col">
                {{item.stackName}}
                <span class="text-xs text-gray-300/70 tracking-widest">{{item.category}}</span>
              </span>
            </li>
          }
        </ul>
      </div>
    }
  `,
  styles: ``,
})
export class SkillComponent implements OnInit {
  protected readonly _skillsService = inject(SkillsSignalService);
  transitionMoveUp = TRANSITION_MOVE_UP;

  ngOnInit(){
    getContent<TechStackItem>('v1/skill', this._skillsService)

  }
}
