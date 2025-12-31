import { Badge } from "../../../components/ui/badge"
import { skills } from "../constants/skills.constants"

export const TechStack = () => {
  return (
    <div className="m-2">
      <div className="m-5 text-start font-bold mb-6 flex flex-wrap justify-center">
        {skills.map((skill,index) => (
          <Badge 
            key={index} variant="outline" 
            className="m-1 border-gray-400 ">
              {skill.tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}