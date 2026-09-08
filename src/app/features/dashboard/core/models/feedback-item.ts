import { Role } from "./value-objects/role";

export interface FeedbackItem {
  id: number;
  personName: string;
  description: string;
  careerPosition: Role;
  postedAt: string;
}
