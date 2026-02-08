import { Block } from "@/components/common/block";
import {
  BlockContent,
  SideBlockContent,
} from "@/pages/home/constants/content.constants";

const Home = () => {

  return (
    <section className="grid md:grid-cols-6 scroll-smooth p-8">
      <div className="w-full col-span-full md:col-span-2">
        {SideBlockContent.map((sideblock) => (
          <Block
            key={sideblock.id}
            className={`border ${sideblock.className}`}
            id={sideblock.id}
            title={sideblock.title}
            icon={sideblock.icon}
            description={sideblock.description}
            gridClass={sideblock.gridClass}
            hasHeader={sideblock.hasHeader}
          >
            {sideblock.children}
          </Block>
        ))}
      </div>
      <div className="w-full col-span-full md:col-span-4">
        {BlockContent.map((block) => (
          <Block
            key={block.id}
            className={`border ${block.className}`}
            id={block.id}
            title={block.title}
            icon={block.icon}
            description={block.description}
            gridClass={block.gridClass}
            hasHeader={block.hasHeader}
          >
            {block.children}
          </Block>
        ))}
      </div>
    </section>
  );
};

export default Home;
