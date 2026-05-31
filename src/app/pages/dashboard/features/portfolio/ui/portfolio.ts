import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { HlmDialogService } from '../../../../../../../libs/ui/dialog/src/lib/hlm-dialog.service';
import { SectionButton } from "../components/button/section-button";
import { PortfolioApi } from '../../../../../../api/portfolio-api';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { PORTFOLIO_CONTROLS } from '../core/portfolio.constant';
import { CommonModule } from '@angular/common';
import { PortfolioItems } from '../core/models/portfolio';

@Component({
  selector: 'app-resume',
  imports: [SectionButton, RouterModule, CommonModule],
  templateUrl: './portfolio.html',
  styles: ``,
})
export class Portfolio implements OnInit {
  _hlmDialogService = inject(HlmDialogService);
  _portfolioApi = inject(PortfolioApi);
  _router = inject(Router);
  _route = inject(ActivatedRoute);
  controls = PORTFOLIO_CONTROLS

  pageLoading = signal(false);
  itemCounter = signal<PortfolioItems | null>(null);
  private itemCountEffect = effect(() => {
    const pageLoading = this.pageLoading();
    if(pageLoading){
      this.getItemCounter();
      this.pageLoading.set(false);
    }
  })
  ngOnInit(): void {
    this.pageLoading.set(true)
    // getContent<JGExperience>('v1/portfolio/Experiences', this._expService)
    // getContent<JGTechStackDTO>('v1/portfolio/TechStack', this._skillsService)
  }
  async getItemCounter(){
    try{
      const itemCount = await this._portfolioApi.get<PortfolioItems>('v1/portfolio/count');
      console.log("🚀 ~ Portfolio ~ getItemCounter ~ itemCount:", itemCount)
      this.itemCounter.set(itemCount);
    }catch (err){

    }
  }
  itemCountFor(item: string){
    const counters = this.itemCounter();
    if(!counters) return 0;
    return counters[item as keyof PortfolioItems];
  }

  onButtonClicked(sectionName: string){
    this._router.navigate([sectionName.toLowerCase()], {relativeTo: this._route})
  }


  // async openDialog(experience: JGExperience){
  //   await getContent<JGProject>(`v1/portfolio/Experiences/${experience.experienceId}/projects`, this._projectService)
  //   const dialogRef = this._hlmDialogService.open(ProjectDialog, {
  //     context: {
  //       experience: experience,
  //       projects: this._projectService.getState().content
  //     }
  //   });

  //   dialogRef.closed$.subscribe(() => {
  //     console.log('Dialog closed');
  //   });
  // }
}
