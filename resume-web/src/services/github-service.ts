import { Project } from "@/lib/constants/poject.constants"
import axios from "axios"

interface GitHubRepo {
  id: number
  name: string
  languages_url: string
  description: string
  html_url: string
}

const api = axios.create({
  baseURL: "https://api.github.com",
  headers:{
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_ACCESS_TOKEN}`
  }
})

export class GithubService {
  async getRepos(){
    const response = await api.get("/users/jobearry/repos")
    // console.log("🚀 ~ GithubService ~ getRepos ~ response:", response.data)
    const projects = response.data.map(async (x: GitHubRepo) => {
      const langs = await api.get(x.languages_url)
      return new Project(
        x.id,
        x.name,
        "",
        "",
        [x.description],
        Object.keys(langs.data).map(x => {
          if(x.includes("#")){
            return x.replace("#", "sharp")
          }
          if(x === "HTML"){
            return "html5"
          }
          if(x === "CSS"){
            return "css3"
          }
          return x.replace(/\d+/g, "")

        }),
        x.html_url
      )
    })

    return Promise.all(projects)
  }
}