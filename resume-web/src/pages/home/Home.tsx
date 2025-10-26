import { Education } from "../../components/education/Education";
import { Experience } from "../../components/experience/Experience";
import { Nav } from "../../components/nav/Nav";
import { ProfileInfo } from "../../components/profile-info/ProfileInfo";
import { Skills } from "../../components/skills/Skills";

const Home = () => {
  return (
    <div className='flex justify-center scroll-smooth' >
      <div className='w-[90%]'>
        <Nav></Nav>
        <ProfileInfo></ProfileInfo>
        <Education></Education>
        <Experience></Experience>
        <Skills></Skills>
      </div>
    </div>
  );
}

export default Home;