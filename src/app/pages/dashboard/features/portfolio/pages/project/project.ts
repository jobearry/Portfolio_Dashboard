import { Component, inject, OnInit } from '@angular/core';
import { ProjectSignalService } from '../../store/portfolio.service';
import { SkeletonItem } from "../../../../../../components/skeletons/item/skeleton-item";
import { TRANSITION_MOVE_UP } from '../../core/styles/portfolio.styles';
import { HlmH3 } from '@spartan-ng/helm/typography';
import { JGProject } from '../../core/models/project';
import { getContent } from '../../core/portfolio.util';
import { HlmDialogService } from '../../../../../../../../libs/ui/dialog/src/lib/hlm-dialog.service';
import { ProjectDialog } from '../../components/dialog/project-dialog';

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
    getContent<JGProject>('v1/portfolio/projects', this._projectService)

  }

  async openDialog(project: JGProject){
    // await getContent<JGProject>(`v1/portfolio/Experiences/${experience.experienceId}/projects`, this._projectService)
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
