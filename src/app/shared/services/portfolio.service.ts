import { Injectable } from "@angular/core";
import { PortfolioSignalService } from "./portfolio-base.service";
import { DashboardItem } from "../../features/dashboard/core/models/dashboard-item";
import { Project } from "../../features/dashboard/core/models/project";
import { JGTechStackDTO } from "../../features/dashboard/core/models/techstack";
import { ExperienceTimeline } from "../../features/dashboard/core/models/experience";
@Injectable({ providedIn: 'root' })
export class ProjectSignalService extends PortfolioSignalService<Project> {}

@Injectable({ providedIn: 'root' })
export class ExperienceSignalService extends PortfolioSignalService<ExperienceTimeline> {}

@Injectable({ providedIn: 'root' })
export class SkillsSignalService extends PortfolioSignalService<JGTechStackDTO> {}

@Injectable({ providedIn: 'root'})
export class OverviewSignalService extends PortfolioSignalService<DashboardItem>{}
