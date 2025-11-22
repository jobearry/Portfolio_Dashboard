import type { BlockProps } from "@/components/common/block";

export interface TimelineEvent{
  title: string,
  date: string,
  description: string
}
export const BlockContent: BlockProps[] = [
  {
    id: 0,
    title: "About",
    icon: "about",
    description: `
      I am a full-stack developer that focuses on developing web applications through Angular and .NET.
      Professionally, I primarily manage backend and minimal frontend work. 
    `,
    children: [],
  },
  {
    id: 1,
    title: "Experience",
    icon: "education",
    description: ``,
    children: []
  },
  {
    id: 2,
    title: "Projects",
    icon: "project",
    description: ``,
    children: []
  }
]

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