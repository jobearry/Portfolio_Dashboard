export interface TechStackCategory {
  stackId: number;
  stackName: string;
  createdAt: string;
}

export interface TechStack {
  specId: number;
  toolName: string;
  imgSrc: string;
  createdAt: string;
  stackId: number;
  stack: string;
}

export interface TechStackItem {
  id: number;
  category: string;
  createdAt: string;
  imgSrc: string;
  stackName: string;
}
