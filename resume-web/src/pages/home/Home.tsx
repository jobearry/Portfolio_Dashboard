import { Profile } from "@/components/profile-info/Profile";
import { Education } from "../../components/education/Education";
import { Experience } from "../../components/experience/Experience";
import { Nav } from "../../components/nav/Nav";
import { Skills } from "../../components/skills/Skills";

const Home = () => {
  return (
    <div className='flex justify-center scroll-smooth' >
      <div>
        <Nav></Nav>
        <Profile></Profile>
        <Education></Education>
        <Experience></Experience>
        <Skills></Skills>
      </div>
    </div>
  );
}

export default Home;