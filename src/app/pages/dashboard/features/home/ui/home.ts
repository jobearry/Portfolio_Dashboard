import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { Card } from "../../../../../components/card/card";
import { PortfolioSignalService } from '../store/portfolio.service';

@Component({
  selector: 'app-home',
  imports: [Card],
  templateUrl: './home.html',
  styles: ``,
})
export class Home implements OnInit{
  portfolioService = inject(PortfolioSignalService)
  async ngOnInit(): Promise<void> {
    const test = await(this.portfolioService.getProject())
    console.log("🚀 ~ Home ~ ngOnInit ~ test:", test)
  }
}
