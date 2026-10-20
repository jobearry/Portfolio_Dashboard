import { NotionPageCard } from '../core';

export interface NotionPageState {
  content: NotionPageCard[] | null;
  loading: boolean;
  error: string | null;
}

export const NotionPageInitialState: NotionPageState = {
  content: null,
  loading: false,
  error: null,
};
