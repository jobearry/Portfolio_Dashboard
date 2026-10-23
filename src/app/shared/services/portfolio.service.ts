import { Injectable } from '@angular/core';
import {
  OverviewItem,
  ExperienceTimeline,
  FeedbackItem,
  TechStackItem
} from '../../features/dashboard/core';
import { PortfolioSignalService } from './portfolio-base.service';

@Injectable({ providedIn: 'root' })
export class ExperienceSignalService extends PortfolioSignalService<ExperienceTimeline> {}

@Injectable({ providedIn: 'root' })
export class SkillsSignalService extends PortfolioSignalService<TechStackItem> {}

@Injectable({ providedIn: 'root' })
export class OverviewSignalService extends PortfolioSignalService<OverviewItem> {}

@Injectable({ providedIn: 'root' })
export class RecommendationService extends PortfolioSignalService<FeedbackItem> {}
