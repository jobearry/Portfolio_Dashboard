export interface TechStackDescription {
  stackId: number;
  stackName: string;
  createdAt: string;
}

export interface TechStackSpec {
  specId: number;
  toolName: string;
  imgSrc: string;
  createdAt: string;
  stackId: number;
  stack: string;
}

export interface JGTechStackDTO {
  stackId: number;
  stackName: string;
  createdAt: string;
  techStackSpecs: TechStackSpec[];
}
