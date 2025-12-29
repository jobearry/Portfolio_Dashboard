import type { Project } from "@/lib/constants/poject.constants";
import { GithubService } from "@/services/github-service";
import { create } from "zustand";

interface GithubRepoState{
  githubRepos: Project[],
  loading: boolean,
  getRepos:() => Promise<void>
}

const githubService = new GithubService()

export const useGithubStore = create<GithubRepoState>((set) => {
  return {
    githubRepos:[],
    loading: false,

    getRepos: async () => {
      set({loading: true})
      try {
        const data = await githubService.getRepos()
        // console.log("🚀 ~ GithubStore ~ data:", data)
        
        set({githubRepos: data})
      }catch (err){
        console.error("Error occured: ", err)
      }finally{
        set({loading: false})
      }
    }

  }
})