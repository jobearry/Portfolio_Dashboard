import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideDownload, lucideGithub } from '@ng-icons/lucide';
import { Component } from '@angular/core';
import { site } from '../../../../core/config/site.config';
import { Recommendations } from './components';
import { SkillComponent } from './components/skill';

@Component({
  selector: 'app-profile',
  imports: [NgIcon, Recommendations, SkillComponent],
  providers: [provideIcons({ lucideDownload, lucideGithub })],
  template: `
    <div class="flex flex-col gap-5">
      <section class="rounded-lg border border-border p-5" aria-labelledby="profile-name">
        <div class="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
          <img
            class="h-44 w-44 shrink-0 rounded-full bg-accent-brand/20 object-cover sm:h-48 sm:w-48"
            [src]="site.assets.profileAvatar"
            [alt]="'Portrait of ' + site.profile.name"
          />

          <div class="flex w-full flex-col gap-4">
            <div class="flex flex-col gap-2 rounded-md bg-muted/50 p-4">
              <div>
                <h2 id="profile-name" class="text-2xl font-semibold tracking-tight">
                  {{ site.profile.name }}
                </h2>
                <p class="text-sm text-muted-foreground">{{ site.profile.handle }}</p>
              </div>
              <p class="text-sm leading-relaxed text-muted-foreground">
                {{ site.profile.bio }}
              </p>
            </div>

            <nav aria-label="Social and resume links">
              <ul class="flex flex-wrap gap-2">
                <li>
                  <a
                    class="inline-flex items-center gap-2 rounded-md border border-border bg-muted/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    [href]="site.links.github"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ng-icon name="lucideGithub" size="16" />
                    View GitHub
                  </a>
                </li>
                <li>
                  <a
                    class="inline-flex items-center gap-2 rounded-md bg-accent-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-brand/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    [href]="site.links.cv"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ng-icon name="lucideDownload" size="16" />
                    Download CV
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <section class="rounded-lg border border-border p-5">
        <div class="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div class="w-full">
            <app-recommendations></app-recommendations>
          </div>
          <div class="w-full">
            <app-skill></app-skill>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class Profile {
  protected readonly site = site;
}
