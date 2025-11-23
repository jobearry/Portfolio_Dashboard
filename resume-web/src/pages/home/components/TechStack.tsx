import { Badge } from "../../../components/ui/badge"
import { skills } from "../../../lib/constants/skills.constants"

export const TechStack = () => {
  return (
    <div className="m-2">
      <div className="m-5 text-start">
        {skills.map((skill,index) => (
          <Badge key={index} variant="outline" className="m-1 border-white text-white">{skill.tag}</Badge>
        ))}
      </div>
    </div>
  )
}