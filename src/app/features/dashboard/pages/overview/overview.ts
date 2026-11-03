import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { getContent, getResource, Skeleton, StateMessage } from '../../../../shared';
import {
  GithubCountSignalService,
  NotionCountSignalService,
  OverviewSignalService,
} from '../../../../shared/services/portfolio.service';
import { site } from '../../../../core/config/site.config';
import { OverviewItem } from '../../core/models/overview-item';
import { MetricCard } from './components/metric-card/metric-card';

@Component({
  selector: 'app-overview',
  imports: [MetricCard, Skeleton, StateMessage],
  templateUrl: './overview.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Overview implements OnInit {
  private readonly _overviewService = inject(OverviewSignalService);
  private readonly _githubService = inject(GithubCountSignalService);
  private readonly _notionService = inject(NotionCountSignalService);

  protected readonly state = computed(() => this._overviewService.getState());
  protected readonly github = computed(() => this._githubService.getState());
  protected readonly notion = computed(() => this._notionService.getState());
  protected readonly site = site;
  protected readonly skeletonRows = [0, 1, 2];

  ngOnInit() {
    void this.load();
  }

  protected load() {
    return Promise.all([this.loadOverview(), this.loadGithub(), this.loadNotion()]);
  }

  protected loadOverview() {
    return getContent<OverviewItem>('v1/overview', this._overviewService);
  }

  protected loadGithub() {
    return getResource<OverviewItem>(
      `v1/github/owner/${site.github.username}/repositories/count`,
      this._githubService,
    );
  }

  protected loadNotion() {
    return getResource<OverviewItem>(`v1/notion/${site.notion.pageId}/count`, this._notionService);
  }

  protected labelFor(key: string): string {
    return key
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replaceAll('_', ' ')
      .toUpperCase();
  }

  protected subtitleFor(key: string): string {
    switch (key.toLowerCase()) {
      case 'projects':
        return 'Selected work and portfolio projects';
      case 'skills':
        return 'Technologies and tools in my toolkit';
      case 'recommendations':
        return 'Feedback from people I have worked with';
      case 'githubrepositories':
        return 'Public repositories on GitHub';
      case 'notionpages':
        return 'Blog posts through my Notion workspace';
      default:
        return `Overview of ${key.toLowerCase().replaceAll('_', ' ')}`;
    }
  }
}
