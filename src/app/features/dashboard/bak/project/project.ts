import { Component, inject, OnInit } from '@angular/core';
import { ProjectSignalService } from '../../store/portfolio.service';
import { HlmH3 } from '@spartan-ng/helm/typography';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { ProjectDialog } from '../../../../components/dialog/project-dialog';
import { SkeletonItem } from '../../../../components/skeletons/item/skeleton-item';
import { TRANSITION_MOVE_UP } from '../../../../core/styles/common.styles';
import { getContent } from '../../core/portfolio.util';
import { Project } from '../../models/project';

@Component({
  selector: 'app-project',
  imports: [SkeletonItem, HlmH3],
  templateUrl: './project.html',
  styles: ``,
})
export class ProjectComponent implements OnInit {
  protected readonly _projectService = inject(ProjectSignalService);
  transitionMoveUp = TRANSITION_MOVE_UP;

  _hlmDialogService = inject(HlmDialogService);
  ngOnInit(){
    getContent<Project>('v1/portfolio/projects', this._projectService)

  }

  async openDialog(project: Project){
    // await getContent<Project>(`v1/portfolio/Experiences/${experience.experienceId}/projects`, this._projectService)
    const dialogRef = this._hlmDialogService.open(ProjectDialog, {
      context: {
        experience: null,
        projects: this._projectService.getState().content
      }
    });

    dialogRef.closed$.subscribe(() => {
      console.log('Dialog closed');
    });
  }
}
