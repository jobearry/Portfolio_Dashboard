import { TechStackSpec } from "./techstack";

export interface JGProject {
  projectId: number;
  projectName: string;
  description: string;
  coverImg: string;
  duration: number;
  contribution: string;

  techStackSpecs: TechStackSpec[];
}
