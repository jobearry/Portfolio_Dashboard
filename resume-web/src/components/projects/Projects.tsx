import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { sdmiProjects } from "./poject.config";

export const Projects = () => {
  return (
      <Carousel opts={{ align: "start"}} className="w-full">
        <CarouselContent>
          {/* Projects list */}
          {sdmiProjects.map(x => (
            <CarouselItem key={x.id} 
              className="grid place-items-center md:basis-1/2">
                <div className="p-1">
                  <Card className="bg-transparent my-2 text-gray-400 aspect-3/4 sm:aspect-4/5 md:aspect-square">
                    <CardHeader>
                      <CardTitle className="font-bold text-[#ffffff] text-xl py-2 text-start">{x.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 sm:overflow-hidden">
                        <ul className="list-none text-start">
                          <li className="list-item">
                            <p><span className="font-bold">Role: </span>{x.role}</p>
                          </li>
                          <li className="list-item">
                            <p><span className="font-bold">Duration: </span>{x.duration}</p>
                          </li>
                          <li className="list-item">
                            <p className="">
                              <span className="font-bold">Contribution: </span> 
                              {x.description}
                            </p>
                          </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                      <p className="p-2 text-end w-full">
                        {x.tags.map(tag => (
                          <span className="inline-block bg-orange-900 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2">
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