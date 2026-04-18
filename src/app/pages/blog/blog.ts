import { Component, inject, OnInit } from '@angular/core';
import { Card } from "../../components/card/card";
import { NotionSignalService } from './store/notion.service';
import { SkeletonCard } from "../../components/skeletons/card/skeleton-card";
import { HlmIcon } from "@spartan-ng/helm/icon";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideExternalLink } from '@ng-icons/lucide';
import { convertNotionUrl } from './core/notion-parse.util';
import { NOTION_PUBLIC_DOMAIN } from './core/notion.constants';

@Component({
  selector: 'app-blog',
  imports: [Card, SkeletonCard, HlmIcon, NgIcon],
  templateUrl: './blog.html',
  providers: [provideIcons({ lucideExternalLink })],
  styles: ``,
})
export class Blog implements OnInit {
  notionService = inject(NotionSignalService);
  async ngOnInit() {
    await this.notionService.getPage("16348b6ae5dd8032b137c4327f9ab77c")
  }

  parseUrl(url: string){
    return convertNotionUrl(url, NOTION_PUBLIC_DOMAIN);
  }
}
