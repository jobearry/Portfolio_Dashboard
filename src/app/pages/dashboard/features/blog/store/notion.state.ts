import { NotionPageCard } from "../core/notion-page.model"

export interface NotionPageState {
  content: NotionPageCard[] | null
  loading: boolean
  message: string | null
}

export const NotionPageInitialState: NotionPageState = {
  content: null,
  loading: false,
  message: null
}
