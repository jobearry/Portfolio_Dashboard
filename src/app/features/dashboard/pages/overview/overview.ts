import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { HlmH1 } from '@spartan-ng/helm/typography';
import { SkeletonItem } from '../../../../components/skeletons/item/skeleton-item';
import { getContent, StateMessage } from '../../../../shared';
import { OverviewSignalService } from '../../../../shared/services/portfolio.service';
import { DashboardItem } from '../../core/models/dashboard-item';

@Component({
  selector: 'app-overview',
  imports: [SkeletonItem, HlmH1, StateMessage],
  templateUrl: './overview.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Overview implements OnInit {
  private readonly _overviewService = inject(OverviewSignalService);
  protected readonly state = computed(() => this._overviewService.getState());

  ngOnInit() {
    void this.load();
  }

  protected load() {
    return getContent<DashboardItem>('v1/overview', this._overviewService);
  }
}
