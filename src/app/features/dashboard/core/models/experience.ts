import { Project } from './project';

export interface ExperienceTimeline {
  company: string;
  description: string;
  durationMonths: number;
  finishedAt?: string | null;
  id: number;
  projects?: Project[] | null;
  responsibility: string;
  role: string;
  startedAt: string;
  type: string;
}
