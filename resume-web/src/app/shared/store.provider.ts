import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { GithubProjectState } from "../features/github/store/github.state";
import { projectReducer } from "../features/github/store/github.reducer";
import { isDevMode } from "@angular/core";

export interface State {
  project: GithubProjectState
}

export const reducers: ActionReducerMap<State> = {
  project: projectReducer
}

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
