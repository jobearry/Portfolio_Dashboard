import { Injectable } from '@angular/core';
import { GithubRepo } from '../core';
import { PortfolioSignalService } from '../../../shared/services/portfolio-base.service';
import { site } from '../../../core/config/site.config';

/**
 * Public repository list for the resume's projects page.
 *
 * The request goes through `ApiClient`, so the GitHub token lives on the .NET
 * API and never reaches the browser bundle.
 */
@Injectable({ providedIn: 'root' })
export class GithubRepoSignalService extends PortfolioSignalService<GithubRepo> {
  private static readonly ENDPOINT = `v1/github/owner/${site.github.username}/repositories`;

  async load(): Promise<void> {
    this.setLoading();
    await this.getPortfolioResource(GithubRepoSignalService.ENDPOINT);
  }
}
