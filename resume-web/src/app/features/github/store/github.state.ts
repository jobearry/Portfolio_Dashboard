import { GithubRepo } from "../types/github.type";
import { GithubCommit } from "../types/github.type";

export interface GithubProjectState{
  githubRepos: GithubRepo[]
  githubRepoPublic: GithubRepo[]
  monthlyCommits: GithubCommit[]
  loading: boolean
}

export const GITHUB_REPO_STATE: GithubProjectState = {
  githubRepos: [],
  githubRepoPublic: [],
  monthlyCommits: [],
  loading: false
}
