import type { Project } from "@/lib/constants/poject.constants"
import { ExternalLink } from "lucide-react"

interface ProjectBlockProps {
  content: Project[]
}
export const ProjectBlock: React.FC<ProjectBlockProps> = ({content}) => {
  console.log("🚀 ~ ProjectBlock ~ content:", content)
  return (
    <ul className="md:grid md:grid-cols-3 md:gap-5">
      {content.map(event => (
        <li key={event.id} className="transition-all duration-300 hover:transform-[translateY(-.2rem)] hover:shadow-xl">
          <div className="flex
            border border-gray-500 my-2 rounded-sm p-2 bg-[#141414]">
            <article className="flex-1/3">

              <h3 className="font-bold text-sm cursor-pointer">
                <a href={event.link?? "#"}>
                  <span className="flex gap-2">
                    {event.title}
                    <ExternalLink strokeWidth={1} size={15}/>
                  </span>
                </a>
              </h3>
              <p className="text-gray-400 text-xs">{event.duration}</p>
              <p className="my-1 text-sm">{event.contirbution}</p>
              
            
            </article>
            <div className="flex gap-2">
              {event.tags?.map((tag,index) => (
                <span key={index} className="my-1 text-xs">
                  <i className={`devicon-${tag.toLowerCase()}-plain colored`}></i>
                </span>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}