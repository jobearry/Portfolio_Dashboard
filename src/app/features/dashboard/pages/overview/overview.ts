import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { getContent, Skeleton, StateMessage } from '../../../../shared';
import { OverviewSignalService } from '../../../../shared/services/portfolio.service';
import { site } from '../../../../core/config/site.config';
import { OverviewItem } from '../../core/models/overview-item';

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
    return getContent<OverviewItem>('v1/overview', this._overviewService);
  }

  protected subtitleFor(key: string): string {
    switch (key.toLowerCase()) {
      case 'projects':
        return 'Selected work and portfolio projects';
      case 'skills':
        return 'Technologies and tools in my toolkit';
      case 'recommendations':
        return 'Feedback from people I have worked with';
      default:
        return `Overview of ${key.toLowerCase().replaceAll('_', ' ')}`;
    }
  }
}
