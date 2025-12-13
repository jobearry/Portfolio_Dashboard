import type { Project } from "@/lib/constants/poject.constants";
import { MoveLeft } from "lucide-react"
import { useEffect, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectBlock } from "./project-block";
import { useGithubStore } from "@/store/github-store";

interface ProjectEvents {
  children: Project[]
}


export const Projects: React.FC<ProjectEvents> = ({children}) => {
  const navigate = useNavigate()
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    navigate("/home")
  }

  const {githubRepos, loading, getRepos} = useGithubStore()

  useEffect(() => {
    getRepos()
  },[])

  return (
    <section className="m-6 text-start flex flex-col">
      <button onClick={handleClick}
        className="flex items-center gap-4 h-8 m-2 cursor-pointer">
        <MoveLeft/> 
        Go back
      </button>
      
      <div>
        <h2 className="text-lg font-bold p-2">Corporate</h2>
        <ProjectBlock content={children}></ProjectBlock>
      </div>

      
      <div>
        <h2 className="text-lg font-bold p-2">GitHub</h2>
        { loading? (
          <div className="w-full grid place-items-center">
            <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full 
              animate-spin">
            </div>
          </div>
        ) : (
          <ProjectBlock content={!loading? githubRepos.filter(x => x.title !== "jobearry"): []}></ProjectBlock>
        )}
      </div>

      {/* <div>
        <h2 className="text-lg font-bold p-2">Codepen</h2>
        <ProjectBlock content={children}></ProjectBlock>
      </div>
      
      <div>
        <h2 className="text-lg font-bold p-2">FrontendMentor</h2>
        <ProjectBlock content={children}></ProjectBlock>
      </div> */}
    
    </section>
  ) 
} 