import { Component, OnInit, computed, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideBlocks } from '@ng-icons/lucide';
import { Router } from '@angular/router';
import { Highlights } from '../components/highlights';
import { BlockComponent } from '../../home/components/block-container/block-container';
import { PROJECT_HIGHLIGHT } from '../constants/project.constant';
import { Github } from '../../../github/ui/github';
import { GithubRepoSignalService } from '../../../github/github-repo.service';
import { Pill } from '../../../components/pill';
import { ThemeToggler } from '../../../components/theme-toggler';
import { DashboardLink } from '../../../components/dashboard-link';
import { Footer } from '../../../components/footer';

@Component({
  selector: 'app-projects',
  imports: [Highlights, NgIcon, BlockComponent, Github, Pill, ThemeToggler, DashboardLink, Footer],
  providers: [provideIcons({ lucideArrowLeft, lucideBlocks })],
  templateUrl: './projects.html',
  styles: ``,
})
export class Projects implements OnInit {
  private readonly router = inject(Router);
  private readonly githubRepos = inject(GithubRepoSignalService);

  readonly corpoProjects = PROJECT_HIGHLIGHT;
  readonly githubState = computed(() => this.githubRepos.getState());

  ngOnInit(): void {
    void this.githubRepos.load();
  }

  goHome(): void {
    void this.router.navigate(['/']);
  }
}
