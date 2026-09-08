import { Component, inject, OnInit } from '@angular/core';
import { getContent, RecommendationService } from '../../../../../shared';
import { FeedbackItem } from '../../../core';
import { SkeletonItem } from "../../../../../components";

@Component({
  selector: 'app-recommendations',
  imports: [SkeletonItem],
  template: `
    @if (_recommendationService.getState().loading) {
      <app-skeleton-item></app-skeleton-item>
    } @else {
      <div class="flex flex-col gap-2 w-full">
        <span class="text-xs text-gray-300/70 tracking-widest flex items-center gap-2">
          <div class="h-3 w-3 rounded-full bg-[#912F56]"></div>
          {{"feedback".toUpperCase()}}
        </span>
        <ul class="flex flex-col gap-2">
          @for (item of _recommendationService.getState().content; track item.id) {
            <li class="flex flex-col gap-2 w-full p-3 border bg-zinc-900/50">
              <span class="text-sm font-semibold">
                {{item.personName}}
                <span class="text-xs text-gray-300/70 tracking-widest">{{item.careerPosition.value}}</span>
              </span>
              <span class="text-sm text-gray-300/70 tracking-widest">"{{item.description}}"</span>
            </li>
          }
        </ul>
      </div>
    }
  `,
  styles: ``,
})
export class Recommendations implements OnInit {
  protected readonly _recommendationService = inject(RecommendationService);

  ngOnInit(){
    getContent<FeedbackItem>('v1/recommendation', this._recommendationService)
  }
}
