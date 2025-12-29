import { Project } from "@/lib/constants/poject.constants";
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
    <section className="m-6 text-start flex flex-col">
      <ul>
        {events.map(event => (
          <li key={event.id} className="cursor-pointer transition-all duration-300 hover:transform-[translateY(-.2rem)] hover:shadow-xl">
            <article className="border border-gray-500 my-2 rounded-sm p-2">
              <h3 className="font-bold text-sm">{event.title}</h3>
              <p className="text-gray-400 text-xs">{event.duration}</p>
              <p className="my-1 text-sm">{event.contirbution}</p>
            </article>
          </li>
        ))}
      </ul>
      <button className="self-end cursor-pointer items-center justify-center rounded-sm border-[1.58px] 
        border-zinc-600 px-3 py-1 text-xs text-slate-200 shadow-md transition-all duration-300 
        hover:transform-[translateY(-.2rem)] hover:shadow-xl" onClick={handleClick}>
        View More
      </button>
    </section>
  );
}