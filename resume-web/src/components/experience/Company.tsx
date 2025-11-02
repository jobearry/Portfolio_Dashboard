import { Projects } from "../projects/Projects"

export const Company = () => {
  return (
    <div className='rounded overflow-hidden shadow-lg my-2 bg-[#252424]'>
      <div className="m-2">
        <h4 className="text-xl font-bold text-[#ffffff]">SHI Design and Manufacturing Inc.</h4>
        <p className="text-xs ">Junior Programmer | 2023 - Present</p> <br />
        <p className="text-md font-bold text-[#ffffff] text-start">Notable projects:</p> <hr />
        <div>
          <Projects></Projects>
        </div>
      </div>
      
    </div>
   
  )
}