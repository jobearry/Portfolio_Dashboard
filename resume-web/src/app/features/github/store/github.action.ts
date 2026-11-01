import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { GithubCommit, GithubRepo } from "../types/github.type";

export const GithubAPIActions = createActionGroup({
  source: 'GithubAPI',
  events: {
    ViewGithubProjects: emptyProps(),
    ViewGithubProjectsSuccess: props<{repos: GithubRepo[]}>(),
    ViewGithubProjectsFail: emptyProps(),

    ViewGithubCommits: props<{startDate: string, endDate: string}>(),
    ViewGithubCommitsSuccess: props<{ commits: GithubCommit[] }>(),
    ViewGithubCommitsFail: emptyProps()
  }
})
