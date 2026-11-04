import { Injectable } from '@angular/core';
import { GithubRepo } from '../core';
import { PortfolioSignalService } from '../../../shared/services/portfolio-base.service';

/**
 * Public repository list for the resume's projects page.
 *
 * The request goes through `ApiClient`, so the GitHub token lives on the .NET
 * API and never reaches the browser bundle.
 *
 * TODO(plan 020): the portfolio API does not expose this endpoint yet. Until it
 * does, the projects page renders its empty state.
 */
@Injectable({ providedIn: 'root' })
export class GithubRepoSignalService extends PortfolioSignalService<GithubRepo> {
  private static readonly ENDPOINT = 'github/repos';

  async load(): Promise<void> {
    this.setLoading();
    await this.getPortfolioResource(GithubRepoSignalService.ENDPOINT);
  }
}
