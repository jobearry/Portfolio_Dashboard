import { Block } from "@/components/common/block";
import { BlockContent } from "@/lib/constants/content.constants";
import { Profile } from "./components/profile/Profile";

const Home = () => {
  return (
    <section className='flex justify-center scroll-smooth p-8' >
      <div>
        <Profile></Profile>
        <div className="grid md:grid-cols-3">
          {BlockContent.map((block, index) => (
            <Block key={index} className={`border ${block.className}`}
              id={block.id} 
              title={block.title} 
              icon={block.icon} 
              description={block.description}
              gridClass={block.gridClass}>
                {block.children}
            </Block>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;