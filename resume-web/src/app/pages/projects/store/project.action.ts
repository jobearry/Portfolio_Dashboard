import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { GithubRepo } from "../types/github.type";

export const ProjectActions = createActionGroup({
  source: 'Project',
  events: {
    ViewGithubProjects: emptyProps(),
    ViewGithubProjectsSuccess: props<{repos: GithubRepo[]}>(),
    ViewGithubProjectsFail: emptyProps(),
  }
})