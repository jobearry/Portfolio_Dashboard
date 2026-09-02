import { Component, inject, OnInit } from '@angular/core';
import { OverviewSignalService } from '../../store/portfolio.service';
import { getContent } from '../../core/portfolio.util';
import { DashboardItem } from '../../core/models/dashboard-item';
import { SkeletonItem } from "../../../../../../components/skeletons/item/skeleton-item";
import { HlmH1 } from "@spartan-ng/helm/typography";

@Component({
  selector: 'app-overview',
  imports: [SkeletonItem, HlmH1],
  templateUrl: './overview.html',
  styles: ``,
})
export class Overview implements OnInit {
  protected readonly _overviewService = inject(OverviewSignalService);

  ngOnInit(){
    getContent<DashboardItem>('v1/overview', this._overviewService)
  }
}
