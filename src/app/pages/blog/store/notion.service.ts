import { inject, Injectable, signal } from "@angular/core";
import { NotionPageInitialState, NotionPageState } from "./notion.state";
import { NotionPageCard } from "../core/notion-page.model";
import { PortfolioApi } from "../../../../api/portfolio-api";

@Injectable({providedIn: 'root'})
export class NotionSignalService{
  private readonly pageMarkdown = signal<NotionPageState>(NotionPageInitialState)
  private readonly api = inject(PortfolioApi);

  state(){
    return this.pageMarkdown();
  }
  async getPage(pageId: string){
    const endpoint = `v1/notion/${pageId}`

    this.pageMarkdown.set({
      content: null,
      loading: true,
      message: null
    })

    const response = await this.api.get<NotionPageCard[]>(endpoint);

    this.pageMarkdown.set({
      content: response,
      loading: false,
      message: "data retrieved."
    })
  }
}
