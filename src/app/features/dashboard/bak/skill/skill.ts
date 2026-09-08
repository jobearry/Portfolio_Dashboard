import { Component, inject, OnInit } from '@angular/core';
import { HlmH3 } from '@spartan-ng/helm/typography';
import { SkeletonItem } from '../../../../components/skeletons/item/skeleton-item';
import { TRANSITION_MOVE_UP } from '../../../../core/styles/common.styles';
import { getContent } from '../../../../shared/utils/portfolio.util';
import { SkillsSignalService } from '../../../../shared/services/portfolio.service';
import { JGTechStackDTO } from '../../core/models/techstack';

@Component({
  selector: 'app-skill',
  imports: [SkeletonItem, HlmH3],
  templateUrl: './skill.html',
  styles: ``,
})
export class SkillComponent implements OnInit {
  protected readonly _skillsService = inject(SkillsSignalService);
  transitionMoveUp = TRANSITION_MOVE_UP;

  ngOnInit(){
    getContent<JGTechStackDTO>('v1/portfolio/techStack', this._skillsService)

  }
}
