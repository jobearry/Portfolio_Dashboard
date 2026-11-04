import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { Card } from '../../../../components/card';
import { Spinner } from '../../../../components/spinner';
import { GithubRepoSignalService } from '../../../../github/github-repo.service';

@Component({
  selector: 'app-recent-repositories',
  imports: [Card, Spinner],
  templateUrl: './recent-repositories.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentRepositories implements OnInit {
  private readonly githubRepos = inject(GithubRepoSignalService);

  protected readonly state = computed(() => this.githubRepos.getState());
  protected readonly repositories = computed(() => this.state().content.slice(0, 2));

  ngOnInit(): void {
    void this.githubRepos.load();
  }

  protected retry(): void {
    void this.githubRepos.load();
  }
}
