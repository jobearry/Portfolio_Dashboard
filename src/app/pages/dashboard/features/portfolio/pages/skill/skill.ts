import { Component, inject, OnInit } from '@angular/core';
import { SkeletonItem } from "../../../../../../components/skeletons/item/skeleton-item";
import { TRANSITION_MOVE_UP } from '../../core/styles/portfolio.styles';
import { SkillsService } from '../../store/portfolio.service';
import { JGTechStackDTO } from '../../core/models/techstack';
import { getContent } from '../../core/portfolio.util';
import { HlmH3 } from '@spartan-ng/helm/typography';

@Component({
  selector: 'app-skill',
  imports: [SkeletonItem, HlmH3],
  templateUrl: './skill.html',
  styles: ``,
})
export class Skill implements OnInit {
  protected readonly _skillsService = inject(SkillsService);
  transitionMoveUp = TRANSITION_MOVE_UP;

  ngOnInit(){
    getContent<JGTechStackDTO>('portfolio/techStack', this._skillsService)

  }
}
