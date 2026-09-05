import { Component, inject, OnInit } from "@angular/core";
import { ExperienceSignalService } from "../../store/portfolio.service";
import { SkeletonItem } from "../../../../components/skeletons/item/skeleton-item";
import { getContent } from "../../core/portfolio.util";
import { ExperienceTimeline } from "../../models/experience";
import { DatePipe } from "@angular/common";
import { HlmH1 } from "../../../../../../libs/ui/typography/src/lib/hlm-h1";

@Component({
  selector: 'app-timeline',
  imports: [SkeletonItem, DatePipe],
  template:`
    <section class="w-full h-full flex flex-col gap-2">
      @if(_experienceService.getState().loading){
        <app-skeleton-item></app-skeleton-item>
      }@else {
        <div class="flex flex-col justify-between items-start w-full p-3 border-b">
          <span class="text-sm text-gray-300/70 tracking-widest">{{"Career".toUpperCase()}}</span>
        </div>
        <ul class="flex flex-col gap-4 w-full p-3">
          @for(experience of _experienceService.getState().content; track experience.id){
            <li class="flex flex-col lg:grid-cols-3 p-3 gap-2 border rounded-md bg-zinc-900/50">
              <span class="text-lg font-semibold flex gap-2">
                {{experience.company.name}}
                <span class="border p-1 px-3 text-xs rounded-full">{{experience.duration.startedAt | date:'yyyy'}}</span>
              </span>
              <span class="text-sm text-gray-300/70 tracking-widest">{{experience.role.value}} | {{experience.description}}</span>
              <span class="text-sm text-gray-300">{{experience.responsibility}}</span>
              <span class="text-sm text-gray-300/70 tracking-widest"></span>
              @if (experience.projects && experience.projects.length > 0) {
                <div class="flex flex-col gap-2 w-full p-3 ">
                  <span class="text-xs text-gray-300/70 tracking-widest flex items-center gap-2">
                    <div class="h-3 w-3 rounded-full bg-[#912F56]"></div>
                    {{"projects".toUpperCase()}}
                  </span>
                  <ul class="flex flex-col gap-2">
                    @for (project of experience.projects; track project.projectId) {
                      <li class="flex flex-col gap-2 w-full p-3 border rounded-md bg-zinc-900/50">
                        <span class="text-sm font-semibold">{{project.projectName}}</span>
                        <span class="text-sm text-gray-300/70 tracking-widest">{{project.description}}</span>
                        <ul class="flex flex-wrap gap-2">
                          @for (spec of project.techStackSpecs; track spec.specId) {
                            <li class="text-xs bg-zinc-800 text-gray-300/70 tracking-widest px-2 py-1 rounded-md">
                              {{spec.toolName}}
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
  styles: ``,
})
export class Timeline implements OnInit {
  protected readonly _experienceService = inject(ExperienceSignalService);

  ngOnInit(){
    getContent<ExperienceTimeline>('v1/experience?includeProjects=true', this._experienceService)
  }
}
