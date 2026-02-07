import type { BlockProps } from "@/components/common/block";
import { Timeline, type TimelineEvent } from "@/pages/home/components/timeline";
import { corpoProjects } from "../../../lib/constants/project.constants";
import { TechStack } from "@/pages/home/components/TechStack";
import { BookOpen, Building, ChartArea, CircleUser, IdCard, ToolCase } from "lucide-react";
import { ProjectHighlights } from "@/pages/home/components/ProjectHighlights";
import { Profile } from "../components/profile/Profile";
import { Heatmap } from "@/components/ui/chart";

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
export const SideBlockContent: BlockProps[] = [
  {
    id: "side_block_1",
    title: "",
    icon: <CircleUser size={20} strokeWidth={1.5}/>,
    children: () => <Profile className={"md:justify-evenly"}/>,
    // gridClass: "md:col-span-2"
  },
  {
    id: "side_block_2",
    title: "About",
    icon: <IdCard size={20} strokeWidth={1.5}/>,
    hasHeader: true,
    children: () => 
      <div className="m-3 mb-5 text-justify text-sm">
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
    // gridClass: "md:col-span-2 md:row-start-2 md:col-start-1"
  },
  {
    id: "side_block_3",
    title: "Experience",
    icon: <BookOpen size={20} strokeWidth={1.5}/>,
    hasHeader: true,
    children: () => <Timeline events={TimelineEvents} />,
    // gridClass: "md:col-span-2 md:row-start-3 md:col-start-1"
  },  
  {
    id: "side_block_4",
    title: "Tech Stack",
    icon: <ToolCase size={20} strokeWidth={1.5}/>,
    hasHeader: true,
    children: () => <TechStack/>,
    // gridClass: `md:col-span-2 md:row-start-4 md:col-start-1`
  },
]
export const BlockContent: BlockProps[] = [
  {
    id: "main_block_1",
    title: "Projects",
    icon: <Building size={20} strokeWidth={1.5}/>,
    hasHeader: true,
    children: () => <ProjectHighlights events={corpoProjects}></ProjectHighlights>,
    // gridClass: "md:col-span-4"
  },

  {
    id: "main_block_2",
    title: "",
    icon: <ChartArea size={20} strokeWidth={1.5}/>,
    hasHeader: false,
    children: () => 
      <Heatmap></Heatmap>,
    // gridClass: "md:col-span-4"
  },
  // {
  //   id: "block_6",
  //   title: "Feedback",
  //   icon: <MessageSquare size={20} strokeWidth={1.5}/>,
  //   children: () => <CommentLoader/>,
  // //   gridClass: ""
  // },
]
