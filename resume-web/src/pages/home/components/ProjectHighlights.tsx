import type { Project } from "@/lib/types/project.type";
import { useNavigate } from "react-router-dom";

interface ProjectEvents {
  events: Project[]
}

export const ProjectHighlights: React.FC<ProjectEvents> = ({events}) => {
  const navigate = useNavigate()
  const handleClick = () => {
    // console.log("🚀 ~ handleClick ~ e:", e)
    navigate("/projects")
  }
  return (
    
    <section className="m-6 text-start flex flex-col gap-2">
      <ul className="grid md:grid-cols-2 gap-2">
        {events.map(event => (
          <li key={event.id} className="cursor-pointer transition-all duration-300 hover:transform-[translateY(-.2rem)] hover:shadow-xl">
            <article className="h-full border border-gray-500 rounded-sm p-2">
              <h3 className="font-bold text-sm">{event.title}</h3>
              <p className="text-gray-400 text-xs">{event.duration}</p>
              <p className="my-1 text-sm">{event.contribution}</p>
            </article>

            
          </li>
        ))}
      </ul>
      <button className="self-end cursor-pointer items-center justify-center rounded-sm border-[1.58px] 
        border-zinc-600 px-3 py-1 text-xs text-slate-200 shadow-md transition-all duration-300 
        hover:transform-[translateY(-.2rem)]" onClick={handleClick}>
        View More
      </button>
    </section>
  );
}