import { Component, inject, OnInit } from '@angular/core';
import { Profile } from "../home/components/profile/profile";
import { Card } from "../../components/card/card";
import { NotionSignalService } from './store/notion.service';

@Component({
  selector: 'app-blog',
  imports: [Card],
  templateUrl: './blog.html',
  styles: ``,
})
export class Blog implements OnInit {
  notionService = inject(NotionSignalService);
  async ngOnInit() {
    await this.notionService.getPage("16348b6ae5dd8032b137c4327f9ab77c")
  }
}
