import { PROJECT_HIGHLIGHT } from "../constants/project.constant";
import { GithubRepo } from "../types/github.type";
import { Project } from "../types/project.type";

export interface ProjectState{
  clientProjects: Project[] 
  githubRepos: GithubRepo[]
  loading: boolean
}

export const ProjectDataState: ProjectState = {
  clientProjects: [],
  githubRepos: [],
  loading: false
}