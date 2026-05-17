import { Component, inject, OnInit } from '@angular/core';
import { PORTFOLIO_CARD_FOOTER_STYLES, TRANSITION_MOVE_UP } from '../core/styles/portfolio.styles';
import { JGExperience } from '../core/models/experience';
import { ExperienceSignalService, ProjectSignalService, SkillsService } from '../store/portfolio.service';
import { HlmH3 } from "@spartan-ng/helm/typography";
import { NgIcon } from "@ng-icons/core";
import { HlmDialogService } from '../../../../../../../libs/ui/dialog/src/lib/hlm-dialog.service';
import { getContent } from '../core/portfolio.util';
import { ProjectDialog } from '../components/dialog/project-dialog';
import { JGProject } from '../core/models/project';
import { JGTechStackDTO } from '../core/models/techstack';
import { PORTFOLIO_CONTROLS } from '../core/portfolio.constant';

@Component({
  selector: 'app-resume',
  imports: [HlmH3, NgIcon],
  templateUrl: './portfolio.html',
  styles: ``,
})
export class Portfolio implements OnInit {
  _hlmDialogService = inject(HlmDialogService);
  _projectService = inject(ProjectSignalService);
  _expService = inject(ExperienceSignalService);
  _skillsService = inject(SkillsService);

  portfolioCardFooterStyle = PORTFOLIO_CARD_FOOTER_STYLES
  transitionMoveUp = TRANSITION_MOVE_UP

  controls = PORTFOLIO_CONTROLS

  ngOnInit(): void {
    getContent<JGExperience>('v1/portfolio/Experiences', this._expService)
    getContent<JGTechStackDTO>('v1/portfolio/TechStack', this._skillsService)
  }

  async openDialog(experience: JGExperience){
    await getContent<JGProject>(`v1/portfolio/Experiences/${experience.experienceId}/projects`, this._projectService)
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
