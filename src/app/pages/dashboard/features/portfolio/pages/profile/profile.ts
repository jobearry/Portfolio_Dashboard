import { Component } from '@angular/core';
import { HlmH3 } from '@spartan-ng/helm/typography';
import { PORTFOLIO_CARD_FOOTER_STYLES } from '../../core/styles/portfolio.styles';

@Component({
  selector: 'app-profile',
  imports: [HlmH3],
  template: `
    <div class="bg-zinc-900/50 p-2 border rounded-sm flex flex-col gap-2">
      <span>
        <h3 hlmH3>Jonathan Golimlim</h3>
        <p class="text-muted-foreground">@jobearry</p>
      </span>
      <p [className]="portfolioCardFooterStyle + ' '">
        A full-stack developer who specializes on developing web applications through Angular and .NET
      </p>
    </div>
  `,
  styles: ``,
})
export class Profile {
  portfolioCardFooterStyle = PORTFOLIO_CARD_FOOTER_STYLES

}
