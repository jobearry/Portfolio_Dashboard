import type { BlockProps } from "@/components/common/block";
import { Timeline } from "@/pages/home/components/timeline";
import { corpoProjects } from "../../../lib/constants/project.constants";
import { TechStack } from "@/pages/home/components/TechStack";
import { BookOpen, Building, IdCard, MessageSquare, ToolCase } from "lucide-react";
import { ProjectHighlights } from "@/pages/home/components/ProjectHighlights";
import { CommentLoader } from "@/components/ui/comment-loader";

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
  { 
    title: 'Gardner College Diliman', 
    date: '2018', 
    description: 'Finished Senior High School (STEM)' 
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
    gridClass: "md:col-span-1"
  },
  {
    id: "block_2",
    title: "Experience",
    icon: <BookOpen size={20} strokeWidth={1.5}/>,
    children: () => <Timeline events={TimelineEvents} />,
    gridClass: "md:col-span-1 md:row-start-1 md:col-start-3 md:row-span-2"
  },
  {
    id: "block_3",
    title: "Projects",
    icon: <Building size={20} strokeWidth={1.5}/>,
    children: () => <ProjectHighlights events={corpoProjects}></ProjectHighlights>,
    gridClass: "md:col-span-2 "
  },
  {
    id: "block_4",
    title: "Tech Stack",
    icon: <ToolCase size={20} strokeWidth={1.5}/>,
    children: () => <TechStack/>,
    gridClass: "md:col-span-1 md:row-start-1 md:col-start-2" 
  },
  {
    id: "block_5",
    title: "Feedback",
    icon: <MessageSquare size={20} strokeWidth={1.5}/>,
    children: () => <CommentLoader/>,
    gridClass: "md:col-span-1 md:row-start-3"
  },
]
