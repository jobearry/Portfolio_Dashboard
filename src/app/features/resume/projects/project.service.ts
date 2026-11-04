import { Injectable } from '@angular/core';
import { Project } from '../../dashboard/core';
import { PortfolioSignalService } from '../../../shared/services/portfolio-base.service';

@Injectable({ providedIn: 'root' })
export class ResumeProjectSignalService extends PortfolioSignalService<Project> {
  private static readonly ENDPOINT = 'v1/project?includeTools=true';

  async load(): Promise<void> {
    this.setLoading();
    await this.getPortfolioResource(ResumeProjectSignalService.ENDPOINT);
  }
}
