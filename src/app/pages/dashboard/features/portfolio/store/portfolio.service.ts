import { Injectable } from "@angular/core";
import { JGExperience } from "../core/models/experience";
import { JGProject } from "../core/models/project";
import { PortfolioSignalService } from "./portfolio-base.service";
import { JGTechStackDTO } from "../core/models/techstack";

@Injectable({ providedIn: 'root' })
export class ProjectSignalService extends PortfolioSignalService<JGProject> {}

@Injectable({ providedIn: 'root' })
export class ExperienceSignalService extends PortfolioSignalService<JGExperience> {}

@Injectable({ providedIn: 'root' })
export class SkillsSignalService extends PortfolioSignalService<JGTechStackDTO> {}
