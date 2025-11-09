import { EducationInfo } from "./EducationInfo"

export const Education = () => {
  return (
    <div className="border m-2 rounded-md" id="education">
      <div className="m-2">
        <h2 className="font-bold text-lg text-orange-700">Education:</h2>
        {/* <hr className=""/> */}
        <EducationInfo></EducationInfo>
      </div>
    </div>
  )
}