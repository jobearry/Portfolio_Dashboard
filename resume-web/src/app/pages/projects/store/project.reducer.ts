import { createReducer, on } from "@ngrx/store";
import { ProjectDataState, ProjectState } from "./project.state";
import { ProjectActions } from "./project.action";
import { PROJECT_HIGHLIGHT } from "../constants/project.constant";

export const projectReducer = createReducer(
  ProjectDataState,
  on(ProjectActions.viewGithubProjects, (state) => {
    const result: ProjectState = {
      ...state,
      githubRepos: [],
      clientProjects: [],
      loading: true
    }
    return result;
  }),
  on(ProjectActions.viewGithubProjectsSuccess, (state, {repos}) => {
    const result: ProjectState = {
      ...state,
      githubRepos: repos,
      clientProjects: PROJECT_HIGHLIGHT,
      loading: false
    }
    console.log("🚀 ~ result:", result)
    return result;
  }),
)