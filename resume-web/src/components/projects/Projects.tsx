import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

export const Projects =() => {
  return (
      <Carousel opts={{ align: "start"}} className="w-full">
        <CarouselContent>
          <CarouselItem className="grid place-items-center md:basis-1/2">
            <div className="p-1">
              <Card className="bg-transparent my-2 text-gray-400 aspect-3/4 sm:aspect-4/5 md:aspect-square">
                <CardHeader>
                  <CardTitle className="font-bold text-[#ffffff] text-xl py-2 text-start">Overtime Filing</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 sm:overflow-hidden">
                    <ul className="list-none text-start">
                      <li className="list-item">
                        <p><span className="font-bold">Role: </span>Feature Developer</p>
                      </li>
                      <li className="list-item">
                        <p><span className="font-bold">Duration: </span>1 month</p>
                      </li>
                      <li className="list-item">
                        <p className="">
                          <span className="font-bold">Contribution: </span> 
                          Optimized utility functions. 
                          Added overtime checker to distinguish an actual overtime from a late overtime.
                        </p>
                      </li>
                    </ul>
                </CardContent>
                <CardFooter>
                  <p className="p-2 text-end w-full">
                    <span className="inline-block bg-orange-900 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2"> 
                      C#
                    </span>
                    <span className="inline-block bg-orange-900 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2"> 
                      .NET Framework
                    </span>
                    <span className="inline-block bg-orange-900 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2"> 
                      Excel API
                    </span>
                  </p>
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="grid place-items-center md:basis-1/2">
            <div className="p-1">
              <Card className="bg-transparent my-2 text-gray-400 aspect-3/4 sm:aspect-4/5 md:aspect-square">
                <CardHeader>
                    <CardTitle className="font-bold text-[#ffffff] text-xl py-2 text-start">Progress Management</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 sm:overflow-hidden">
                    <ul className="list-none text-start">
                      <li className="list-item">
                        <p><span className="font-bold">Role: </span>Feature Developer</p>
                      </li>
                      <li className="list-item">
                        <p><span className="font-bold">Duration: </span>2 weeks</p>
                      </li>
                      <li className="list-item">
                        <p className="">
                          <span className="font-bold">Contribution: </span> 
                          Created a QR Scanner component using ZXing scanner library in Angular.  
                          Created initial backend functionalities in swagger.
                        </p>
                      </li>
                    </ul>
                </CardContent>
                <CardFooter>
                   <p className='p-2 text-end w-full'>
                    <span className="inline-block bg-orange-900 rounded-full px-3 py-1 text-sm font-semibold
                      text-gray-300 mr-2 mb-2"> C#
                    </span>
                    <span className="inline-block bg-orange-900 rounded-full px-3 py-1 text-sm font-semibold
                      text-gray-300 mr-2 mb-2"> ASP.NET
                    </span>
                    <span className="inline-block bg-orange-900 rounded-full px-3 py-1 text-sm font-semibold
                      text-gray-300 mr-2 mb-2"> Angular
                    </span>
                    <span className="inline-block bg-orange-900 rounded-full px-3 py-1 text-sm font-semibold
                      text-gray-300 mr-2 mb-2"> IgniteUI
                    </span>
                  </p>
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <div className="flex gap-2 justify-end">
          <CarouselPrevious className="hover:text-white"/>
          <CarouselNext className="hover:text-white"/>
        </div>
      </Carousel>
  );
}