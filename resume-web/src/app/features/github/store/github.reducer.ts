import { createReducer, on } from "@ngrx/store";
import { GITHUB_REPO_STATE, GithubProjectState } from "./github.state";
import { GithubAPIActions } from "./github.action";
import { PROJECT_HIGHLIGHT } from "../../../pages/projects/constants/project.constant";

export const projectReducer = createReducer(
  GITHUB_REPO_STATE,
  on(GithubAPIActions.viewGithubProjects, (state) => {
    const result: GithubProjectState = {
      ...state,
      githubRepos: [],
      loading: true
    }
    return result;
  }),
  on(GithubAPIActions.viewGithubProjectsSuccess, (state, {repos}) => {
    const result: GithubProjectState = {
      ...state,
      githubRepos: repos,
      loading: false
    }
    return result;
  }),

  on(GithubAPIActions.viewGithubCommits, (state) => {
    const result: GithubProjectState = {
      ...state,
      monthlyCommits: [],
      loading: true
    }
    return result;
  }),
  on(GithubAPIActions.viewGithubCommitsSuccess, (state, {commits}) => {
    console.log("🚀 ~ commits:", commits)
    const result: GithubProjectState = {
      ...state,
      monthlyCommits: commits,
      loading: false
    }
    return result;
  })
)
