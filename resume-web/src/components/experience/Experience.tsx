import { Company } from "./Company"

export const Experience = () => {
  return (
    <div className="border m-2 rounded-md" id="experience">
      <div className="m-2">
        <h2 className="font-bold text-lg text-orange-700">Professional Experiences:</h2>
        <hr className=""/>
        <div>
          <Company></Company>
        </div>
      </div>
    </div>
  )
}