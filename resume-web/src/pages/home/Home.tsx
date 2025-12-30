import { Block } from "@/components/common/block";
import { BlockContent } from "@/pages/home/constants/content.constants";

const Home = () => {
  return (
    <section className='flex justify-center scroll-smooth p-8' >
      <div className="grid md:grid-cols-3 ">
        {BlockContent.map((block) => (
          <Block key={block.id} className={`border ${block.className}`}
            id={block.id} 
            title={block.title} 
            icon={block.icon} 
            description={block.description}
            gridClass={block.gridClass}>
              {block.children}
          </Block>
        ))}
      </div>
    </section>
  );
}

export default Home;