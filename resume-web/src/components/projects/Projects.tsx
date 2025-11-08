import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { sdmiProjects } from "./poject.model";

export const Projects = () => {
  return (
      <Carousel opts={{ align: "start"}} className="w-full">
        <CarouselContent>
          {/* Projects list */}
          {sdmiProjects.map(x => (
            <CarouselItem key={x.id} 
              className="grid place-items-center md:basis-1/2">
                <div className="p-1">
                  <Card className="bg-transparent my-2 text-gray-400">
                    <CardHeader>
                      <CardTitle className="font-bold text-[#ffffff] text-xl py-2 text-start">{x.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 sm:overflow-auto hover:scrollbar-thin scrollbar-hide aspect-square sm:aspect-video">
                        <ul className="list-none text-start object-fill">
                          <li className="list-item">
                            <p><span className="font-bold">Role: </span>{x.role}</p>
                          </li>
                          <li className="list-item">
                            <p><span className="font-bold">Duration: </span>{x.duration}</p>
                          </li>
                          <li className="list-item">
                            <span className="font-bold">Contribution: </span> 
                            <ul className="list-disc ml-5">
                              {x.contirbution.map((contrib,index) => (
                                <li key={index}>{contrib}</li>
                              ))}
                            </ul>
                          </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                      <p className="p-2 text-end w-full">
                        {x.tags.map((tag,index) => (
                          <span key={index} className="inline-block bg-orange-900 rounded-full px-3 py-1 text-xs font-semibold text-gray-300 mr-2 mb-2">
                            {tag}
                          </span>
                        ))}
                      </p>
                    </CardFooter>
                  </Card>
                </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex gap-2 justify-end">
          <CarouselPrevious className="hover:text-white"/>
          <CarouselNext className="hover:text-white"/>
        </div>
      </Carousel>
  );
}