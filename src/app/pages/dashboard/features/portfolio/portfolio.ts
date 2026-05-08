import { Component, inject, OnInit } from '@angular/core';
import { Card } from '../../../../components/card/card';
import { PortfolioSignalService } from './store/portfolio-base.service';
import { PORTFOLIO_CARD_FOOTER_STYLES, TRANSITION_MOVE_UP } from './core/styles/portfolio.styles';
import { JGProject } from './core/models/project';
import { JGExperience } from './core/models/experience';
import { ExperienceSignalService, ProjectSignalService } from './store/portfolio.service';
import { SkeletonItem } from "../../../../components/skeletons/item/skeleton-item";
import { BlogItem } from "../../../../components/item/item";
import { HlmMuted, HlmH3 } from "@spartan-ng/helm/typography";
import { HlmIcon } from "@spartan-ng/helm/icon";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideInfo } from '@ng-icons/lucide';

@Component({
  selector: 'app-resume',
  imports: [Card, SkeletonItem, HlmIcon, NgIcon, HlmH3],
  templateUrl: './portfolio.html',
  providers: [provideIcons({ lucideInfo })],
  styles: ``,
})
export class Portfolio implements OnInit {
  _projectService = inject(ProjectSignalService)
  _expService = inject(ExperienceSignalService)
  portfolioCardFooterStyle = PORTFOLIO_CARD_FOOTER_STYLES
  transitionMoveUp = TRANSITION_MOVE_UP

  ngOnInit(): void {

    this.getContent<JGExperience>('v1/Experiences', this._expService)
    // this.getContent<JGProject>('v1/Projects', this._projectService)
  }


  async getContent<T>(endpoint:string, signalState: PortfolioSignalService<T>){
    signalState.setLoading();
    await(signalState.getPortfolioResource(endpoint));
  }
}
