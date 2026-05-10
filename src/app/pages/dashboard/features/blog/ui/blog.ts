import { Component, inject, OnInit } from '@angular/core';
import { NotionSignalService } from '../store/notion.service';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { lucideExternalLink } from '@ng-icons/lucide';
import { convertNotionUrl } from '../core/notion-parse.util';
import { NOTION_PUBLIC_DOMAIN } from '../core/notion.constants';
import { SkeletonItem } from "../../../../../components/skeletons/item/skeleton-item";
import { HlmIcon } from '@spartan-ng/helm/icon';
import { TRANSITION_MOVE_UP } from '../../portfolio/core/styles/portfolio.styles';

@Component({
  selector: 'app-blog',
  imports: [SkeletonItem, NgIcon, HlmIcon],
  templateUrl: './blog.html',
  providers: [provideIcons({ lucideExternalLink })],
  styles: ``,
})
export class Blog implements OnInit {
  notionService = inject(NotionSignalService);
  transitionMoveUp = TRANSITION_MOVE_UP;
  async ngOnInit() {
    await this.notionService.getPage("16348b6ae5dd8032b137c4327f9ab77c")
  }

  parseUrl(url: string){
    return convertNotionUrl(url, NOTION_PUBLIC_DOMAIN);
  }
}
