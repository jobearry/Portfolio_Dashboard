import { Injectable } from "@angular/core";
import { PortfolioSignalService } from "./portfolio-base.service";
import { DashboardItem } from "../models/dashboard-item";
import { JGTechStackDTO } from "../models/techstack";
import { ExperienceTimeline } from "../models/experience";
import { Project } from "../models/project";
@Injectable({ providedIn: 'root' })
export class ProjectSignalService extends PortfolioSignalService<Project> {}

@Injectable({ providedIn: 'root' })
export class ExperienceSignalService extends PortfolioSignalService<ExperienceTimeline> {}

@Injectable({ providedIn: 'root' })
export class SkillsSignalService extends PortfolioSignalService<JGTechStackDTO> {}

@Injectable({ providedIn: 'root'})
export class OverviewSignalService extends PortfolioSignalService<DashboardItem>{}
