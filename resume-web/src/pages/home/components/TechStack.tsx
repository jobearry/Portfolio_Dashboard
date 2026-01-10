import { Badge } from "../../../components/ui/badge"
import { backend, database, frontend } from "../constants/skills.constants"

export const TechStack = () => {
  return (
    <div className="m-2">
      <div className="text-start font-bold mb-6 flex gap-4 flex-wrap justify-center">
        <div className="w-full">
          <h3 className="mx-1">Frontend</h3>
          {frontend.map((skill,index) => (
            <Badge 
              key={index} variant="outline" 
              className="m-1 border-gray-400 cursor-pointer transition-all duration-300 
                hover:transform-[translateY(-.2rem)] hover:shadow-xl">
                {skill.tag}
            </Badge>
          ))}
        </div>
        <div className="w-full">
          <h3 className="mx-1">Backend</h3>
          {backend.map((skill,index) => (
            <Badge 
              key={index} variant="outline" 
              className="m-1 border-gray-400 cursor-pointer transition-all duration-300 
                hover:transform-[translateY(-.2rem)] hover:shadow-xl">
                {skill.tag}
            </Badge>
          ))}
        </div>
        <div className="w-full">
          <h3 className="mx-1">Databases</h3>
          {database.map((skill,index) => (
            <Badge 
              key={index} variant="outline" 
              className="m-1 border-gray-400 cursor-pointer transition-all duration-300 
                hover:transform-[translateY(-.2rem)] hover:shadow-xl">
                {skill.tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}