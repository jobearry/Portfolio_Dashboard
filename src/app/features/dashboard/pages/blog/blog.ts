import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { lucideExternalLink } from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { SkeletonItem } from '../../../../components';
import { StateMessage } from '../../../../shared';
import { TRANSITION_MOVE_UP } from '../../../../core';

import { convertNotionUrl, NOTION_PUBLIC_DOMAIN } from './core';
import { NotionSignalService } from './store';

const NOTION_PAGE_ID = '16348b6ae5dd8032b137c4327f9ab77c';

@Component({
  selector: 'app-blog',
  imports: [SkeletonItem, NgIcon, HlmIcon, StateMessage],
  templateUrl: './blog.html',
  providers: [provideIcons({ lucideExternalLink })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog implements OnInit {
  private readonly notionService = inject(NotionSignalService);
  protected readonly state = computed(() => this.notionService.state());
  protected readonly transitionMoveUp = TRANSITION_MOVE_UP;

  ngOnInit() {
    void this.load();
  }

  protected load() {
    return this.notionService.getPage(NOTION_PAGE_ID);
  }

  protected parseUrl(url: string) {
    return convertNotionUrl(url, NOTION_PUBLIC_DOMAIN);
  }
}
