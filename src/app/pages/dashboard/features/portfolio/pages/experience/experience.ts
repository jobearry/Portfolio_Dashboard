import { Component, inject, OnInit, signal } from '@angular/core';
import { ExperienceSignalService, ProjectSignalService } from '../../store/portfolio.service';
import { SkeletonItem } from "../../../../../../components/skeletons/item/skeleton-item";
import { NgIcon } from "@ng-icons/core";
import { JGExperience } from '../../core/models/experience';
import { getContent } from '../../core/portfolio.util';
import { JGProject } from '../../core/models/project';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { ProjectDialog } from '../../components/dialog/project-dialog';
import { TRANSITION_MOVE_UP } from '../../core/styles/portfolio.styles';
import { HlmH3 } from '@spartan-ng/helm/typography';

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
    getContent<JGExperience>('portfolio/experiences', this._expService)

  }

  async openDialog(experience: JGExperience){
    await getContent<JGProject>(`portfolio/Experiences/${experience.experienceId}/projects`, this._projectService)
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
