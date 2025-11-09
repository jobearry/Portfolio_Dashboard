import { sdmiProjects } from "../projects/poject.model"
import { Projects } from "../projects/Projects"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../ui/carousel"

export const Company = () => {
  return (
    <div className='rounded overflow-hidden shadow-lg my-2 bg-[#252424]'>
      <div className="m-2">
        <h4 className="text-xl font-bold text-[#ffffff]">SHI Design and Manufacturing Inc.</h4>
        <p className="text-xs ">Junior Programmer | 2023 - Present</p> <br />
        <p className="text-md font-bold text-[#ffffff] text-start">Notable projects:</p> <hr />
        <div>
          <Carousel opts={{ align: "start"}} className="w-full">
            <CarouselContent>
              {/* Projects list */}
              {sdmiProjects.map(x => (
                <CarouselItem key={x.id} 
                  className="grid place-items-center md:basis-1/2">
                    <div className="p-1">
                      <Projects {...x}></Projects>
                    </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex gap-2 justify-end">
              <CarouselPrevious className="hover:text-white"/>
              <CarouselNext className="hover:text-white"/>
            </div>
          </Carousel>

        </div>
      </div>
      
    </div>
   
  )
}