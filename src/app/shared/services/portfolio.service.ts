import { Injectable } from "@angular/core";
import { DashboardItem, ExperienceTimeline, FeedbackItem, Project, TechStackItem } from "../../features/dashboard/core";
import { PortfolioSignalService } from "./portfolio-base.service";
@Injectable({ providedIn: 'root' })
export class ProjectSignalService extends PortfolioSignalService<Project> {}

@Injectable({ providedIn: 'root' })
export class ExperienceSignalService extends PortfolioSignalService<ExperienceTimeline> {}

@Injectable({ providedIn: 'root' })
export class SkillsSignalService extends PortfolioSignalService<TechStackItem> {}

@Injectable({ providedIn: 'root'})
export class OverviewSignalService extends PortfolioSignalService<DashboardItem>{}

@Injectable({ providedIn: 'root'})
export class RecommendationService extends PortfolioSignalService<FeedbackItem>{}
