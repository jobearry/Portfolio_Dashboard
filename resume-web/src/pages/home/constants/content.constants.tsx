import type { BlockProps } from "@/components/common/block";
import { Timeline, type TimelineEvent } from "@/pages/home/components/timeline";
import { corpoProjects } from "../../../lib/constants/project.constants";
import { TechStack } from "@/pages/home/components/TechStack";
import { BookOpen, Building, CircleUser, IdCard, ToolCase } from "lucide-react";
import { ProjectHighlights } from "@/pages/home/components/ProjectHighlights";
import { Profile } from "../components/profile/Profile";

export const TimelineEvents: TimelineEvent[] = [
  { 
    title: 'SHI Design and Manufacturing Inc.', 
    date: '2023', 
    description: 'Fullstack developer' 
  },
  { 
    title: 'Eulogio "Amang" Rodriguez Insitute of Science and Technology', 
    date: '2022', 
    description: 'Completed Computer Engineering degree' 
  },
  { 
    title: 'Gardner College Diliman', 
    date: '2018', 
    description: 'Finished Senior High School (STEM)' 
  },
];

export const BlockContent: BlockProps[] = [
  {
    id: "block_1",
    title: "",
    icon: <CircleUser size={20} strokeWidth={1.5}/>,
    children: () => <Profile className={"place-items-center md:flex md:justify-evenly"}/>,
    gridClass: "md:col-span-3"
  },
  {
    id: "block_1",
    title: "About",
    icon: <IdCard size={20} strokeWidth={1.5}/>,
    children: () => <div className="m-3 mb-5 text-justify text-sm">
      <p>
        I am a full-stack developer that focuses on developing web applications through Angular and .NET.
        Professionally, I primarily manage backend and minimal frontend work. 
      </p>
      <br />
      <p>
        On my free time, I enjoy learning new things, and try new technologies.
        Right now, I am learning React, and Cloud development using Azure, and doing some LeetCode exercises.
      </p>
    </div>,
    gridClass: "md:col-span-2"
  },
  {
    id: "block_2",
    title: "Experience",
    icon: <BookOpen size={20} strokeWidth={1.5}/>,
    children: () => <Timeline events={TimelineEvents} />,
    gridClass: "md:col-span-2"
  },
  {
    id: "block_3",
    title: "Projects",
    icon: <Building size={20} strokeWidth={1.5}/>,
    children: () => <ProjectHighlights events={corpoProjects}></ProjectHighlights>,
    gridClass: "md:col-span-3"
  },
  {
    id: "block_4",
    title: "Tech Stack",
    icon: <ToolCase size={20} strokeWidth={1.5}/>,
    children: () => <TechStack/>,
    gridClass: "md:col-span-2"
  },
  // {
  //   id: "block_5",
  //   title: "Tech Stack",
  //   icon: <ToolCase size={20} strokeWidth={1.5}/>,
  //   children: () => 
  //     <div>
  //     </div>,
  //   gridClass: ""
  // },
  // {
  //   id: "block_6",
  //   title: "Feedback",
  //   icon: <MessageSquare size={20} strokeWidth={1.5}/>,
  //   children: () => <CommentLoader/>,
  //   gridClass: ""
  // },
]
