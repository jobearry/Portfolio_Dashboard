import { Component, inject, OnInit } from '@angular/core';
import { Card } from '../../../../../components/card/card';
import { PORTFOLIO_CARD_FOOTER_STYLES, TRANSITION_MOVE_UP } from '../core/styles/portfolio.styles';
import { JGExperience } from '../core/models/experience';
import { ExperienceSignalService, ProjectSignalService, SkillsService } from '../store/portfolio.service';
import { SkeletonItem } from "../../../../../components/skeletons/item/skeleton-item";
import { HlmH3 } from "@spartan-ng/helm/typography";
import { HlmIcon } from "@spartan-ng/helm/icon";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideInfo, lucideToolCase } from '@ng-icons/lucide';
import { HlmDialogService } from '../../../../../../../libs/ui/dialog/src/lib/hlm-dialog.service';
import { getContent } from '../core/portfolio.util';
import { ProjectDialog } from '../components/dialog/project-dialog';
import { JGProject } from '../core/models/project';
import { Maintenance } from "../../../../../components/maintenance.ts/maintenance";
import { JGTechStackDTO } from '../core/models/techstack';

@Component({
  selector: 'app-resume',
  imports: [Card, SkeletonItem, HlmIcon, NgIcon, HlmH3],
  templateUrl: './portfolio.html',
  providers: [provideIcons({ lucideInfo, lucideToolCase })],
  styles: ``,
})
export class Portfolio implements OnInit {
  _hlmDialogService = inject(HlmDialogService);
  _projectService = inject(ProjectSignalService);
  _expService = inject(ExperienceSignalService);
  _skillsService = inject(SkillsService);
  portfolioCardFooterStyle = PORTFOLIO_CARD_FOOTER_STYLES
  transitionMoveUp = TRANSITION_MOVE_UP

  ngOnInit(): void {

    getContent<JGExperience>('v1/Experiences', this._expService)
    getContent<JGTechStackDTO>('v1/TechStack', this._skillsService)
  }

  async openDialog(experience: JGExperience){
    await getContent<JGProject>(`v1/Experiences/${experience.experienceId}/projects`, this._projectService)
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
