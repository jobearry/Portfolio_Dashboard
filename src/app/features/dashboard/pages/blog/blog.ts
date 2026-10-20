import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideExternalLink } from '@ng-icons/lucide';
import { site } from '../../../../core/config/site.config';
import { PageHeader, Skeleton, StateMessage } from '../../../../shared';

import { convertNotionUrl, NOTION_PUBLIC_DOMAIN } from './core';
import { NotionSignalService } from './store';

@Component({
  selector: 'app-blog',
  imports: [NgIcon, PageHeader, Skeleton, StateMessage],
  templateUrl: './blog.html',
  providers: [provideIcons({ lucideExternalLink })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog implements OnInit {
  private readonly notionService = inject(NotionSignalService);
  protected readonly state = computed(() => this.notionService.state());

  ngOnInit() {
    void this.load();
  }

  protected load() {
    return this.notionService.getPage(site.notion.pageId);
  }

  protected parseUrl(url: string) {
    return convertNotionUrl(url, NOTION_PUBLIC_DOMAIN);
  }

  protected indexLabel(index: number): string {
    return String(index + 1).padStart(2, '0');
  }
}
