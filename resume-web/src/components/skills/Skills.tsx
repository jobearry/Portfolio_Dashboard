import { Pill } from "../ui/pill"
import { skills } from "./skills.model"

export const Skills = () => {
  return (
    <div className="border m-2 rounded-md" id="experience">
      <div className="m-2">
        <h2 className="font-bold text-lg text-orange-700">Skills:</h2>
        <hr/>
        <div className="m-5">
          {skills.map((skill,index) => (
            <Pill key={index} label={skill.tag} color={"bg-orange-900"}></Pill>
          ))}
        </div>
      </div>
    </div>
  )
}