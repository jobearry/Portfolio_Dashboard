import { Component, inject, OnInit } from '@angular/core';
import { ProjectSignalService } from '../../store/portfolio.service';
import { SkeletonItem } from "../../../../../../components/skeletons/item/skeleton-item";
import { TRANSITION_MOVE_UP } from '../../core/styles/portfolio.styles';
import { HlmH3 } from '@spartan-ng/helm/typography';
import { JGProject } from '../../core/models/project';
import { getContent } from '../../core/portfolio.util';

@Component({
  selector: 'app-project',
  imports: [SkeletonItem, HlmH3],
  templateUrl: './project.html',
  styles: ``,
})
export class ProjectComponent implements OnInit {
  protected readonly _projectService = inject(ProjectSignalService);
  transitionMoveUp = TRANSITION_MOVE_UP;

  ngOnInit(){
    getContent<JGProject>('portfolio/projects', this._projectService)

  }
}
