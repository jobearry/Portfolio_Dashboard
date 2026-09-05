import { Component, inject, OnInit, signal } from '@angular/core';
import { ExperienceSignalService, ProjectSignalService } from '../../store/portfolio.service';
import { NgIcon } from "@ng-icons/core";
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { HlmH3 } from '@spartan-ng/helm/typography';
import { ProjectDialog } from '../../../../components/dialog/project-dialog';
import { SkeletonItem } from '../../../../components/skeletons/item/skeleton-item';
import { TRANSITION_MOVE_UP } from '../../../../core/styles/common.styles';
import { getContent } from '../../core/portfolio.util';
import { ExperienceTimeline } from '../../models/experience';
import { Project } from '../../models/project';

@Component({
  selector: 'app-experience',
  imports: [SkeletonItem, NgIcon, HlmH3],
  templateUrl: './experience.html',
  styles: ``,
})
export class ExperienceComponent implements OnInit {
  _expService = inject(ExperienceSignalService);
  _hlmDialogService = inject(HlmDialogService);
  _projectService = inject(ProjectSignalService);

  pageLoading = signal(false);

  transitionMoveUp = TRANSITION_MOVE_UP;
  ngOnInit(){
    getContent<ExperienceTimeline>('v1/experience?includeProjects=true', this._expService)

  }

  async openDialog(experience: ExperienceTimeline){
    await getContent<Project>(`v1/experience/${experience.id}/projects`, this._projectService)
    const dialogRef = this._hlmDialogService.open(ProjectDialog, {
      context: {
        experience: experience,
        projects: this._projectService.getState().content
      }
    });

    dialogRef.closed$.subscribe(() => {
      console.log('Dialog closed');
    });
  }
}
