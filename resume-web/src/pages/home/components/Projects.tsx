import { Project } from "@/lib/constants/poject.constants";

interface ProjectEvents {
  events: Project[]
}

export const Projects: React.FC<ProjectEvents> = ({events}) => {
  return (
    <section className="m-6 m text-start">
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <article className="border border-gray-500 my-2 rounded-sm p-2">
              <h3 className="font-bold text-sm">{event.title}</h3>
              <p className="text-gray-400 text-xs">{event.duration}</p>
              <p className="my-1 text-sm">{event.contirbution}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}