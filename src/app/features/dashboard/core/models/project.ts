import { TechStack } from "./techstack";

export interface Project {
  projectId: number;
  projectName: string;
  description: string;
  coverImg: string;
  duration: number;
  contribution: string;

  techStackSpecs: TechStack[];
}
