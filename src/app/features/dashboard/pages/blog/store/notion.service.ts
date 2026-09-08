import { inject, Injectable, signal } from "@angular/core";
import { NotionPageCard } from "../core/notion-page.model";
import { ApiClient } from "../../../../../core/api/api-client";
import { NotionPageInitialState, NotionPageState } from ".";

@Injectable({providedIn: 'root'})
export class NotionSignalService{
  private readonly pageMarkdown = signal<NotionPageState>(NotionPageInitialState)
  private readonly apiClient = inject(ApiClient);

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

    const response = await this.apiClient.get<NotionPageCard[]>(endpoint);

    this.pageMarkdown.set({
      content: response,
      loading: false,
      message: "data retrieved."
    })
  }
}
