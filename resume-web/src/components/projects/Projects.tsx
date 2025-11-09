import { Pill } from "../pill/Pill";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Project } from "./poject.model";

export const Projects: React.FC<Project> = ({title, contirbution, tags, role, duration}) => {
  return (
    <Card className="bg-transparent my-2 text-gray-400">
      <CardHeader>
        <CardTitle className="font-bold text-[#ffffff] text-xl py-2 text-start">{title}</CardTitle>
      </CardHeader>
      <CardContent className="
        flex-1 sm:overflow-auto hover:scrollbar-thin scrollbar-hide aspect-square sm:aspect-video">
          <ul className="list-none text-start object-fill">
            <li className="list-item">
              <p><span className="font-bold">Role: </span>{role}</p>
            </li>
            <li className="list-item">
              <p><span className="font-bold">Duration: </span>{duration}</p>
            </li>
            <li className="list-item">
              <span className="font-bold">Contribution: </span> 
              <ul className="list-disc ml-5">
                {contirbution.map((contrib,index) => (
                  <li key={index}>{contrib}</li>
                ))}
              </ul>
            </li>
          </ul>
      </CardContent>
      <CardFooter>
        <p className="p-2 text-end w-full">
          {tags.map((tag,index) => (
            <Pill key={index} label={tag} color={"bg-orange-900"}></Pill>
          ))}
        </p>
      </CardFooter>
    </Card>
  );
}