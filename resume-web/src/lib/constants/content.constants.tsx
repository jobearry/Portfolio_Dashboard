import type { BlockProps } from "@/components/common/block";
import { Timeline } from "@/pages/home/components/timeline";
import { corpoProjects } from "./poject.constants";
import { TechStack } from "@/pages/home/components/TechStack";
import { BookOpen, Building, IdCard, ToolCase } from "lucide-react";
import { ProjectHighlights } from "@/pages/home/components/ProjectHighlights";

export interface TimelineEvent{
  title: string,
  date: string,
  description: string
}
  // Experience: <Timeline events={TimelineEvents} />,
  // Projects: <Projects events={sdmiProjects}></Projects>

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
];
export const BlockContent: BlockProps[] = [
  {
    id: "block_1",
    title: "About",
    icon: <IdCard size={20} strokeWidth={1.5}/>,
    description: `
      I am a full-stack developer that focuses on developing web applications through Angular and .NET.
      Professionally, I primarily manage backend and minimal frontend work. 
    `,
    gridClass: "md:col-span-2"
  },
  {
    id: "block_2",
    title: "Experience",
    icon: <BookOpen size={20} strokeWidth={1.5}/>,
    children: <Timeline events={TimelineEvents} />,
    gridClass: "md:col-span-2"
  },
  {
    id: "block_3",
    title: "Projects",
    icon: <Building size={20} strokeWidth={1.5}/>,
    children: <ProjectHighlights events={corpoProjects}></ProjectHighlights>,
    gridClass: "md:col-span-1 md:row-span-2 md:row-start-1 md:col-start-3"
  },
  {
    id: "block_4",
    title: "Tech Stack",
    icon: <ToolCase size={20} strokeWidth={1.5}/>,
    children: <TechStack></TechStack>,
    gridClass: "md:col-span-1 md:row-start-3 md:col-start-3"
  }
]
