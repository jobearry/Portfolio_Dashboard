import { Profile } from "@/pages/home/profile/Profile";
import { Block } from "@/components/common/block";
import { BlockContent, TimelineEvents } from "@/lib/constants/content.details";
import { Timeline } from "@/components/timeline/timeline";
import { Projects } from "@/pages/home/projects/Projects";
import { sdmiProjects } from "@/pages/home/projects/poject.model";

const Home = () => {
  return (
    <div className='flex justify-center scroll-smooth p-8' >
      <div>
        <Profile></Profile>
        {BlockContent.map((block) => (
          <Block id={block.id} title={block.title} icon={block.icon} description={block.description}>
            {block.title === "Experience"? (
              <Timeline events={TimelineEvents} />
            ): null}

            {block.title === "Projects"? (
              <Projects events={sdmiProjects}></Projects>
            ): null}
          </Block>
        ))}
      </div>
    </div>
  );
}

export default Home;