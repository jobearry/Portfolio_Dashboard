import type { Project } from "@/lib/constants/poject.constants";
import { MoveLeft } from "lucide-react"
import type { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

interface ProjectEvents {
  children: Project[]
}


export const Projects: React.FC<ProjectEvents> = ({children}) => {
  const navigate = useNavigate()
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log("🚀 ~ handleClick ~ e:", e)
    navigate("/home")
  }
  return (
    <section className="m-6 text-start flex flex-col">
      <button onClick={handleClick}
        className="flex items-center gap-4 h-8 m-2 cursor-pointer">
        <MoveLeft/> 
        Go back
      </button>
      <ul>
        {children!.map(event => (
          <li key={event.id} className="cursor-pointer transition-all duration-300 hover:transform-[translateY(-.2rem)] hover:shadow-xl">
            <article className="border border-gray-500 my-2 rounded-sm p-2 bg-[#141414]">
              <h3 className="font-bold text-sm">{event.title}</h3>
              <p className="text-gray-400 text-xs">{event.duration}</p>
              <p className="my-1 text-sm">{event.contirbution}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}