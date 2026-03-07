import { PROJECT_HIGHLIGHT } from "../../../pages/projects/constants/project.constant";
import { GithubRepo } from "../types/github.type";
import { Project } from "../../../pages/projects/types/project.type";

export interface GithubProjectState{
  githubRepos: GithubRepo[],
  monthlyCommits: any[],
  loading: boolean
}

export const GITHUB_REPO_STATE: GithubProjectState = {
  githubRepos: [],
  monthlyCommits: [],
  loading: false
}
