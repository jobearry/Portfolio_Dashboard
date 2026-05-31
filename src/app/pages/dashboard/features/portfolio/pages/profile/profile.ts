import { Component } from '@angular/core';
import { HlmH3 } from '@spartan-ng/helm/typography';
import { PORTFOLIO_CARD_FOOTER_STYLES } from '../../core/styles/portfolio.styles';

@Component({
  selector: 'app-profile',
  imports: [HlmH3],
  template: `
    <div class="flex flex-col gap-2 w-full md:w-[45%]">
      <div class="bg-zinc-900/50 p-2 border rounded-sm flex flex-col gap-2">
        <span>
          <h3 hlmH3>Jonathan Golimlim</h3>
          <p class="text-muted-foreground">@jobearry</p>
        </span>
        <p [className]="portfolioCardFooterStyle + ' '">
          A full-stack developer who specializes on developing web applications through Angular and
          .NET
        </p>
      </div>
      <aside>
        <address class="not-italic">
          <nav aria-label="Social and resume links">
            <ul class="flex **:justify-end gap-2">
              <li
                title="View Github"
                class="border flex gap-1 justify-center items-center">
                <a
                  href="https://github.com/jobearry"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View GitHub profile">
                  <img
                    src="https://img.shields.io/badge/view_github-101012?style=for-the-badge&logo=github&logoColor=white"/>
                </a>
              </li>
              <li
                title="Download CV"
                class="border flex gap-1 justify-center items-center">
                <a
                  href="https://drive.google.com/uc?export=download&id=1FpztsStY7V_zDvG7eFdnDUVWaRZoWcBc"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="Download CV">
                  <img
                    src="https://img.shields.io/badge/download_cv-101012?style=for-the-badge"/>
                </a>
              </li>
            </ul>
          </nav>
        </address>
      </aside>
    </div>
  `,
  styles: ``,
})
export class Profile {
  portfolioCardFooterStyle = PORTFOLIO_CARD_FOOTER_STYLES;
}
