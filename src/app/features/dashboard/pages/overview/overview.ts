import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { getContent, Skeleton, StateMessage } from '../../../../shared';
import { OverviewSignalService } from '../../../../shared/services/portfolio.service';
import { site } from '../../../../core/config/site.config';
import { DashboardItem } from '../../core/models/dashboard-item';

@Component({
  selector: 'app-overview',
  imports: [Skeleton, StateMessage],
  templateUrl: './overview.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Overview implements OnInit {
  private readonly _overviewService = inject(OverviewSignalService);
  protected readonly state = computed(() => this._overviewService.getState());
  protected readonly site = site;

  ngOnInit() {
    void this.load();
  }

  protected load() {
    return getContent<DashboardItem>('v1/overview', this._overviewService);
  }
}
