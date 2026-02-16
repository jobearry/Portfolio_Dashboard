import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { ProjectState } from "../pages/projects/store/project.state";
import { projectReducer } from "../pages/projects/store/project.reducer";
import { isDevMode } from "@angular/core";

export interface State {
  project: ProjectState
}

export const reducers: ActionReducerMap<State> = {
  project: projectReducer
}

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];