import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { Card } from "../../../../components/card/card";
import { PortfolioSignalService } from '../portfolio/store/portfolio-base.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styles: ``,
})
export class Home implements OnInit{
  async ngOnInit(): Promise<void> {
  }
}
