import { Injectable } from "@angular/core";
import { JGExperience } from "../core/models/experience";
import { JGProject } from "../core/models/project";
import { PortfolioSignalService } from "./portfolio-base.service";

@Injectable({ providedIn: 'root' })
export class ProjectSignalService extends PortfolioSignalService<JGProject> {}

@Injectable({ providedIn: 'root' })
export class ExperienceSignalService extends PortfolioSignalService<JGExperience> {}
