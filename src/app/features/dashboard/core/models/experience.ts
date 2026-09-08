import { Project } from "./project";
import { Company } from "./value-objects/company";
import { Period } from "./value-objects/period";
import { Role } from "./value-objects/role";

export interface ExperienceTimeline {
  id: number;
  company: Company;
  duration: Period;
  description: string;
  role: Role;
  responsibility: string;
  type: string;

  projects?: Project[] | null;
}
